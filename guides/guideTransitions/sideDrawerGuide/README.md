# Side Drawer Guide
This snippet turns a Pendo guide into a side drawer that slides in from the edge of the screen and pushes the underlying page content over, rather than floating on top of it. It closes automatically when the user clicks outside the guide, clicks a link that navigates away, or hits the guide's close button — and the page smoothly restores to its original position.

![Side drawer demo](./sideDrawerGuide.gif)

Update the `el` selector and `GUIDE_ID`/close button ID comments in the JS to match your specific guide before using.

For detailed setup notes, annotations, and the original build process (including how this was adapted from a Parta embed use case), see [this doc](https://docs.google.com/document/d/1OOs65KhK8WVKspq-G8JMJgSobfp_7vNo8Wl7r5R9cOc/edit?usp=sharing).
