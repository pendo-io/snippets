(function (step, dom) {
    /* [Adjust] Place the appropriate CSS selectors for the buttons between dom('') */
    dom('').on("click", function () {
        /* [Adjust] Place appropriate time in milliseconds between Number() */
        var howLongToSnooze = Number(15000) // 15 seconds
        pendo.onGuideSnoozed("guideSnoozed", step, howLongToSnooze);
    });
})(step, pendo.dom);

