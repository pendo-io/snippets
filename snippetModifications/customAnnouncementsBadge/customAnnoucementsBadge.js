(function (apiKey) {
    (function (p, e, n, d, o) {
        var v, w, x, y, z;
        o = p[d] = p[d] || {};
        o._q = [];
        v = ['initialize', 'identify', 'updateOptions', 'pageLoad'];
        for (w = 0, x = v.length; w < x; ++w)(function (m) {
            o[m] = o[m] || function () {
                o._q[m === v[0] ? 'unshift' : 'push']([m].concat([].slice.call(arguments, 0)));
            };
        })(v[w]);
        y = e.createElement(n);
        y.async = !0;
        y.src = 'https://cdn.pendo.io/agent/static/' + apiKey + '/pendo.js';
        z = e.getElementsByTagName(n)[0];
        z.parentNode.insertBefore(y, z);
    })(window, document, 'script', 'pendo');

    // Call this whenever information about your visitors becomes available
    // Please use Strings, Numbers, or Bools for value types.
    pendo.initialize({
        /* 
        MERGE CODE FROM EXISTING INSTALLATION
        */
        visitor: {
            id: "VISITOR-UNIQUE-ID" // Required if user is logged in
            // email:        // Optional
            // role:         // Optional

            // You can add any additional visitor level key-values here,
            // as long as it's not one of the above reserved names.
        },

        account: {
            id: 'ACCOUNT-UNIQUE-ID' // Highly recommended
            // name:         // Optional
            // planLevel:    // Optional
            // planPrice:    // Optional
            // creationDate: // Optional

            // You can add any additional account level key-values here,
            // as long as it's not one of the above reserved names.
        },
        /*  START OF NOTIFICATION BADGE CODE 
            IF YOU HAVE ADDITIONAL EVENTS BE SURE TO MERGE WITH THE CODE BELOW        
        */

        events: {
            ready: function () {
                console.log('trigger ready')
                //first thing we do is set up html templates for the new badge - these can be moved if preferred
                pendo.secondaryHomeViewBubble = '<div id="pendo-secondary-home-view-bubble" class="_pendo-secondary-home-view-bubble" style="position: absolute; border-radius: 20px; height: 26px; line-height: 0px; padding: 0px 10px; right: 20px; top: 50%; margin-top: -14px; box-sizing: content-box; background-color: rgb(236, 32, 89); display: block;"><div id="pendo-secondary-home-view-count" style="display: inline-block; vertical-align: middle; line-height: 26px; font-weight: 400; font-family: inherit; color: rgb(255, 255, 255); white-space: pre-wrap;"></div></div>';
                pendo.secondaryRCBadgeTemplate = '<div id="pendo-secondary-badge-bubble" class="pendo-resource-center-badge-secondary-notification-bubble" style="position: absolute; border-radius: 20px; line-height: 0px; height: 26px; box-sizing: content-box; top: -2px; left: -12px; padding: 0px 10px; margin-left: 0px; margin-top: 0px;">' +
                    '<div class="pendo-secondary-notification-bubble-unread-count" style="font-weight: 400; font-family: inherit; height: 100%; display: inline-block; line-height: 26px; vertical-align: middle; color: rgb(255, 255, 255); white-space: pre-wrap;"></div>' + '</div> ';
                pendo.backUpPulseAnimation = '<style id="pendo-secondary-resource-center-bubble-animation">@keyframes pulse { 0% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(1.6) } } .pendo-resource-center-badge-secondary-notification-bubble::before {content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 100%; z-index: -1; animation: pulse 2s infinite; will-change: transform; }</style>';
                //This line must be updated to hold the module id of the rc module you want to draw a Homeview badge on
                pendo.customModuleSelector = '[data-pendo-module-guide-id="ZtnRUQ36CyBVVxrbifBN-gMnLWI@pQqHDQbxwFzIXVZrd4J5sQrpfno"] > ._pendo-text-link > ._pendo-row > .pendo-mock-flexbox-row > .pendo-mock-flexbox-element'
                pendo.bodyObserver = null;
                pendo.RCObserver = null;
                //state variable to avoid duplicate badges
                pendo.isSecondaryBadgeDrawn = false;
                //initializing number of alerts set to 0 for now
                pendo.alerts = 0;
                // once Pendo is ready we add a mutation listener to keep track of what Pendo is doing
                pendo.addBodyMutationListener();
            }
        }
    });

    // helper function to draw badge - calls updateSecondaryBadge to set the number
    pendo.drawSecondaryRCBadge = function () {
        document
            .getElementsByClassName("_pendo-resource-center-badge-container")[0]
            .innerHTML += pendo.secondaryRCBadgeTemplate + pendo.backUpPulseAnimation;
        pendo.secondaryRCBadgeUnreadCount = document.getElementsByClassName('pendo-secondary-notification-bubble-unread-count')[0];
        pendo.updateSecondaryRCBadge();
        pendo.isSecondaryBadgeDrawn = true;
    };

    // helper function to draw homeview badge - calls updateSecondaryHomeViewBadge to set the number
    pendo.drawSecondaryHomeViewBadge = function () {
        var targetModule = document.querySelector(pendo.customModuleSelector);
        if (targetModule) {
            targetModule.innerHTML += pendo.secondaryHomeViewBubble; //need to update this one's guide-id to your custom rc module guide id
            pendo.secondaryHomeViewBadgeCountElem = document.getElementById('pendo-secondary-home-view-count')
            pendo.updateSecondaryHomeViewBadge();
            pendo.isSecondaryBadgeDrawn = true;

        }
    }
    // updates number inside the RC secondary badge to the number in pendo.alerts
    pendo.updateSecondaryRCBadge = function () {
        pendo.secondaryRCBadgeUnreadCount.innerText = pendo.alerts;
    }
    // updates the RC Secondary Homeview badge to the the number in pendo.alerts
    pendo.updateSecondaryHomeViewBadge = function () {
        if (pendo.secondaryHomeViewBadgeCountElem) {
            pendo.secondaryHomeViewBadgeCountElem.innerText = pendo.alerts;
        }
    }

    //This is where a bulk of the action happens instantiates a mutation observer that listens for RC homeview and the
    //pendo badge. If an addedNode has the right ID and alerts are greater than 0 we draw the badge
    pendo.addBodyMutationListener = function () {
        var target = document.querySelector('body');

        // create an observer instance
        pendo.bodyObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.addedNodes.length) {
                    if (mutation.addedNodes[0].classList.contains('pendo-notification-bubble-unread-count')) {
                        pendo.setAlerts(pendo.BuildingBlocks.BuildingBlockResourceCenter.getResourceCenter().attributes.notifications.totalUnseenCount);
                    }
                    if (mutation.addedNodes[0].id == 'pendo-resource-center-container') {
                        pendo.addRCMutationListener(); //if the RC container is added start listening to what's happening inside
                        if (pendo.alerts > 0) {
                            pendo.drawSecondaryHomeViewBadge();
                            pendo.isSecondaryBadgeDrawn = true;
                        }
                    } else if (mutation.addedNodes[0].classList.contains('_pendo-resource-center-badge-container') && pendo.alerts > 0) {
                        pendo.drawSecondaryRCBadge();
                        pendo.isSecondaryBadgeDrawn = true;
                    }
                } else if (mutation.removedNodes.length) {
                    if (mutation.removedNodes[0].id == 'pendo-resource-center-container') {
                        pendo.RCObserver.disconnect(); // if the rc container is removed switch off the mutation listener
                    }
                }
            });
        });

        var config = {
            attributeFilter: ['data-layout'],
            attributes: true,
            childList: true,
            characterData: true,
            subtree: false
        };

        pendo.bodyObserver.observe(target, config);
    }

    //observes rc container to draw Badge on Home view when modules are opened and closed.
    pendo.addRCMutationListener = function () {
        var target = document.getElementById('pendo-resource-center-container');

        // create an observer instance
        pendo.RCObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.addedNodes.length && pendo.alerts > 0) {
                    if (mutation.addedNodes[0].classList.contains('_pendo-resource-center-view-transitions')) {
                        pendo.drawSecondaryHomeViewBadge();
                        pendo.isSecondaryBadgeDrawn = true;
                    }
                }
            });
        });

        var config = {
            attributeFilter: ['data-layout'],
            attributes: true,
            childList: true,
            characterData: true,
            subtree: false
        };

        pendo.RCObserver.observe(target, config);
    }

    /**
     * Set the alerts number for the new badge
     * @param  {Number} alertNum the number to display in the new notification badge. Default is zero (0)
     * @note this is the only function that needs to be called - updates pendo.alerts var and updates or removes the badges
     */
    pendo.setAlerts = function (alertNum = 0) {
        // This attribute appears to always be there on the resource center. Might be adjusted to validate it exists before setting.
        var announcementNumber = pendo.BuildingBlocks.BuildingBlockResourceCenter.getResourceCenter().attributes.notifications.totalUnseenCount;
        /* IF THE ABOVE FAILS, AS A BACKUP THE LINE BELOW WILL PULL THE INNER TEXT FROM THE ORIGINAL PENDO BADGE THAT SHOULD NOW BE HIDDEN */
        //var announcementNumber = pendo.dom('.pendo-notification-bubble-unread-count')[0].innerText
        if (announcementNumber > 0) {
            pendo.alerts = announcementNumber + alertNum;
        } else {
            pendo.alerts = alertNum
        }
        if (pendo.isSecondaryBadgeDrawn && pendo.alerts <= 0) { // if the badge is drawn but the alert number is now 0 or less
            pendo.removeSecondaryBadges()
        } else if (!pendo.isSecondaryBadgeDrawn && pendo.alerts > 0) { //if the badge isn't drawn and the number of alerts is greater than 0
            pendo.attemptToDrawSecondaryBadges()
        } else if (pendo.isSecondaryBadgeDrawn && pendo.alerts > 0) { // if the badge is drawn and the number of alerts is greater than 0
            pendo.attemptToUpdateSecondaryBadges()
        }
    }

    //helper function to call both draws at once
    pendo.attemptToDrawSecondaryBadges = function () {
        pendo.drawSecondaryHomeViewBadge();
        pendo.drawSecondaryRCBadge();
    }

    //helper function to update both badge numbers at once
    pendo.attemptToUpdateSecondaryBadges = function () {
        pendo.updateSecondaryHomeViewBadge();
        pendo.updateSecondaryRCBadge();
    }

    //Removes all the secondary badge items
    pendo.removeSecondaryBadges = function () {
        var homeViewBubble = document.getElementById('pendo-secondary-home-view-bubble')
        var rcBadgeBubble = document.getElementById('pendo-secondary-badge-bubble')
        if (homeViewBubble) {
            homeViewBubble.parentNode.removeChild(homeViewBubble)
        }
        if (rcBadgeBubble) {
            rcBadgeBubble.parentNode.removeChild(rcBadgeBubble)
        }
        pendo.isSecondaryBadgeDrawn = false;
    }

})('YOUR-API-KEY')