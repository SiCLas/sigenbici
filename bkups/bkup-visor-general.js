///////////////////////////////////////////////////////////////////////////////////////////////////
// Mapa ciclista interactivo v. 0.3
// Proyecto SIGenBici
// CC-BY-SA
// 19 de noviembre de 2021
///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
// Generacion de mapas y control de mapas
// 
///////////////////////////////////////////////////////////////////////////////////////////////////

// Definición de diferentes fuentes de teselas de mapas posibles. Ver por ejemplo en: https://wiki.openstreetmap.org/wiki/Tiles 
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors. Datos: Proyecto SIGenBici.',
                    maxZoom: 19,
});
var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012. Datos: Proyecto SIGenBici.'
});
//var CyclOSM = L.tileLayer('https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
//  maxZoom: 20,
//  attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors. Datos: Proyecto SIGenBici.'
//});
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community. Datos: Proyecto SIGenBici.', 
  minZoom: 12, 
  maxZoom: 18, 
  id: 'Esri.WorldImagery'
});
var cyclosm_lite = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm-lite/{z}/{x}/{y}.png', {
  attribution: 'CyclOSM Lite',
  minZoom: 11,
  maxZoom: 20,
});
//Desactivado porque no estaba funcionando. ¿Falta clave API?
//var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{}.png', {
//  maxZoom: 20,
//  attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors. Datos: Proyecto SIGenBici.'
//});

// Inicialización del mapa con OSM como mapa base predeterminado
var map = L.map('mapid', {layers: [osm]}).setView([6.255414, -75.579095], 13);  // Posición del mapa centrado en Medellín y nivel de zoom que abarque zona central del valle. 

// Crear control de mapas base
var baseLayers = { // Leyenda de los mapas mostrados en el cuadro de selección	
  "OpenStreetMap": osm,
  "Mapa de calles (Esri)": Esri_WorldStreetMap,
//  "Smooth Dark": Stadia_AlidadeSmoothDark,
//  "Cicloinfraestructura (CyclOSM)": CyclOSM,
  "Imágenes satelitales (Esri)": Esri_WorldImagery
};

var overlayMaps = {"Cicloinfraestructura (CyclOSM Lite)": cyclosm_lite};

// Control para cambiar mapa base, cerrado
// cambiar a collapsed:false para mostrar el cuadro abierto
L.control.layers(baseLayers, overlayMaps, { collapsed: true }).addTo(map);

// Control para ubicación usuarios
L.control.locate().addTo(map);

// Mostrar la escala del mapa en la parte inferior izquierda
L.control.scale().addTo(map);

// Barra lateral
var sidebar = L.control.sidebar('sidebar').addTo(map);

///////////////////////////////////////////////////////////////////////////////////////////////////
// Agregar marca de agua con el logo en la esquina inferior izquierda
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
}

L.control.watermark({ position: 'bottomright' }).addTo(map);