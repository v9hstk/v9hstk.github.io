(function () {
  var PREF_KEY = "v9hstk-lang-pref";
  var AUTO_KEY = "v9hstk-lang-auto";
  var LOCALES = ["en", "ko", "ja", "de", "zh", "ar"];
  var CASE_PAGES = ["hashstack", "parashar", "guardrail"];

  function detectSystemLocale() {
    var list = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || "en"];
    for (var i = 0; i < list.length; i++) {
      var code = String(list[i] || "").toLowerCase();
      if (code.indexOf("ko") === 0) return "ko";
      if (code.indexOf("ja") === 0) return "ja";
      if (code.indexOf("de") === 0) return "de";
      if (code.indexOf("zh") === 0) return "zh";
      if (code.indexOf("ar") === 0) return "ar";
    }
    return "en";
  }

  function currentLocaleFromPath() {
    var path = location.pathname || "/";
    for (var i = 0; i < LOCALES.length; i++) {
      var loc = LOCALES[i];
      if (loc === "en") continue;
      if (new RegExp("\\/" + loc + "(\\/|$)").test(path)) return loc;
    }
    return "en";
  }

  function pageSlugFromPath() {
    var path = location.pathname || "/";
    for (var i = 0; i < CASE_PAGES.length; i++) {
      var slug = CASE_PAGES[i];
      if (new RegExp("\\/" + slug + "\\.html$").test(path)) return slug + ".html";
    }
    return "";
  }

  /** Locale-aware path that keeps case-study page when switching language. */
  function pathForLocale(locale) {
    var slug = pageSlugFromPath();
    if (locale === "en") {
      return slug ? "/" + slug : "/";
    }
    return "/" + locale + "/" + (slug || "");
  }

  function isEnglishLanding() {
    var path = location.pathname || "/";
    return path === "/" || path === "/index.html";
  }

  /** One-time system-language redirect on English landing only. */
  function maybeAutoRedirect() {
    try {
      if (!isEnglishLanding()) return;
      if (localStorage.getItem(PREF_KEY) || localStorage.getItem(AUTO_KEY)) return;
      localStorage.setItem(AUTO_KEY, "1");
      var loc = detectSystemLocale();
      if (loc !== "en") {
        location.replace(pathForLocale(loc));
      }
    } catch (e) {
      /* private mode / blocked storage — skip auto */
    }
  }

  function wireSelect() {
    var select = document.getElementById("lang-select");
    if (!select) return;

    var current = currentLocaleFromPath();
    if (select.value !== current) select.value = current;

    select.addEventListener("change", function () {
      var next = select.value;
      if (LOCALES.indexOf(next) === -1) return;
      try {
        localStorage.setItem(PREF_KEY, next);
        localStorage.setItem(AUTO_KEY, "1");
      } catch (e) {}
      if (next === current) return;
      location.href = pathForLocale(next);
    });
  }

  maybeAutoRedirect();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireSelect);
  } else {
    wireSelect();
  }
})();
