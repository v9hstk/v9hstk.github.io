(function () {
  var PREF_KEY = "v9hstk-lang-pref";
  var AUTO_KEY = "v9hstk-lang-auto";
  /** URL path segments (not BCP-47 tags). */
  var LOCALES = ["en", "kor", "jp", "de", "zh", "ar"];
  var CASE_PAGES = ["hashstack", "parashar", "guardrail"];
  /** Map legacy short paths → current path locales. */
  var LEGACY_PATH = { ko: "kor", ja: "jp" };

  function detectSystemLocale() {
    var list = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || "en"];
    for (var i = 0; i < list.length; i++) {
      var code = String(list[i] || "").toLowerCase();
      if (code.indexOf("ko") === 0) return "kor";
      if (code.indexOf("ja") === 0) return "jp";
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
    // Legacy /ko/ /ja/ while redirect stubs still load (if any)
    if (/\/ko(\/|$)/.test(path)) return "kor";
    if (/\/ja(\/|$)/.test(path)) return "jp";
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
    if (LEGACY_PATH[locale]) locale = LEGACY_PATH[locale];
    var slug = pageSlugFromPath();
    if (locale === "en") {
      return slug ? "/" + slug : "/";
    }
    return "/" + locale + "/" + (slug || "");
  }

  function isEnglishPublicPage() {
    var path = location.pathname || "/";
    if (path === "/" || path === "/index.html") return true;
    return pageSlugFromPath() !== "";
  }

  /** One-time system-language redirect on English landing or case study. */
  function maybeAutoRedirect() {
    try {
      if (currentLocaleFromPath() !== "en") return;
      if (!isEnglishPublicPage()) return;
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
    // Migrate stored prefs from old codes
    try {
      var pref = localStorage.getItem(PREF_KEY);
      if (pref === "ko") localStorage.setItem(PREF_KEY, "kor");
      if (pref === "ja") localStorage.setItem(PREF_KEY, "jp");
    } catch (e) {}

    if (select.value !== current) select.value = current;

    select.addEventListener("change", function () {
      var next = select.value;
      if (LEGACY_PATH[next]) next = LEGACY_PATH[next];
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
