function mapchart(sample) {
// Create a map object
var myMap = L.map("map", {
  center: [4.2105, 101.9758],
  zoom: 4
});

// Add a tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// An array containing each State's name, location
var StateNames = [{
  location: [1.934400, 103.358727],
  name: "Johor",
  adoptions: 3042
},
{
  location: [6.155672, 100.569649],
  name: "Kedah",
  adoptions: 660
},
{
  location: [6.125397, 102.238068],
  name: "Kelantan",
  adoptions: 90
},
{
  location: [3.1412, 101.68653],
  name: "Kuala Lumpur",
  adoptions: 23070
},
{
  location: [5.285153, 115.247787],
  name: "Labuan",
  adoptions: 18
},
{
  location: [2.200844, 102.240143],
  name: "Melaka",
  adoptions: 822
},
{
  location: [2.731813, 102.252502],
  name: "Negeri Sembilan",
  adoptions: 1518
},
{
  location: [3.974341, 102.438057],
  name: "Pahang",
  adoptions: 510
},
{
  location: [4.693950, 101.117577],
  name: "Perak",
  adoptions: 2520
},
{
  location: [6.443589, 100.216599],
  name: "Perlis",
  adoptions: 20
},
{
  location: [5.417071, 100.400011],
  name: "Pulau Pinang",
  adoptions: 5058
},
{
  location: [5.420404, 116.796783],
  name: "Sabah",
  adoptions: 132
},
{
  location: [1.544765, 110.365219],
  name: "Sarawak",
  adoptions: 78
},
{
  location: [3.509247, 101.524803],
  name: "Selangor",
  adoptions: 52284
},
{
  location: [5.207053, 103.205299],
  name: "Terengganu",
  adoptions: 156
}
];

// Define arrays to hold created state markers

var stateMarkers = [];

// Loop through locations and create city and state markers
for (var i = 0; i < locations.length; i++) {
  // Setting the marker radius for the state by passing population into the markerSize function
  stateMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "white",
      fillColor: "white",
      radius: markerSize(locations[i].adoptions)
    })
  );
  }}