///////////////////////////////////////////////////////////////////////////////////////////////////
// Mapa ciclista interactivo v. 0.4
// Proyecto SIGenBici
// CC-BY-SA
// 31 de diciembre de 2023
///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
// Generacion de mapas y control de mapas
// 
///////////////////////////////////////////////////////////////////////////////////////////////////

// Definición de diferentes fuentes de teselas de mapas posibles. 
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors. Datos: Proyecto SIGenBici.',
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
var map = L.map('mapid', {layers: [osm]}).setView([6.248038936944781, -75.58030147776749], 11);  // Posición del mapa centrado en Medellín y nivel de zoom que abarque zona central del valle.

//Establecer zoom mínimo y máximo posibles
map.setMinZoom(10);
map.setMaxZoom(19);

//Limitar el área del mapa a la zona visible inicialmente
map.setMaxBounds(map.getBounds());

// Crear control de mapas base
var baseLayers = { // Leyenda de los mapas mostrados en el cuadro de selección	
  "OpenStreetMap": osm,
  "Mapa de calles (Esri)": Esri_WorldStreetMap,
  "Imágenes satelitales (Esri)": Esri_WorldImagery
};

var overlayMaps = {"Cicloinfraestructura (CyclOSM Lite)": cyclosm_lite};

// Control para cambiar mapa base, cerrado
// cambiar a collapsed:false para mostrar el cuadro abierto
L.control.layers(baseLayers, overlayMaps, { collapsed: true }).addTo(map);

// Control para ubicación usuario
L.control.locate().addTo(map);

// Mostrar la escala del mapa en la parte inferior izquierda
L.control.scale().addTo(map);

// Add search
map.setGeocoder('Nominatim', {
  email: 'contacto@siclas.org', // auth for large number of requests
    'accept-language': 'es', // render results in Spanish
    countrycodes: 'co', // limit search results to Colombia
    extratags: 1, // include additional details
    viewbox: '-75.72101014269579, 6.4784022617544395, -75.2253318522355, 5.969391404998333',
    bounded: 1
});
map.addControl(L.control.search({ position: 'bottomleft' }));

// Barra lateral
var sidebar = L.control.sidebar('sidebar').addTo(map);

///////////////////////////////////////////////////////////////////////////////////////////////////
// Agregar marca de agua con el logo en la esquina inferior derecha
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

L.control.watermark({ position: 'bottomright' }).addTo(map);