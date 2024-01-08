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
});
var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012. Datos: Proyecto SIGenBici.'
});
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community. Datos: Proyecto SIGenBici.', 
  minZoom: 12, 
  maxZoom: 18, 
  id: 'Esri.WorldImagery'
});
var cyclosm_lite = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm-lite/{z}/{x}/{y}.png', {
  attribution: 'CyclOSM Lite',
  minZoom: 11,
  maxZoom: 19,
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
L.control.layers(baseLayers, overlayMaps, { collapsed: true, position: 'bottomright' }).addTo(map);

 
// Mostrar la escala del mapa en la parte inferior izquierda
L.control.scale({position: 'bottomleft'}).addTo(map);

// Add search
map.setGeocoder('Nominatim', {
  email: 'contacto@siclas.org', // auth for large number of requests
    'accept-language': 'es', // render results in Spanish
    countrycodes: 'co', // limit search results to Colombia
    extratags: 1, // include additional details
    viewbox: '-75.72101014269579, 6.4784022617544395, -75.2253318522355, 5.969391404998333',
    bounded: 1
});
map.addControl(L.control.search({ position: 'bottomright' }));


///////////////////////////////////////////////////////////////////////////////////////////////////
// Agregar marca de agua con el logo en la esquina superior derecha
///////////////////////////////////////////////////////////////////////////////////////////////////

L.Control.Watermark = L.Control.extend({
  onAdd: function (map) {
    var img = L.DomUtil.create('img');

    img.src = './img/logo.png';
    img.style.width = '75px';

    return img;
  },

  onRemove: function (map) {
    // Nothing to do here
  }
});

L.control.watermark = function (opts) {
  return new L.Control.Watermark(opts);
};

L.control.watermark({ position: 'topright' }).addTo(map);

L.easyPrint({
	title: 'Descargar imagen del mapa',
	position: 'topright',
  sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
  filename: 'miMapaSIGenBici',
  exportOnly: true,
}).addTo(map);