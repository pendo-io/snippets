(function wireGuideScrollToBottom(step) {
    step && step.attachEvent(step.guideElement[0], 'scroll', pendo._.throttle(function onScroll(e) {
        var scrollable = pendo.Sizzle('.article-body');
        if(scrollable[0].offsetHeight + scrollable[0].scrollTop == scrollable[0].scrollHeight) {
				      console.log('SCROLLED TO BOTTOM');
		    }
    }, 150));
})(step,guide);
