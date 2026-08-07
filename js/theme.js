(function () {
  var STORAGE_KEY = "theme";
  var root = document.documentElement;

  function getPreferred() {
    // Site default is light; OS preference only applies after user toggles (sessionStorage).
    return "light";
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
  }

  function init() {
    var stored = sessionStorage.getItem(STORAGE_KEY);
    apply(stored || getPreferred());
  }

  function toggle() {
    var current = root.getAttribute("data-theme") || getPreferred();
    var next = current === "dark" ? "light" : "dark";
    sessionStorage.setItem(STORAGE_KEY, next);
    apply(next);
  }

  init();

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", toggle);
    }
  });
})();
