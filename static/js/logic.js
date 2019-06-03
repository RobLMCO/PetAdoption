console.log("hello world")
function mapchart(sample) {}

// Function to determine marker size based on population
function markerSize(adoptions) {
  return adoptions / .15;
}
// Add a tile layer
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

// An array containing each State's name, location
var StateNames = [{
  coordinates: [1.934400, 103.358727],
  name: "Johor",
  adoptions: 3042
},
{
  coordinates: [6.155672, 100.569649],
  name: "Kedah",
  adoptions: 660
},
{
  coordinates: [6.125397, 102.238068],
  name: "Kelantan",
  adoptions: 90
},
{
  coordinates: [3.1412, 101.68653],
  name: "Kuala Lumpur",
  adoptions: 23070 / 4
},
{
  coordinates: [5.285153, 115.247787],
  name: "Labuan",
  adoptions: 18
},
{
  coordinates: [2.200844, 102.240143],
  name: "Melaka",
  adoptions: 822
},
{
  coordinates: [2.731813, 102.252502],
  name: "Negeri Sembilan",
  adoptions: 1518
},
{
  coordinates: [3.974341, 102.438057],
  name: "Pahang",
  adoptions: 510
},
{
  coordinates: [4.693950, 101.117577],
  name: "Perak",
  adoptions: 2520
},
{
  coordinates: [6.443589, 100.216599],
  name: "Perlis",
  adoptions: 20
},
{
  coordinates: [5.417071, 100.400011],
  name: "Pulau Pinang",
  adoptions: 5058
},
{
  coordinates: [5.420404, 116.796783],
  name: "Sabah",
  adoptions: 132
},
{
  coordinates: [1.544765, 110.365219],
  name: "Sarawak",
  adoptions: 78
},
{
  coordinates: [3.509247, 101.524803],
  name: "Selangor",
  adoptions: 52284 / 4
},
{
  coordinates: [5.207053, 103.205299],
  name: "Terengganu",
  adoptions: 156
}
];

// Define arrays to hold created state markers

var stateMarkers = [];

// Loop through locations and create city and state markers
for (var i = 0; i < StateNames.length; i++) {
  // Setting the marker radius for the state by passing population into the markerSize function
  stateMarkers.push(
    L.circle(StateNames[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "black",
      fillColor: "purple",
      radius: markerSize(StateNames[i].adoptions)}))}

// Create layerGroup

var states = L.layerGroup(stateMarkers);

// Create a baseMaps object

var baseMaps = {
  "Street Map": streetmap
};

// Create an overlay object
var overlayMaps = {
  "Adoptions in State": states
};

// Create a map object
var myMap = L.map("map", {
  center: [4.2105, 101.9758],
  zoom: 6,
  layers: [states, streetmap]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
