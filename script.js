//Setting up map
var map = L.map('map', {zoomControl: false}).setView([47,2], 6);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibG91bmUyMCIsImEiOiJjbDJlcHhscGgwMDFlM2xuc240bDN5ZWg3In0.14XrXfbzn314BZiOP93tLg',
}).addTo(map);
//var info_popup = L.popup().setLatLng([51.540, -0.12]).setContent("Point info !").openOn(map);

//Setting up icons
var psychiatre_neuro_icon = L.icon({
    iconUrl: 'icons/psy_neuro.png',
    iconSize: [40, 40]
})

var psychologue_icon = L.icon({
    iconUrl: 'icons/brain.png',
    iconSize: [35, 35]
})

var neuropsy_icon = L.icon({
    iconUrl: 'icons/bust.png',
    iconSize: [35, 35]
})

var generaliste_icon = L.icon({
    iconUrl: 'icons/bust.png',
    iconSize: [35, 35]
})

var autre_pratic_icon = L.icon({
    iconUrl: 'icons/bust.png',
    iconSize: [35, 35]
})

//Setting uo layer groups
var psychiatre_neuro = L.layerGroup();
var psychologue = L.layerGroup();
var neuropsy = L.layerGroup();
var generaliste = L.layerGroup();
var autre_pratic = L.layerGroup();


//Layers and zoom control
var overlayMaps = {
    "Psychiatres et neurologues": psychiatre_neuro,
    "Psychologues": psychologue,
    "Neuropsychologues": neuropsy,
    "Médecins généralistes": generaliste,
    "Autres praticien·nes": autre_pratic
};

var layerControl = L.control.layers(null, overlayMaps, {collapsed:false, position:'topleft'}).addTo(map);
var zoomControl = L.control.zoom({position:'bottomleft'}).addTo(map);

//Populate function
async function populate(categorie) {
    let json_file = categorie.concat('', ".json");
    const requestURL = json_file;
    const request = new Request(requestURL);

    const response = await fetch(request);
    const categorie_file = await response.json();

    console.log(categorie_file, json_file);

    populateMap(categorie_file, categorie);
}

function populateMap(obj, categorie) {
    catt = Function('return ' + categorie)() //see : https://stackoverflow.com/questions/1920867/get-global-variable-dynamically-by-name-string-in-javascript
    let catt_ico = categorie.concat('', "_icon");
    catt_ico = Function('return ' + catt_ico)();

    for (let i of obj){
        let j = L.marker([i.lat, i.long], {icon: catt_ico}).bindPopup(i.text);
        catt.addLayer(j);
    }
    catt.addTo(map);

}

//Main code
populate("psychiatre_neuro");
populate("psychologue");
populate("neuropsy");
populate("generaliste");
populate("autre_pratic");

//http://localhost:8000/