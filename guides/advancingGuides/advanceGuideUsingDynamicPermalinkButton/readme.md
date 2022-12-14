# Using hidden metadata within the guide containers HTML to use in the guide permalinks URL as dynamics placeholder.

This can be used in situations where you want to redirect a user on the same or different page and trigger the guide automatically using a button in another guide such as **onboarding module** but as Pendo permalinks do not allow the use of wildcards in the URL on its own.

Example: your application URL has a customer name in it like https://customer_name.app.com or https://app.customer_name.com but Pendo Permalinks can not be link https://*.app.com or https://app.*.com then this method can be used to generate dynamic permalinks which then can be attached to buttons in your guide to redirect the user.

You can even trigger Resource Center or module within the RC on a specific page using this.
This helps in reducing the count of steps required before reaching the target page to start the actual guide journey.

Inspired by: https://support.pendo.io/hc/en-us/articles/360032206811-Recipe-Using-Metadata-in-Javascript#create-a-guide-0-0

Here we have 2 option to trigger the dynamic permalik

1. Using a clickable image in the guide, use the 

<img width="576" alt="Screenshot 2022-12-14 at 3 52 33 PM" src="https://user-images.githubusercontent.com/15645502/207569904-bbdd89e1-1167-4922-af61-081c0992f570.png">

2. Using default button provided within guides, use the 

<img width="576" alt="Screenshot 2022-12-14 at 3 53 33 PM" src="https://user-images.githubusercontent.com/15645502/207570079-d22f104b-60e9-4368-b8f7-a12371803a1f.png">
