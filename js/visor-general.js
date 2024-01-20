///////////////////////////////////////////////////////////////////////////////////////////////////
// Mapa ciclista interactivo v. 0.5
// Proyecto SIGenBici
// CC-BY-SA
// Enero de 2024
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Generacion de mapas y control de mapas
////////////////////////////////////////////////////////////////////////////////

// Definición de diferentes fuentes de teselas de mapas posibles. 
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors.',
                    maxZoom: 19,
                    edgeBufferTiles: 1
});
var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012. Datos: Proyecto SIGenBici.',
  edgeBufferTiles: 1
});
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community. Datos: Proyecto SIGenBici.', 
  minZoom: 12, 
  maxZoom: 18, 
  id: 'Esri.WorldImagery',
  edgeBufferTiles: 1
});
var cyclosm_lite = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm-lite/{z}/{x}/{y}.png', {
  attribution: 'CyclOSM Lite',
  minZoom: 11,
  maxZoom: 19,
  edgeBufferTiles: 1
});
// Inicialización del mapa con OSM como mapa base predeterminado
var map = L.map('mapid', {layers: [osm]}).setView([6.248038936944781, -75.58], 13);  // Posición del mapa centrado en Medellín y nivel de zoom que abarque zona central.

//Establecer zoom mínimo y máximo posibles
map.setMinZoom(12);
map.setMaxZoom(19);

//Limitar el área del mapa
map.setMaxBounds([
  [6.814157525371442, -76.44400489567374],
  [5.454281943820035, -74.66080858168455]
]);

// Crear control de mapas base
var baseLayers = { // Leyenda de los mapas mostrados en el cuadro de selección	
  "OpenStreetMap": osm,
  "Mapa de calles (Esri)": Esri_WorldStreetMap,
  "Imágenes satelitales (Esri)": Esri_WorldImagery
};

var overlayMaps = {"Cicloinfraestructura (CyclOSM Lite)": cyclosm_lite};

// Control para cambiar mapa base, cerrado
// cambiar a collapsed:false para mostrar el cuadro abierto
//var controlMapas = L.control.layers(baseLayers, overlayMaps, { collapsed: true, position: 'bottomright' }).addTo(map);

 // Mostrar la escala del mapa en la parte inferior izquierda
L.control.scale({position: 'bottomleft'}).addTo(map);
