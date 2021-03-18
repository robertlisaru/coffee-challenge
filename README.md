## Overview
You have been hired by a company that builds a app for coffee addicts.
You are responsible for taking the user's location displaying the coffee shop locations.

## Input
- read User's coordinates using the Geolocation API. https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
- read the coffee shop information from an API endpoint. API Docs can be found here: https://blue-bottle-api-test.herokuapp.com/swagger/index.html?url=/v1/docs.json#!/Coffee_shops/indexCoffeeShops

Note: The coffee shops endpoint is secured with a token and the application will need to take into account and handle different API responses.

## Output
- display a map with the coffee shop locations
- when a user clicks on a location, show a tooltip with the coffee shop name and distance to user

To calculate the distance, assume all points are on a plane.

## Getting Started with Create React App

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.