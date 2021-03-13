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
