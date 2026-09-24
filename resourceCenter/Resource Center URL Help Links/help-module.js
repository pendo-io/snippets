var kbMap = [
  { match: /dashboard/i, url: "https://support.pendo.io/hc/en-us/articles/360032304991-Dashboards" },
  { match: /accounts/i, url: "https://support.pendo.io/hc/en-us/articles/360032334631-Accounts" },
  { match: /contacts/i, url: "https://support.pendo.io/hc/en-us/articles/360032305811-Visitors" },
  { match: /opportunities/i, url: "https://support.pendo.io/hc/en-us/articles/360032305911-Reports" }
];
var fallbackUrl = "https://support.pendo.io/hc/en-us";

function getArticleForCurrentPage() {
  var target = window.location.pathname + window.location.hash + window.location.search;
  for (var i = 0; i < kbMap.length; i++) {
    if (kbMap[i].match.test(target)) return kbMap[i].url;
  }
  return fallbackUrl;
}

var btn = document.getElementById('pendo-help-center-btn');
if (btn) {
  btn.addEventListener('click', function () {
    window.open(getArticleForCurrentPage(), '_blank');
  });
}
