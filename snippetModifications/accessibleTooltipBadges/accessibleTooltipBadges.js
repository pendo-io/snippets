// Snippet Modification for Accessible Tooltip Badges
// Note: This utilizes a MutationObserver and will not work in IE6-10.  
pendo.initialize({
    // Replace these placeholders with your visitor and account values, as in your
    // existing install snippet
    visitor: {
      id:      'YOUR_VISITOR_ID'
    },
 
    account: {
      id:       'YOUR_ACCOUNT_ID'
    },

    events: {
      ready: function () {
      pendo.addBodyMutationListener();
    }
  }
});
        
// This adds alt text to image badges, so screen readers can announce them:
//  1) If the badge is the RC, add the alt "Resource Center"
//  2) If the badge has a string in the guide name within #[ ], then make the
//     alt that string
//  3) Otherwise, just default the alt text to "tooltip badge"
pendo.addAltText = function(guideId) {
  // Skip badges whose structure or guide can't be found, rather than throwing
  var badge = pendo.badgesShown && pendo.badgesShown[guideId];
  var badgeChild = badge && badge.domJson && badge.domJson.children && badge.domJson.children[1];
  var badgeId = badgeChild && badgeChild.props && badgeChild.props.id;
  var badgeGuide = pendo.guides.filter(elem=>elem.id==guideId)[0];
  if (!badgeId || !badgeGuide) return;

  if (pendo.dom("#"+badgeId+ " img")[0]) {
    var guideName = badgeGuide.name || "";
    if (guideName.includes("#[")) {
      var guideNameAltText = guideName.substring(guideName.indexOf("#[")+2, guideName.indexOf("]"));
    }

    if(guideName == "Resource Center") {
      pendo.dom("#"+badgeId+ " img")[0].setAttribute('alt', "Resource Center");
      // Some Resource Center badges also contain an input; label it too when present
      if (pendo.dom("#"+badgeId+ " input")[0]) {
        pendo.dom("#"+badgeId+ " input")[0].setAttribute('alt', "Resource Center");
      }
    } else if (guideNameAltText) {
      pendo.dom("#"+badgeId+ " img")[0].setAttribute('alt', guideNameAltText);
    } else {
      pendo.dom("#"+badgeId+ " img")[0].setAttribute('alt', "tooltip badge");
    }
  }
}

pendo.addBodyMutationListener = function() {
  var target = document.querySelector('body');
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      // Only element nodes have a class; text nodes and SVG elements are skipped safely
      var badgeAdded = Array.prototype.some.call(mutation.addedNodes, function(node) {
        return node.nodeType === 1 && (node.getAttribute('class') || "").includes("_pendo-badge");
      });
      if (badgeAdded && pendo.badgesShown) {
        var badgeList = pendo.badgesShown;
        Object.keys(badgeList).forEach(gid => pendo.addAltText(gid)); 
      }
    })
  })
  var config = {
    attributeFilter: ['data-layout'],
    attributes: true,
    childList: true,
    characterData: true,
    subtree: false
  };
  observer.observe(target, config);
}