// Agent version must be 2.8.0 or lower
// Remove all guides with "Automatically" activation on client side from the payload
//
// An example initialize using advanced "events" and "guides" objects.
// If a guide has "Automatically" activation, this will disable *all* activation methods for the guide (i.e. launcher, api, etc.)
// guides.delay will load guides, but prevent the guide system from starting
// events.guideLoaded function runs after guides are loaded
//
// URL change or pendo.identify() are the typical events/methods which will reload guides
//

 pendo.initialize({
    visitor: {
      id:              'unique id'   // Required if user is logged in
      // email:        // Optional
      // role:         // Optional

      // You can add any additional visitor level key-values here,
      // as long as it's not one of the above reserved names.
    },
    account: {
      // id:           'ACCOUNT-UNIQUE-ID' // Highly recommended
      // name:         // Optional
      // planLevel:    // Optional
      // planPrice:    // Optional
      // creationDate: // Optional

      // You can add any additional account level key-values here,
      // as long as it's not one of the above reserved names.
    },
    guides: {
      delay: true
    },
    events: {
      guidesLoaded: function () {
        pendo.guides = pendo._.filter(pendo.guides,
                                      function(guide){
                                        return guide.launchMethod.indexOf('auto') < 0;
                                      }
                                     );
        pendo.startGuides();
      }
    }
 });
