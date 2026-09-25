(function (step) {
    if (pendo.designerEnabled) { return; }

    const p_backdrop = document.querySelector('#pendo-backdrop'); // backdrop node
    const p_open = pendo.dom(step.elementPathRule)[0]; // section shown above backdrop
    const p_top_backdrop = document.querySelector('.pendo-backdrop-region-top'); // top section of backdrop

    if (!p_backdrop || !p_open.length || !p_top_backdrop) { return; }

    const top_height = p_top_backdrop.getBoundingClientRect().height + "px"; // get height of top section
    const top_pos_left = p_top_backdrop.getBoundingClientRect().left + "px"; // get left position offset of top section
    
    const open_section_height = p_open.getBoundingClientRect().height +"px";// get height of section shown above backdrop
    const open_section_width = p_open.getBoundingClientRect().width + "px";// get width of section shown above backdrop
    
    // construct additional backdrop div to cover open section
    // console.log(top_height, top_pos_left, open_section_height, open_section_width);
    
    const open_section = document.createElement('div');
    open_section.className = "_pendo-backdrop";
    Object.assign(open_section.style, {
        'top': top_height, // use height of existing top backdrop as offset
        'height': open_section_height, // cover whole height of open section
        'left': top_pos_left, // left offset equal to top section of backdrop
        'width': open_section_width, // cover whole width of open section
        'z-index': '200000', // adjust if needed
        'position': 'fixed',
        'opacity': '0', // sets opacity to 0 so elements behind it are visible
        'pointer-events': 'all',
        'float': 'none',
        'vertical-align': 'baseline',
        'display': 'block'
    });
    try {
        p_backdrop.appendChild(open_section); // add new div to backdrop section of the guide DOM
    } catch (err) {}
})(step, guide);
