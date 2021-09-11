## Services Recipe
This recipe of custom code has been created by Pendo Professional Services, intended to extend the capabilities of Pendo products. All recipes are free to use, and as such, there is NO WARRANTY, SLA or SUPPORT for these recipes. Please do not reach out to Pendo Support for help with these recipes, as custom code is outside of the remit of their team and responsibilities.

## Objective
Creating an experience to provide multiple options from a single guide experience in a grid layout.

## Requirements
- HTML
- CSS
- Javascript
- Guide Id
- Custom code for the chooser grid

## Steps
- Create a new lightbox type guide from scratch by selecting the default Pendo layout for Lightbox: Start from Scratch
- In the guide step and add a custom code block
- On the container settings, add 40px to the padding top to allow for continued editing of the code building block.
- Set the backdrop of the guide step to off.
- In the HTML tab, add the code provided from the chooser.html file.
- In the CSS tab, add the code provided from the chooser.less file.
    - In the CSS tab, adjust the lines for the background image under the CSS selectors for the cards. These should be located on lines 323, 329, 335, 341. 
- In the JS tab, add the code provided from the chooser.js file.
    - In the JS tab, add the guide ids for the additional Pendo guides you would like to activate based on the click event. These should be located on lines 13 - 16.
- Guide Id: You can find the id for a guide in the URL on the Pendo application

## Miscellaneous Notes
- Editing the container will now require a click on the edit button in the step tray. There will no longer be an option to click on the border around the guide to edit the container settings to adjust the dismiss x icon color or other properties.
- This code is using undocumented APIs from the Pendo object found by inspection in the Browsers Developer Tools console. There is risk in using undocumented code which can lead to unintended future behavior if the functionality changes.
