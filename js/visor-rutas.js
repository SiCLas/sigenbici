///////////////////////////////////////////////////////////////////////////////////////////////////
// Mapa ciclista interactivo v. 0.3
// Proyecto SIGenBici
// CC-BY-SA
// 09 de abril de 2021
///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
// Panel de control de rutas
// Control de las capas
///////////////////////////////////////////////////////////////////////////////////////////////////

var controlRutas = L.control.layers(null,null,{collapsed:false},{autoZIndex:true}).addTo(map);

var htmlObject2 = controlRutas.getContainer();
var b = document.getElementById('control-rutas')
/* function setParent(el, newParent){
  newParent.appendChild(el);
  } */
setParent(htmlObject2, b);

// Definir estilo para las capas GPX
// http://leafletjs.com/reference.html#geojson-style
var customLayer = L.geoJson(null, {
    style: function(feature) {
        return { color: 'Lime', weight: '9', opacity: '0.4' };
    }
});

var customLayer1 = L.geoJson(null, {
    style: function(feature) {
        return { color: 'Lime', weight: '9', opacity: '0.4' };
    }
});

var customLayer2 = L.geoJson(null, {
    style: function(feature) {
        return { color: 'Lime', weight: '9', opacity: '0.4' };
    }
});

var customLayer3 = L.geoJson(null, {
    style: function(feature) {
        return { color: 'Lime', weight: '9', opacity: '0.4' };
    }
});

var customLayer4 = L.geoJson(null, {
    style: function(feature) {
        return { color: 'Lime', weight: '9', opacity: '0.4' };
    }
});

var customLayer5 = L.geoJson(null, {
    style: function(feature) {
        return { color: 'Lime', weight: '9', opacity: '0.4' };
    }
});

var customLayer6 = L.geoJson(null, {
    style: function(feature) {
        return { color: 'Lime', weight: '9', opacity: '0.4' };
    }
});

var customLayer7 = L.geoJson(null, {
    style: function(feature) {
       return { color: 'Lime', weight: '7', opacity: '0.4' };
    }
});


// Mostrar archivos GPX en el panel Rutas.
var runLayer = omnivore.gpx("./visor/rutas/aranjuez-udem.gpx", null, customLayer);
	controlRutas.addOverlay(runLayer, '<strong>Aranjuez-UdeM</strong>');
var runLayer = omnivore.gpx("./visor/rutas/Bello-Carlos E.gpx", null, customLayer1);
	controlRutas.addOverlay(runLayer, '<strong>Bello-Carlos E. Restrepo</strong>');
var runLayer = omnivore.gpx("./visor/rutas/Boston-ITM Robledo.gpx", null, customLayer2);
	controlRutas.addOverlay(runLayer, '<strong>Boston-ITM Robledo</strong>');
var runLayer = omnivore.gpx("./visor/rutas/Envigado-Centro.gpx", null, customLayer3);
	controlRutas.addOverlay(runLayer, '<strong>Envigado-Centro</strong>');
var runLayer = omnivore.gpx("./visor/rutas/La America-Provenza.gpx", null, customLayer4);
	controlRutas.addOverlay(runLayer, '<strong>La América-Provenza</strong>');
var runLayer = omnivore.gpx("./visor/rutas/SanJavier-BuenosAires.gpx", null, customLayer5);
	controlRutas.addOverlay(runLayer, '<strong>San Javier-Buenos Aires</strong>');
var runLayer = omnivore.gpx("./visor/rutas/UdeA-Eafit.gpx", null, customLayer6);
	controlRutas.addOverlay(runLayer, '<strong>UdeA-Eafit</strong>');
var runLayer = omnivore.gpx("./visor/rutas/rutas filtradas repubikla.gpx", null, customLayer7);
  controlRutas.addOverlay(runLayer, '<strong>Otras rutas</strong>');
  