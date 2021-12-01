## Reloading A Multi Step Guide

This guide should display on every page reload. Clicking a button of your choice from within the guide will dismiss the guide, but it will immediately resume from the first step on refresh / URL change.

### Purpose

This could be used for demo purposes whereby the customer wants a specific guide to appear every time a demo user logs in.

### To Use

1. Create a guide (can be single step or multi step) that contains a button that should reset the guide
2. On the guide step that contains the button, add a custom code block
3. Paste this snippet into the JS section of the code block, making sure to replace the ID with the ID of the button
