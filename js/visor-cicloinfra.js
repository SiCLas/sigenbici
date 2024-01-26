///////////////////////////////////////////////////////////////////////////////////////////////////
// Mapa ciclista interactivo v. 0.5
// Proyecto SIGenBici
// CC-BY-SA
// Enero de 2024
///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
// Panel cicloinfraestructura
// Control de las capas
///////////////////////////////////////////////////////////////////////////////////////////////////
// Guía de colores: https://www.w3schools.com/colors/colors_picker.asp

//var controlCapas = L.control.layers(null, null, { collapsed: true, position: 'topleft' }, { autoZIndex: true }).addTo(map);

///////////////// Grouped control
var groupedOverlays = {
  "Cicloinfraestructura": {},
  "Percepciones ciclistas": {},
  "Datos oficiales": {}
};

if (L.Browser.mobile){
  var depende = true;
} else {
  var depende = false;
}
var layerControl = L.control.groupedLayers(null, groupedOverlays, {collapsed: depende, position: 'topleft', sortLayers: false}, { autoZIndex: true }).addTo(map);

var htmlObject = layerControl.getContainer();
var a = document.getElementById('control-capas')
function setParent(el, newParent) {
  newParent.appendChild(el);
}
setParent(htmlObject, a);
L.DomEvent.disableClickPropagation(a)

// Mostrar ciclorrutas
$.getJSON("./visor/capas/ciclorruta-anden.geojson", function (DSCdata) {
  var DSCStyle = {
    "color": "#0000ff",
    "weight": 4,
    "opacity": 0.8
  };
 var DSClayer = L.geoJson(DSCdata, {onEachFeature: recorreRazgos2, style: DSCStyle}).addTo(map);
 layerControl.addOverlay(DSClayer, '<span style="display: inline-block; height: 0.5em; width: 2em; border-top: solid #0000ce 4px; vertical-align: middle;"></span>&nbspCiclorrutas', 'Cicloinfraestructura');
})


// mostrar ciclobandas en calzada
$.getJSON("./visor/capas/ciclobanda-calzada.geojson", function (BandesCyclablesdata) {
  var BandesCyclablesStyle = {
    "color": "#0000ff",
    "weight": 4,
    "opacity": 0.8,
    "dashArray": "1,5",
    "dashOffset": "5"
  };
  var BandesCyclableslayer = L.geoJson(BandesCyclablesdata, {onEachFeature: recorreRazgos3, style: BandesCyclablesStyle }).addTo(map);
  layerControl.addOverlay(BandesCyclableslayer, '<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dotted #0000ff 3px; vertical-align: middle;"></span>&nbspCiclobandas', 'Cicloinfraestructura');
 //panel.addOverlay({layer: BandesCyclableslayer}, 'Ciclobandas', 'Ciclo'); 
});

// mostrar vías ciclistas temporales
//$.getJSON("./visor/capas/temporales.json", function (PistesVoiesVertesdata) {
  //var PistesVoiesVertesStyle = {
//    "color": "#0000ff",
//    "weight": 4,
//    "opacity": 0.8,
//    "dashArray": "2,8,2"
  //};
  //var PistesVoiesVerteslayer = L.geoJson(PistesVoiesVertesdata, {onEachFeature: recorreRazgos4, style: PistesVoiesVertesStyle }).addTo(map);
  //controlCapas.addOverlay(PistesVoiesVerteslayer, '<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dashed #0000ff 4px; vertical-align: middle;"></span><strong>&nbspVías ciclistas temporales</strong>');
//});

// mostrar vías compartidas velocidad 30 km/h
$.getJSON("./visor/capas/carril-zona-30.geojson", function (MaxSpeed30data) {
  var MaxSpeed30Style = {
    "color": "#00bfff",
    "weight": 4,
    "opacity": 0.4,
  };
  var MaxSpeed30layer = L.geoJson(MaxSpeed30data, {onEachFeature: recorreRazgos5, style: MaxSpeed30Style }).addTo(map);
  layerControl.addOverlay(MaxSpeed30layer, '<span style="display: inline-block; height: 0.5em; width: 2em; border-top: solid #00bfff 4px; vertical-align: middle; opacity: 0.5"></span>&nbspCarriles ciclopreferentes', 'Cicloinfraestructura');
//panel.addOverlay({layer: MaxSpeed30layer}, 'Ciclopreferentes', 'Ciclo'); 
});

// mostrar tramos peatonales compartidos con la bici
$.getJSON("./visor/capas/peatonales.geojson", function (Peatonalesdata) {
  var PeatonalesStyle = {
    "color": "#00ff80",
    "weight": 4,
    "opacity": 0.6,
  };
  var Peatonaleslayer = L.geoJson(Peatonalesdata, {onEachFeature: recorreRazgos6, style: PeatonalesStyle }).addTo(map);
  layerControl.addOverlay(Peatonaleslayer, '<span style="display: inline-block; height: 0.5em; width: 2em; border-top: solid #00ff80 4px; vertical-align: middle; opacity: 0.5"></span>&nbspPasos peatonales', 'Cicloinfraestructura');
//panel.addOverlay({layer: Peatonaleslayer}, 'Tramos peatonales', 'Ciclo'); 
});



// Create MarkerCluster Group
var markers = L.markerClusterGroup({
  iconCreateFunction: function (cluster) { // Custom icon
    var markers = cluster.getAllChildMarkers();
    var n = 0;
    for (var i = 0; i < markers.length; i++) {
      n += markers[i].number;
    }
    return L.divIcon({ html: i, className: 'infracluster', iconSize: L.point(40, 40) });
  }}
);

// Create subgroups
var parkingMarkerSub = L.featureGroup.subGroup(markers); // DO NOT add to map.
var enciclaMarkerSub = L.featureGroup.subGroup(markers);
var BikeShopsMarkerSub = L.featureGroup.subGroup(markers);

// Mostrar estaciones Encicla 2023
var enciclaIcon = L.icon({
  iconUrl: './icons/ic_13.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});
var enciclaMarker = L.geoJson(false, {
  pointToLayer: function(feature, latlng) {
    var marker = L.marker(latlng, {
      icon: enciclaIcon
    });
    //popup
    marker.bindPopup("<h3 class='popupHeader'>" + feature.properties.name + "</h3><strong>" + (tipo_encicla(feature.properties.bicycle_rental)) + "</strong><br>" + (info_descrip(feature.properties.description)) + (foto_mapi(feature.properties.mapillary, feature.properties.name)));
      return marker;
  }
});

$.getJSON("./visor/puntos/encicla-test-mapillary.geojson", function(encicladata) {
  enciclaMarker.addData(encicladata);
  enciclaMarker.eachLayer(function(layer) {
  layer.addTo(enciclaMarkerSub);
  });
  layerControl.addOverlay(enciclaMarkerSub, "<img src='./icons/ic_13.png' width='25'>    Estaciones EnCicla", 'Cicloinfraestructura') 
 //panel.addOverlay({layer: enciclaMarker}, 'EnCicla', 'Ciclo'); 
});

// Mostrar talleres
var BikeShopsIcon = L.icon({
  iconUrl: './icons/ic_14.png',
  iconSize: [25, 25]
});
var BikeShopsMarker = L.geoJson(false, {
  pointToLayer: function(feature, latlng) {
    var marker = L.marker(latlng, {
      icon: BikeShopsIcon
    });
    //popup
    marker.bindPopup("<strong>" + feature.properties.name
        + "</strong><br><br><strong>Dirección: </strong>" + feature.properties.address
        + "<br><strong>Teléfono: </strong>" + feature.properties.phone);
      return marker;
  }
});

$.getJSON("./visor/puntos/talleres.geojson", function(BicycleShopdata) {
  BikeShopsMarker.addData(BicycleShopdata);
  BikeShopsMarker.eachLayer(function(layer) {
  layer.addTo(BikeShopsMarkerSub);
  });
  layerControl.addOverlay(BikeShopsMarkerSub, "<img src='./icons/ic_14.png' width='25'> Talleres y tiendas", 'Cicloinfraestructura') 
//panel.addOverlay({layer: BikeShopsMarker}, 'Talleres', 'Ciclo'); 
});
 
// Mostrar cicloparqueaderos
var bicycleParkingIcon = L.icon({
  iconUrl: './icons/ic_15.png',
  iconSize: [25, 25]
});
var parkingMarker = L.geoJson(false, {
  pointToLayer: function(feature, latlng) {
    var marker = L.marker(latlng, {
      icon: bicycleParkingIcon
    });
    //popup
    marker.bindPopup("<strong>Cicloparqueadero</strong>"
        + "<br><br><strong>Cubierto: </strong>" + feature.properties.covered
        + "<br><strong>Capacidad: </strong>" + feature.properties.capacity
        + "<br><strong>Tipo: </strong>" + feature.properties.bicycle_parking);
      return marker;
  }
});

$.getJSON("./visor/puntos/parqueaderos.json", function(BicycleParkingdata) {
  parkingMarker.addData(BicycleParkingdata);
  parkingMarker.eachLayer(function(layer) {
  layer.addTo(parkingMarkerSub);
  });
  layerControl.addOverlay(parkingMarkerSub, "<img src='./icons/ic_15.png' width='25'> Cicloparqueaderos", 'Cicloinfraestructura') 
 //panel.addOverlay({layer: parkingMarker}, 'Cicloparqueaderos', 'Ciclo'); 
});

// mostrar capa fotos mapi}
$.getJSON("./visor/capas/fotos-mapi.geojson", function (fotosmapidata) {
  var streetViewIcon = L.icon({
    iconUrl: './icons/street-view-solid.png',
    iconSize: [35, 35]
  });
  var fotosmapiMarker = L.geoJson(fotosmapidata, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, {
        icon: streetViewIcon
      });
      marker.on('click', function() {
        $('#OffcanvasMapillary').offcanvas('show');
        mly.moveTo(feature.properties.mapillary);
        document.getElementById("mly").scrollIntoView();
        document.getElementById("ubica").innerHTML = feature.properties.name;
      });
      return marker;
    }
  });
  layerControl.addOverlay(fotosmapiMarker, "&nbsp&nbsp<span class='fa fa-street-view'></span>&nbsp&nbspFotos a nivel de calle", "Cicloinfraestructura");
  fotosmapiMarker.addData(fotosmapidata);
});

markers.addTo(map);

/////////////////////////////
//Funcion para no mostrar descripción sin datos como undefined
function info_descrip(descripcion){
  if (descripcion == null){
    return "Sin detalles de ubicación.";
  }
  else{
    return descripcion;
  }
}

//Función para mostrar el tipo de estación EnCicla
function tipo_encicla(tipo){
    if (tipo == null){
        return "Manual";
    }
    else{
        return "Automática";
    }
}


function recorreRazgos2(feature, layer) {
	// does this feature have a property named popupContent?
	if (feature.properties) {
		var texto1 = "";
    var textoPopup = "";
    var sentidos = "";
    var descr = "";
    if(layer.feature.properties.description != null){
      descr = layer.feature.properties.description;
    }
    if(layer.feature.properties.oneway == "yes"){
      sentidos = "Unidireccional";
    }
    if(layer.feature.properties.oneway == "no"){
      sentidos = "Bidireccional";
    }
    if(layer.feature.properties.name == null){
      texto1 = "Ciclorruta";
    }
    else{
      texto1 = layer.feature.properties.name;
    }
    if(layer.feature.properties.name == null){
      textoPopup = "<h3 class='popupHeader'>Vía ciclista (exclusiva)</h3><br>Ciclorruta<br>" + sentidos + "<br>" + descr;
    }
    else{
      textoPopup = "<h3 class='popupHeader'>Vía ciclista (exclusiva)</h3><br>"+ layer.feature.properties.name + "<br>" + sentidos + "<br>" + descr;
    }
      layer.bindPopup(textoPopup);
	}
	oyente_tooltip(layer);
}

function recorreRazgos3(feature, layer) {
	// does this feature have a property named popupContent?
	if (feature.properties) {
		var texto1 = "";
    var textoPopup = "";
    var lado = "";
    var sentido = "";
    if(layer.feature.properties["cycleway:right"] == "lane"){
      lado = "Al lado derecho de la calzada.";
    }
    if(layer.feature.properties["cycleway:left"] == "lane"){
      lado = "Al lado izquierdo de la calzada.";
    }
    if(layer.feature.properties["cycleway:right:oneway"] == "yes"){
      sentido = "Unidireccional";
    }
    if(layer.feature.properties["cycleway:left:oneway"] == "yes"){
      sentido = "Unidireccional";
    }
    if(layer.feature.properties["cycleway:right:oneway"] == "no"){
      sentido = "Bidireccional";
    }
    if(layer.feature.properties["cycleway:left:oneway"] == "no"){
      sentido = "Bidireccional";
    }
    if(layer.feature.properties.name == null){
      texto1 = "Ciclobanda ";
    }
    else{
      texto1 = "Ciclobanda " + layer.feature.properties.name;
    }
    if(layer.feature.properties.name == null){
      textoPopup = "<h3 class='popupHeader'>Vía ciclista (exclusiva)</h3>Ciclobanda" + sentido+ "<br>" + lado;
    }
    else{
      textoPopup = "<h3 class='popupHeader'>Vía ciclista (exclusiva)</h3>Ciclobanda "+ layer.feature.properties.name + "<br>" + sentido+ "<br>" + lado;
    }
    layer.bindPopup(textoPopup);
	}
	oyente_tooltip(layer);
}

function recorreRazgos4(feature, layer) {
	// does this feature have a property named popupContent?
	if (feature.properties) {
		var texto = "";
    if(layer.feature.properties.name == null){
      texto = "Vía ciclista temporal";
    }
    else{
      texto = "Vía ciclista temporal - " + layer.feature.properties.name;
    }
    layer.bindPopup(texto);
	}
	oyente_popup(layer);
}

function recorreRazgos5(feature, layer) {
	// does this feature have a property named popupContent?
	if (feature.properties) {
		var texto1 = "";
    var textoPopup = "";
    var carriles = "";
    if (layer.feature.properties.lanes != null){
      carriles = "<br>Total carriles de la vía: " + layer.feature.properties.lanes;
    }
    if(layer.feature.properties.name == null){
      texto1 = "Carril ciclopreferente";
      textoPopup = "<h3 class='popupHeader'>Vía cicloadaptada (compartida)</h3>Carril ciclopreferente" + carriles;
    }
    else{
      texto1 = "Carril ciclopreferente - " + layer.feature.properties.name;
      textoPopup = "<h3 class='popupHeader'>Vía cicloadaptada (compartida)</h3>Carril ciclopreferente<br>" + layer.feature.properties.name + carriles;
    }
    layer.bindPopup(textoPopup);
	}
	oyente_tooltip(layer);
}

function recorreRazgos6(feature, layer) {
	// does this feature have a property named popupContent?
	if (feature.properties) {
		var texto = "";
    if(layer.feature.properties.name == null){
      texto = "<h3 class='popupHeader'>Pasos peatonales*</h3>Andén compartido<br><br>* En estos tramos la prioridad es peatonal y es mejor reducir la velocidad; en algunos casos, puede ser recomendable bajarse de la bici y caminar.";
    }
    else{
      texto = "<h3 class='popupHeader'>Pasos peatonales*</h3>Andén compartido<br><br>" + layer.feature.properties.name + "<br>* En estos tramos la prioridad es peatonal y es mejor reducir la velocidad; en algunos casos, puede ser recomendable bajarse de la bici y caminar.";
    }
    layer.bindPopup(texto);
	}
	oyente_tooltip(layer);
}

function recorreRazgos7(feature, layer) {
	// does this feature have a property named popupContent?
	if (feature.properties) {
		var texto = "";
    if(layer.feature.properties.name == null){
      texto = "Rampa / Escaleras";
    }
    else{
      texto = "Rampa / Escaleras" + layer.feature.properties.name;
    }
    layer.bindPopup(texto);
	}
	oyente_popup(layer);
}

function oyente_popup(layer){
    map.on('zoomstart', function (e) {
    this.closePopup();
  });
  layer.on('click', function (e) {
		this.closePopup();
	});
  layer.on('mouseover', function (e) {
		this.getPopup().setLatLng(e.latlng).openOn(layer);
	});
	layer.on('mouseout', function (e) {
		this.closePopup();
	});		
	layer.on('mousemove', function (e) {
		this.getPopup().setLatLng(e.latlng).openOn(layer);
	});
}

function oyente_tooltip(layer){
  layer.on('click', function (e) {
	//	this.closeTooltip();
    this.getPopup().setLatLng(e.latlng).openOn(layer);
	});
  layer.on('mouseout', function (e) {
		this.closeTooltip();
	});		
	};

  //Mapillary
var {Viewer} = mapillary;
var mly = new Viewer({
// Replace this with your own client ID from mapillary.com
accessToken: 'MLY|5554608214599642|0f4eab6039ca4f8060d9ed37b01c354c',
component: {
    cover: false,
    direction: true,
    sequence: true,
    zoom: true,
    combinedPanning: true,
},
container: 'mly'
//   imageId: '',  initial ID is not known at implementation time. The viewer will show a black background until a move to an ID succeeds.
});

// Viewer size is dynamic so resize should be called every time the window size changes
window.addEventListener("resize", function() { mly.resize(); });


// Filtrar fotos para mostrar solo a partir de 2020
mly.setFilter(['>', 'capturedAt', new Date(2020, 1, 1).getTime()]);


// Crear círculo verde para el marcador
var div_circle = L.divIcon({ className: 'circle'})
// Create an empty group to add markers to later on
let mapiGroup  = L.featureGroup().addTo(map)

// Crear punto en el mapa sincronizado con el visor MLY
const posi = async () => {
var position = await mly.getPosition();
var pos = [position.lat, position.lng]; 
console.log(`'posición': ${pos}`);
map.closePopup();
var positionMarker = L.marker(pos, {
  icon: div_circle
}).bindTooltip("<span style='color:#04cb62;font-size: 2.5em;' class='fa fa-street-view'></span>", 
{
    direction: 'top'
}
)
.addTo(mapiGroup)
.addTo(map)
};

// Al cambiar de posición en el visor se actualiza el marcador en el mapa
mly.on('position', posi);

// Función para mostrar las fotos
function showPic(pKey, nombre) {
mly.moveTo(pKey).catch(mapillaryErrorHandler);
document.getElementById("mly").scrollIntoView(); 
document.getElementById("ubica").innerHTML = nombre;
}

//Función para mostrar botón para fotos en popup cuando hay imagen asociada; no mostrar si no hay foto
function foto_mapi(mapi){
  if (mapi == null){
    return "";
 } 
 else{
  return ("<br><button class='mapillary' title='Ver fotos en Mapillary' onclick='showOff(" + mapi + ")'><span class='fa fa-street-view'></span> Ver fotos</button>");
 };
}

// Función para mostrar el panel lateral con el visor Mapillary
function showOff(mapi, nombre) {
  $('#OffcanvasMapillary').offcanvas('show');
  mly.moveTo(mapi);
  document.getElementById("mly").scrollIntoView();
  document.getElementById("ubica").innerHTML = "";
}

// Cerrar popup y eliminar texto de ubicación al cerrar el panel lateral
const OffcanvasMapillary = document.getElementById('OffcanvasMapillary')
OffcanvasMapillary.addEventListener('hidden.bs.offcanvas', event => {
  map.closePopup();
  mapiGroup.clearLayers();
  document.getElementById("ubica").innerHTML = "";
})