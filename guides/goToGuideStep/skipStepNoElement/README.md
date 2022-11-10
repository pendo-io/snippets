# Overview for skip-step-no-element 

This function searches for the presence of an element on the page. 
If the element is not present, the Guide will skip over the step that is targeting/pointing to the conditional element. 
The walktrough will advance to the step after the next step. 
If the element is present, the guide will advance to the immediate next step. 

i.e. If there's an element that some users have access to and others do not, you can create a single walkthrough that will skip over a step that points to something that not every user will see on the site. 



## How to Use:
1. Have a guide step (now called the **Optional Step**) targeting a feature that may or may not be present
2. Just _before_ the **Optional Step**, create a new, blank filler step (now called the **Invisible Step**)
3. In the **Invisible Step**, create a new custom code block and paste JavaScript snippet
4. Save the guide

The step with the code snippet will not show, as it serves to invoke the JavaScript function which checks for the element. If you want to be sure, you can add the style `display: none` to the CSS of the custom code block.

There are NO GUARANTEES these snippets function in all versions of the Pendo Agent or app.pendo.io application. These snippets may use undocumented APIs. While Pendo supports documented APIs, there is NO WARRANTY, SLA or SUPPORT for these snippets.

Support requests beyond specific supported API call function will be forwarded to Services (services@pendo.io) for handling under a pre-existing or new Services Agreement.
