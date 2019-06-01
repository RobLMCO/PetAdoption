//function mapchart(sample) {
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
},
{
  location: [6.155672, 100.569649],
  name: "Kedah",
},
{
  location: [6.125397, 102.238068],
  name: "Kelantan",
},
{
  location: [3.1412, 101.68653],
  name: "Kuala Lumpur",
},
{
  location: [5.285153, 115.247787],
  name: "Labuan",
},
{
  location: [2.200844, 102.240143],
  name: "Melaka",
},
{
  location: [2.731813, 102.252502],
  name: "Negeri Sembilan",
},
{
  location: [3.974341, 102.438057],
  name: "Pahang",
},
{
  location: [4.693950, 101.117577],
  name: "Perak",
},
{
  location: [6.443589, 100.216599],
  name: "Perlis",
},
{
  location: [5.417071, 100.400011],
  name: "Pulau Pinang",
},
{
  location: [5.420404, 116.796783],
  name: "Sabah",
},
{
  location: [1.544765, 110.365219],
  name: "Sarawak",
},
{
  location: [3.509247, 101.524803],
  name: "Selangor",
},
{
  location: [5.207053, 103.205299],
  name: "Terengganu",
}
];

// Loop through the StateNames array and create one marker for each State, bind a popup containing its name add it to the map
for (var i = 0; i < StateNames.length; i++) {
  var StateName = StateNames[i];
  L.marker(StateName.location)
    .bindPopup("<h1>" + StateName.name + "</h1>")
    .addTo(myMap);
}
//}