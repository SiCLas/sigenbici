///////////////////////////////////////////////////////////////////////////////////////////////////
// Mapa ciclista interactivo v. 0.3
// Proyecto SIGenBici
// CC-BY-SA
// 14 de noviembre de 2021
// Última actualización: 14 de julio de 2023
///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
// Panel datos oficiales
// Control de las capas
///////////////////////////////////////////////////////////////////////////////////////////////////

var controlAdmon = L.control.layers(null, null, { collapsed: false }, { autoZIndex: true }).addTo(map);

var htmlObject4 = controlAdmon.getContainer();
var d = document.getElementById('control-admon')
function setParent(el, newParent) {
  newParent.appendChild(el);
}
setParent(htmlObject4, d);


// Definir estilo de línea para las capas y agregar tooltip con info de los objetos
var customLayer8 = L.geoJson(null, {onEachFeature: recorreRazgos9, style: function (feature) {
    return feature.properties, {color: '#BA4A00', dashArray: '1,5', weight: '4', opacity: '0.7' };
  }});
var customLayer9 = L.geoJson(null, {onEachFeature: recorreRazgos8, style: function (feature) {
    return feature.properties, { color: '#229954', weight: '5', opacity: '0.3' };
  }});

// Capa límites de comunas y corregimientos
var runLayer = omnivore.kml("./visor/admon/Limite_Comuna_Corregimiento.kml", null, customLayer9);
controlAdmon.addOverlay(runLayer, "<span style='display: inline-block; background: #229954; opacity: 0.3; height: 1em; width: 2em; border: solid #1BD66A 3px; vertical-align: middle;'></span><strong>&nbspComunas y corregimientos de Medellín</strong>");

// mostrar redes camineras desde geodatos Medellín
// $.getJSON("https://opendata.arcgis.com/datasets/f327c5df0c8e4f70899773cc8b376c7d_0.geojson",function(Camineradata){
 //Definir icono 
// var camineraIcono = L.icon({ 
//  iconUrl: './icons/ic_1.png', 
//  iconSize: [25,25]
//});
//var camineraLayer = L.geoJson(Camineradata,{
//pointToLayer: function(feature,latlng){
//var marker = L.marker(latlng,{icon: camineraIcono});//aqui hay que ajustar el color con la leyenda
//marker.bindPopup(feature.properties.ESTADO);
//return marker;
//}
//})
//controlAdmon.addOverlay(camineraLayer, "<span style='display: inline-block; height: 0.5em; width: 2em; border-top: solid green 3px; vertical-align: middle;'></span><strong>&nbspRedes camineras Medellín</strong>");
//});

// mostrar cicloinfraestructura de Medellín según el POT 2014-2027
var runLayer = omnivore.kml("./visor/admon/POT-MDE.kml", null, customLayer8);
controlAdmon.addOverlay(runLayer, '<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dotted #BA4A00 4px; vertical-align: middle;"></span><strong>&nbspCicloinfraestructura POT 2014-2027 MDE</strong>');

// mostrar ciclistas muertos en Medellín en 2015
$.getJSON("./visor/admon/ciclistas-muertos-2015.geojson", function (Biciblancadata) {
  // Definir icono bici blanca
  var biciIcono = L.icon({
    iconUrl: './icons/ic_12.png',
    iconSize: [25, 25]
  });
  var biciLayer = L.geoJson(Biciblancadata, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: biciIcono });
      marker.bindPopup("Sexo: " + feature.properties.Sexo + "<br />Edad: " + feature.properties.Edad + " años<br /> Colisión con " + feature.properties.Interaccion + ".<br>" + feature.properties.Fecha_Ocurrencia);
      return marker;
    }
  })
  controlAdmon.addOverlay(biciLayer, "&nbsp&nbsp<img src='./icons/ic_12.png' width='18'><strong>&nbsp&nbspCiclistas muertos en Medellín 2015</strong>");
});

// mostrar ciclistas muertos en Medellín en 2016
$.getJSON("./visor/admon/ciclistas-muertos-2016.geojson", function (Biciblancadata) {
  // Definir icono bici blanca
  var biciIcono = L.icon({
    iconUrl: './icons/ic_12.png',
    iconSize: [25, 25]
  });
  var biciLayer = L.geoJson(Biciblancadata, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: biciIcono });
      marker.bindPopup("Sexo: " + feature.properties.Sexo + "<br />Edad: " + feature.properties.Edad + " años<br /> Colisión con " + feature.properties.Interaccion + ".<br>" + feature.properties.Fecha_Ocurrencia);
      return marker;
    }
  })
  controlAdmon.addOverlay(biciLayer, "&nbsp&nbsp<img src='./icons/ic_12.png' width='18'><strong>&nbsp&nbspCiclistas muertos en Medellín 2016</strong>");
});

// mostrar ciclistas muertos en Medellín en 2017
$.getJSON("./visor/admon/ciclistas-muertos-2017.geojson", function (Biciblancadata) {
  // Definir icono bici blanca
  var biciIcono = L.icon({
    iconUrl: './icons/ic_12.png',
    iconSize: [25, 25]
  });
  var biciLayer = L.geoJson(Biciblancadata, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: biciIcono });
      marker.bindPopup("Sexo: " + feature.properties.Sexo + "<br />Edad: " + feature.properties.Edad + " años<br /> Colisión con " + feature.properties.Interaccion + ".<br>" + feature.properties.Fecha_Ocurrencia);
      return marker;
    }
  })
  controlAdmon.addOverlay(biciLayer, "&nbsp&nbsp<img src='./icons/ic_12.png' width='18'><strong>&nbsp&nbspCiclistas muertos en Medellín 2017</strong>");
});

// mostrar ciclistas muertos en Medellín en 2018
$.getJSON("./visor/admon/ciclistas-muertos-2018.geojson", function (Biciblancadata) {
  // Definir icono bici blanca
  var biciIcono = L.icon({
    iconUrl: './icons/ic_12.png',
    iconSize: [25, 25]
  });
  var biciLayer = L.geoJson(Biciblancadata, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: biciIcono });
      marker.bindPopup("Sexo: " + feature.properties.Sexo + "<br />Edad: " + feature.properties.Edad + " años<br /> Colisión con " + feature.properties.Interaccion + ".<br>" + feature.properties.Fecha_Ocurrencia);
      return marker;
    }
  })
  controlAdmon.addOverlay(biciLayer, "&nbsp&nbsp<img src='./icons/ic_12.png' width='18'><strong>&nbsp&nbspCiclistas muertos en Medellín 2018</strong>");
});

// mostrar ciclistas muertos en Medellín en 2019
$.getJSON("./visor/admon/ciclistas-muertos-2019.geojson", function (Biciblancadata) {
  // Definir icono bici blanca
  var biciIcono = L.icon({
    iconUrl: './icons/ic_12.png',
    iconSize: [25, 25]
  });
  var biciLayer = L.geoJson(Biciblancadata, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: biciIcono });
      marker.bindPopup("Sexo: " + feature.properties.Sexo + "<br />Edad: " + feature.properties.Edad + " años<br /> Colisión con " + feature.properties.Interaccion + ".<br>" + feature.properties.Fecha_Ocurrencia);
      return marker;
    }
  })
  controlAdmon.addOverlay(biciLayer, "&nbsp&nbsp<img src='./icons/ic_12.png' width='18'><strong>&nbsp&nbspCiclistas muertos en Medellín 2019</strong>");
});

// Mostrar ciclistas muertos 2020
$.getJSON("./visor/admon/fallecidos-2020.geojson", function (Biciblancadata) {
  // Definir icono bici blanca
  var biciIcono = L.icon({
    iconUrl: './icons/ic_12.png',
    iconSize: [25, 25]
  });
  var biciLayer = L.geoJson(Biciblancadata, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: biciIcono });
      marker.bindPopup("Fecha incidente: " + feature.properties.fecha + "<br />Ciclista " + feature.properties.sexo + " de " + feature.properties.edad + " años, colisión con " + feature.properties.colision);
      return marker;
    }
  })
  controlAdmon.addOverlay(biciLayer, "&nbsp&nbsp<img src='./icons/ic_12.png' width='18'><strong>&nbsp&nbspCiclistas muertos en Medellín 2020 </strong>");
});


// mostrar ciclistas muertos en Medellín en 2021
$.getJSON("./visor/admon/ciclistas-muertos-2021.geojson", function (Biciblancadata) {
  // Definir icono bici blanca
  var biciIcono = L.icon({
    iconUrl: './icons/ic_12.png',
    iconSize: [25, 25]
  });
  var biciLayer = L.geoJson(Biciblancadata, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: biciIcono });
      marker.bindPopup("Sexo: " + feature.properties.Sexo + "<br />Edad: " + feature.properties.Edad + " años<br /> Colisión con " + feature.properties.Interaccion + ".<br>" + feature.properties.Fecha_Ocurrencia);
      return marker;
    }
  })
  controlAdmon.addOverlay(biciLayer, "&nbsp&nbsp<img src='./icons/ic_12.png' width='18'><strong>&nbsp&nbspCiclistas muertos en Medellín 2021</strong>");
});


// mostrar ciclistas muertos en Medellín en 2022
$.getJSON("./visor/admon/ciclistas-muertos-2022.geojson", function (Biciblancadata) {
  // Definir icono bici blanca
  var biciIcono = L.icon({
    iconUrl: './icons/ic_12.png',
    iconSize: [25, 25]
  });
  var biciLayer = L.geoJson(Biciblancadata, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: biciIcono });
      marker.bindPopup("Sexo: " + feature.properties.Sexo + "<br />Edad: " + feature.properties.Edad + " años<br /> Colisión con " + feature.properties.Interaccion + ".<br>" + feature.properties.Fecha_Ocurrencia);
      return marker;
    }
  })
  controlAdmon.addOverlay(biciLayer, "&nbsp&nbsp<img src='./icons/ic_12.png' width='18'><strong>&nbsp&nbspCiclistas muertos en Medellín 2022</strong>");
});

// mostrar ciclistas muertos en Medellín en 2023
$.getJSON("./visor/admon/ciclistas-muertos-2023.geojson", function (Biciblancadata) {
  // Definir icono bici blanca
  var biciIcono = L.icon({
    iconUrl: './icons/ic_12.png',
    iconSize: [25, 25]
  });
  var biciLayer = L.geoJson(Biciblancadata, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: biciIcono });
      marker.bindPopup("Sexo: " + feature.properties.Sexo + "<br />Edad: " + feature.properties.Edad + " años<br /> Colisión con " + feature.properties.Interaccion + ".<br>" + feature.properties.Fecha_Ocurrencia);
      return marker;
    }
  })
  controlAdmon.addOverlay(biciLayer, "&nbsp&nbsp<img src='./icons/ic_12.png' width='18'><strong>&nbsp&nbspCiclistas muertos en Medellín 2023</strong>");
});

//////////////////////////////////

function recorreRazgos8(feature, layer) {
	// does this feature have a property named popupContent?
	if (feature.properties) {
		var texto = "";
    if(layer.feature.properties.NOMBRE == null || layer.feature.properties.IDENTIFICACION == null){
      texto = "Nombre no disponible";
    }
    else{
      texto = "<strong>" + layer.feature.properties.IDENTIFICACION + " </strong>- " + layer.feature.properties.NOMBRE;
    }
    layer.bindPopup(texto);
	}
	oyente_popup(layer);
}

function recorreRazgos9(feature, layer) {
	// does this feature have a property named popupContent?
	if (feature.properties) {
		var texto = "";
    if(layer.feature.properties.nombre == null){
      texto = "Nombre no disponible";
    }
    else{
      texto = layer.feature.properties.nombre;
    }
    layer.bindPopup(texto);
	}
	oyente_popup(layer);
}
