//Map setup
var map = L.map('map', {zoomControl: false}).setView([47,2], 6);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibG91bmUyMCIsImEiOiJjbDJlcHhscGgwMDFlM2xuc240bDN5ZWg3In0.14XrXfbzn314BZiOP93tLg',
    layers: [psychologues, psy_et_neuro]
}).addTo(map);
//var info_popup = L.popup().setLatLng([51.540, -0.12]).setContent("Point info !").openOn(map);


//Setting up icons
var ico_psy_et_neuro = L.icon({
    iconUrl: 'icons/psy_neuro.png',
    iconSize: [40, 40]
})

var ico_psycho = L.icon({
    iconUrl: 'icons/bust.png',
    iconSize: [35, 35]
})

//Adding markers and layers groups

var psycho_001 = L.marker([51.490, -0.08]).bindPopup("a");
var psycho_002 = L.marker([51.485, -0.075]).bindPopup("b");
var psycho_003 = L.marker([48.12248, -1.70577], {icon: ico_psycho}).bindPopup("<b>Prénom Nom de famille</b><br>10 rue adresse (Ville)");

var psyneuro_001 = L.marker([51.480, -0.07], {icon: ico_psy_et_neuro}).bindPopup("c");
var psyneuro_002 = L.marker([51.475, -0.065], {icon: ico_psy_et_neuro}).bindPopup("d");

var psychologues = L.layerGroup([psycho_001, psycho_002, psycho_003]).addTo(map);
var psy_et_neuro = L.layerGroup([psyneuro_001, psyneuro_002]).addTo(map);



//Layers and zoom control
var overlayMaps = {
    "Psychologues": psychologues,
    "Psychiatres et neurologues": psy_et_neuro
}

var layerControl = L.control.layers(null, overlayMaps, {collapsed:false, position:'topleft'}).addTo(map);
var zoomControl = L.control.zoom({position:'bottomleft'}).addTo(map);