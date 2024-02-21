(function advanceGuideOnClick(dom) {
  const advanceOnce = pendo._.once(pendo.onGuideAdvanced); // makes sure the guide only advances one time

  // you can add as many element rules as you like
  // these element rules can be an id like #myId or a class like .myClass
  const elementGroup1 = dom("#myId");
  const elementGroup2 = dom(".myClass");

  // add each elementGroup to the elements array
  const elements = [elementGroup1, elementGroup2];

  // adds listeners to each element
  elements.forEach((elm) => {
    for (let i = 0; i < elm.length; i++)
      pendo.attachEvent(elm[i], "click", advanceOnce);
  });

  // remove listeners after step completes
  step.after("teardown", () => {
    elements.forEach((elm) => {
      console.log(elm);
      for (let i = 0; i < elm.length; i++)
        pendo.detachEvent(elm[i], "click", advanceOnce);
    });
  });
})(pendo.dom);
