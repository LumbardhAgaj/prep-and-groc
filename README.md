# Prep&Groc

Prep&Groc is a web based application written using **NodeJS** on the server-side and **ReactJS** on the client-side.

Its main purpose is to find the missing ingredients of a recipe which a user may want to prepare based on the ingredients that the user has currently stored in the fridge. A user may also save the missing ingredients of a recipe to the groceries list so that he can later mark them as **complete** (supposedly while he is doing the groceries).

## Main application features, expected behavior and assumptions

Some of the main application features are:

- Saving ingredients on the user fridge.
- Writing new recipes so that a user can later prepare them.
- Adding/Removing recipes to and from the user collection of recipes.
- Preparing any recipe from the user collection of recipes.

Important notes on application requirements, assumptions and its expected behavior:

- The application does not remember which recipes has prepared the user (it is not implemented). The user may prepare a recipe as many times as he may want. The fridge and groceries list will be updated each time he chooses to save the recipe missing ingredients in the groceries list.
- When a user prepares a recipe the missing ingredients are always calculated based on what ingredients the user has currently stored in the fridge and their remaining amount.
- When saving an item to the groceries list, it is marked as complete only if their remaining amount in fridge is positive. Otherwise, it will be marked as incomplete with the missing amount.
- When a user marks a groceries item as complete from the list, the application assumes that the fridge ingredient (if it exists) was "used" and deletes it from the fridge (meaning that the user did use the necessary ingredient to make the recipe/s which he selected to prepare).
- A user cannot delete a groceries item before marking it as complete from the list.
- All ingredients are converted to a default weight unit (gram) and volume unit (milliliter) to calculate the amount differences between them.
  If a recipe ingredient unit cannot be converted to the default unit of the ingredient which may be found on the fridge or in the groceries list than the user will be notified with an error message explaining the reason why he cannot prepare the selected recipe.
  Weight and volume units must be consistently used at measuring a specific ingredient, e.g you cannot prepare a recipe if you use **lb** and **ml** units to measure the same ingredient.

### To-do features list

- Creating user profile page.
- Viewing users' collection of recipes.
- Editing fridge ingredient.
- Uploading recipe images when writing new recipes instead of asking for image URL.
- Memorizing user prepared recipes.

## Quality, maintainability, performance and reliability improvements

### Client-side

- Making use of the latest react concurrent suspense to suspend: 
  - Page loading while the page items are being fetched (this will result in a less boiler code specifically inside page bodies, thus increasing code readability). 
  - Page loading when finding whether or not the user is authenticated (it will also remove an extra render of the login page, which shows up very briefly when the user refreshes or loads the page for the first time until the request is completed because by default a user is not authenticated and there is no mechanism implemented to show the request progression).
- Reducing the number of unnecessary components' re-renders by splitting the store context to further contexts (e.g. page context may represent a strong candidate). In contrast this will make the application more difficult to scale.
- Implementing error prone mechanisms for asynchronous actions inside components (cleaning up or aborting operations when component is unmounted with useEffect hook).
- Writing unit and end to end tests using Cypress or headless browser testing with Puppeteer to test the most commonly used cases (e.g. preparing a recipe and making sure the fridge ingredients and the grocery items have been correctly updated).

### Server-side

- Writing unit tests and end to end tests for the most commonly used cases.
- Organizing project structure based on components and not by technical roles (it lays down the foundation for self-contained, modular components and a scalable application).
