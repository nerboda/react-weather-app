Just a simple weather app built for self education purposes. It's built using react, redux, semantic ui and webpack.

## Roadmap

#### Styling and UI Improvements

* Load screen prior to app rendering
* City search:
  * Auto complete for city name/state
    * Auto suggest node server
      * Use JSON of all us city states
    * Disallow submission for city unless it exists in json
    * If they enter zip, validate against this api and get city state info
      * https://www.zipcodeapi.com/API#zipToLoc
  * Clear search after location is added
* Pop up confirmation window prior to deleting a location
* Add some space between current location segment and other locations

