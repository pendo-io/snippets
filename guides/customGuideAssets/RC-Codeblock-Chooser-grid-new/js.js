(function wireChooserGrid(step) {

    // Map each tile's class (from html.html) to the ID of the guide it should open.
    // Replace the placeholder values with your own guide IDs.
    var guidesByTile = {
        cont_1: 'GUIDE_ID_1',
        cont_2: 'GUIDE_ID_2',
        cont_3: 'GUIDE_ID_3',
        cont_4: 'GUIDE_ID_4'
    };

    step && step.attachEvent(step.guideElement[0], 'click', function(e) {
        var tile = pendo.dom(e.target || e.srcElement).closest('.container');
        if (!tile.length) return;

        var tileClass = Object.keys(guidesByTile).find(function(cls) {
            return tile[0].classList.contains(cls);
        });
        var guideId = tileClass && guidesByTile[tileClass];
        if (!guideId) return;

        // Dismiss the current guide, then show the chosen guide on the same page.
        pendo.onGuideDismissed();
        pendo.showGuideById(guideId);
    });
})(step, guide);
