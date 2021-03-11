// Snippet Modification for Accessible Tooltip Badges
// Note: This utilizes a MutationObserver and will not work in IE6-10.  
pendo.initialize({
    visitor: {
      id:      your_visitor_id
    },
 
    account: {
      id:       your_account_id
    },

    events: {
      ready: function () {
      pendo.addBodyMutationListener();
    }
  }
});
        
// This will add an aria-role of tooltip for any image badges. Additionally:
//  1) If the badge is the RC, add the alt "Resource Center"
//  2) If the badge has a string in the guide name within #[ ], then make the
//     alt that string
//  3) Otherwise, just default the alt text to "tooltip badge"
pendo.addAltText = function(guideId) {
  var badgeId = pendo.badgesShown[guideId].domJson.children[1].props.id;
  if (pendo.dom("#"+badgeId+ " img")[0]) {
    if(pendo.dom("#"+badgeId+ " img")[0] ){
      pendo.dom("#"+badgeId+ " img")[0].setAttribute('aria-role', 'tooltip');
    }
    var guideName = pendo.guides.filter(elem=>elem.id==guideId)[0].name;
    if (guideName.includes("#[")) {
      var guideNameAltText = guideName.substring(guideName.indexOf("#[")+2, guideName.indexOf("]"));
    }

    if(pendo.guides.filter(elem=>elem.id==guideId)[0].name == "Resource Center") {
      pendo.dom("#"+badgeId+ " input")[0].setAttribute('alt', "Resource Center");
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
      if (mutation.addedNodes.length) {
        if (mutation.addedNodes[0].className.includes("_pendo-badge")) {
          if (pendo.badgesShown) {
            var badgeList = pendo.badgesShown;
            Object.keys(badgeList).forEach(gid => pendo.addAltText(gid)); 
          }
        }
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