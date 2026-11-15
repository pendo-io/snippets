(function wireChooserGrid(step) {

    // Map each tile's class (from html.html) to the ID of the guide it should open.
    // Replace the placeholder values with your own guide IDs.
    var guidesByTile = {
        cont_1: 'GUIDE_ID_1',
        cont_2: 'GUIDE_ID_2',
        cont_3: 'GUIDE_ID_3',
        cont_4: 'GUIDE_ID_4'
    };

    if (!step) return;
    var guideRoot = step.guideElement[0];

    function openGuideForTile(target) {
        var tile = pendo.dom(target).closest('.container');
        if (!tile.length) return false;

        var tileClass = Object.keys(guidesByTile).find(function(cls) {
            return tile[0].classList.contains(cls);
        });
        var guideId = tileClass && guidesByTile[tileClass];
        if (!guideId) return false;

        // Dismiss the current guide, then show the chosen guide on the same page.
        pendo.onGuideDismissed();
        pendo.showGuideById(guideId);
        return true;
    }

    // Make each configured tile reachable and usable with a keyboard, like a button
    Object.keys(guidesByTile).forEach(function(cls) {
        var tile = guideRoot.querySelector('.container.' + cls);
        if (!tile) return;
        tile.setAttribute('role', 'button');
        tile.setAttribute('tabindex', '0');
    });

    step.attachEvent(guideRoot, 'click', function(e) {
        openGuideForTile(e.target || e.srcElement);
    });

    // Enter or Space on a focused tile opens its guide, the same as a click
    step.attachEvent(guideRoot, 'keydown', function(e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        if (openGuideForTile(e.target || e.srcElement)) {
            e.preventDefault(); // stop Space from scrolling the page
        }
    });
})(step, guide);
