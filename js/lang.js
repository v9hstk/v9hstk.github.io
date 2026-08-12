(function () {
  var PREF_KEY = "v9hstk-lang-pref";
  var AUTO_KEY = "v9hstk-lang-auto";
  var PATHS = { en: "/", ko: "/ko/", ja: "/ja/", de: "/de/" };

  function detectSystemLocale() {
    var list = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || "en"];
    for (var i = 0; i < list.length; i++) {
      var code = String(list[i] || "").toLowerCase();
      if (code.indexOf("ko") === 0) return "ko";
      if (code.indexOf("ja") === 0) return "ja";
      if (code.indexOf("de") === 0) return "de";
    }
    return "en";
  }

  function currentLocaleFromPath() {
    var path = location.pathname || "/";
    if (/\/ko(\/|$)/.test(path)) return "ko";
    if (/\/ja(\/|$)/.test(path)) return "ja";
    if (/\/de(\/|$)/.test(path)) return "de";
    return "en";
  }

  function isEnglishRoot() {
    var path = location.pathname || "/";
    return path === "/" || /\/index\.html$/.test(path);
  }

  /** One-time system-language redirect on English root only. */
  function maybeAutoRedirect() {
    try {
      if (!isEnglishRoot()) return;
      if (localStorage.getItem(PREF_KEY) || localStorage.getItem(AUTO_KEY)) return;
      localStorage.setItem(AUTO_KEY, "1");
      var loc = detectSystemLocale();
      if (loc !== "en" && PATHS[loc]) {
        location.replace(PATHS[loc]);
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
      if (!PATHS[next]) return;
      try {
        localStorage.setItem(PREF_KEY, next);
        localStorage.setItem(AUTO_KEY, "1");
      } catch (e) {}
      if (next === current) return;
      location.href = PATHS[next];
    });
  }

  maybeAutoRedirect();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireSelect);
  } else {
    wireSelect();
  }
})();
