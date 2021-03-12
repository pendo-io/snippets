//// Four Buttons
//// Author: Mike Fo
//// NOTE: This requires building blocks to be present: One row containing three buttons, 
////       immediately followed by one row with a single button.

//// HOW TO USE: Assuming you've followed the note above, just change the text to match the
////             buttons and alter the padding accordingly in the variables below.

var firstButtonText = "Button 1";
var fourthButtonText = "Button 4";
var fourthButtonPadding = "290px;";

if (pendo.getActiveGuide()) {
    var row1 = pendo.dom('._pendo-button:contains("'+ firstButtonText+ '")')[0].parentElement.parentElement;
    var row2 = pendo.dom('._pendo-button:contains("'+ fourthButtonText+ '")')[0].parentElement;

    pendo.dom(row1).css("float: left;");
    pendo.dom(row2).css("padding-left: " + fourthButtonPadding + ";");
}
