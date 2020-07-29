# Kitesurfing

- Users will be able to log in by using email and password (LOGIN PAGE).
  After logging in, the user will see a screen
- (DASHBOARD) where information about all kitesurfing spots around the world (information needs to come from the API), in the form of:

  - A map with pins for all spots fetched (suggestions for 3rd party libraries LeafletJS, Google Maps, Mapbox)
  - Table with all the spots and their information: name, latitude, longitude, country, wind probability, month when it is kiting season at that spot.
    On the dashboard we will have a filter button. The user will press it and enter filter parameters: country and wind probability. The map and table will update accordingly.

- On the dashboard we will have a filter button. The user will press it and enter filter parameters: country and wind probability. The map and table will update accordingly.
- When the user taps a location on the map, a popup will appear (DETAILS PAGE), where detailed information will be shown about that spot.
- From the DETAILS PAGE, the user will be able to ADD TO FAVOURITES, by pressing a button. If the spot is already a user favourite, the user should have the option to REMOVE FROM FAVOURITES.
- On the map and in the list, favourite spots need to be marked differently, using a yellow color.
- In the DASHBOARD, top-right, a profile button will show a menu with a single action: “Log out”.

## Live website
https://kitesurfing.netlify.app/
