///////////////////////////////////////////////////////////////////////////////////////////////////
// Mapa ciclista interactivo v. 0.5
// Proyecto SIGenBici
// CC-BY-SA
// Enero de 2024
///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
// Percepciones ciclistas
// Control de los puntos
///////////////////////////////////////////////////////////////////////////////////////////////////

//var controlPuntos = L.control.layers(null, null, { collapsed: true, position: 'topleft' }, { autoZIndex: true }).addTo(map);

/////////////// 
// Marker clusters
// Create MarkerCluster Group
//Custom radius and icon create function
var perceptionmarkers = L.markerClusterGroup({
  maxClusterRadius: 120,
});

 // Mostrar percepciones de seguridad personal
 var SeguroIcon = L.icon({
  iconUrl: './icons/ic_1.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});
var seguroLayer = L.geoJson(false, {
  pointToLayer: function (feature, latlng) {
    var marker = L.marker(latlng, { icon: SeguroIcon });
    marker.bindPopup("<h3 class='popupHeader'>Percepción de seguridad personal</h3>" + info_descrip(feature.properties.descripcio)
          +"<br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
          +".<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
        return marker;
  }
});
$.getJSON("./visor/puntos/seguro.geojson", function (Segurodata) {
seguroLayer.addData(Segurodata);
seguroLayer.eachLayer(function(layer) {
layer.addTo(segurosMarkerSub);
});
layerControl.addOverlay(segurosMarkerSub, "<img src='./icons/ic_1.png' width='18'> Percepción de seguridad personal", "Percepciones ciclistas");
});
  
  // Mostrar lugares agradable
    var AgradableIcon = L.icon({
      iconUrl: './icons/ic_7.png',
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    });
    var AgradableLayer = L.geoJson(false, {
      pointToLayer: function (feature, latlng) {
        var marker = L.marker(latlng, { icon: AgradableIcon });
        marker.bindPopup("<h3 class='popupHeader'>Percepción de zona agradable</h3>" + info_descrip(feature.properties.Descripcio)
          +"<br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
          +".<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
        return marker;
      }
    });
    $.getJSON("./visor/puntos/L_agradables.geojson", function (Agradabledata) {
    AgradableLayer.addData(Agradabledata);
    AgradableLayer.eachLayer(function(layer) {
    layer.addTo(agradableMarkerSub);
    });
    layerControl.addOverlay(agradableMarkerSub, "<img src='./icons/ic_7.png' width='18'> Percepción de zona agradable", "Percepciones ciclistas");
    });
  
  // Mostrar percepciones de lugares peligrosos
  var PeligrosoIcon = L.icon({
    iconUrl: './icons/ic_2.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });
  var PeligrosoLayer = L.geoJson(false, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: PeligrosoIcon });
      marker.bindPopup("<h3 class='popupHeader'>Percepción de zona peligrosa</h3>" + info_descrip(feature.properties.descripcio)
          +"<br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
          +".<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
        return marker;
    }
  });
  $.getJSON("./visor/puntos/peligroso.geojson", function (Peligrosodata) {
  PeligrosoLayer.addData(Peligrosodata);
  PeligrosoLayer.eachLayer(function(layer) {
  layer.addTo(peligrosoMarkerSub);
});
  layerControl.addOverlay(peligrosoMarkerSub, "<img src='./icons/ic_2.png' width='18'> Percepción de zona peligrosa", "Percepciones ciclistas");
  });
  
  // Mostrar problemas de infraestructura
    var InfraIcon = L.icon({
      iconUrl: './icons/ic_6.png',
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    });
    var InfraLayer = L.geoJson(false, {
      pointToLayer: function (feature, latlng) {
        var marker = L.marker(latlng, { icon: InfraIcon });
        marker.bindPopup("<h3 class='popupHeader'>Problema de infraestructura</h3>" + info_descrip(feature.properties.descripcio)
          +"<br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
          +".<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
        return marker;
      }
    });
    $.getJSON("./visor/puntos/problema-infra.geojson", function (Infradata) {
      InfraLayer.addData(Infradata);
      InfraLayer.eachLayer(function(layer) {
        layer.addTo(infraMarkerSub);
      });
    layerControl.addOverlay(infraMarkerSub, "<img src='./icons/ic_6.png' width='18'> Percepción de problema de infraestructura", "Percepciones ciclistas");
  });
  
  // Mostrar mejora entorno con cicloinfraestructura
     var MejoraIcon = L.icon({
      iconUrl: './icons/ic_10.png',
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    });
    var MejoraLayer = L.geoJson(false, {
      pointToLayer: function (feature, latlng) {
        var marker = L.marker(latlng, { icon: MejoraIcon });
        marker.bindPopup("<h3 class='popupHeader'>Percepción de mejora en el entorno</h3>" + info_descrip(feature.properties.descripcio)
          +"<br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
          +".<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
        return marker;
      }
    });
    $.getJSON("./visor/puntos/mejora.geojson", function (Mejoradata) {
      MejoraLayer.addData(Mejoradata);
      MejoraLayer.eachLayer(function(layer) {
        layer.addTo(mejoraMarkerSub);
      });
    layerControl.addOverlay(mejoraMarkerSub, "<img src='./icons/ic_10.png' width='18'> Percepción de mejora en el entorno", "Percepciones ciclistas");
  });
  
  // Mostrar desmejora entorno con cicloinfraestructura
    var DesMejoraIcon = L.icon({
      iconUrl: './icons/ic_11.png',
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    });
    var DesMejoraLayer = L.geoJson(false, {
      pointToLayer: function (feature, latlng) {
        var marker = L.marker(latlng, { icon: DesMejoraIcon });
        marker.bindPopup("<h3 class='popupHeader'>Percepción de desmejora en el entorno</h3>" + info_descrip(feature.properties.descripcio)
          +"<br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
          +".<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
        return marker;
      }
    });
    $.getJSON("./visor/puntos/desmejora.geojson", function (DesMejoradata) {
      DesMejoraLayer.addData(DesMejoradata);
      DesMejoraLayer.eachLayer(function(layer) {
        layer.addTo(desmejoraMarkerSub);
      });
      layerControl.addOverlay(desmejoraMarkerSub, "<img src='./icons/ic_11.png' width='18'> Percepción de desmejora en el entorno", "Percepciones ciclistas");
  });
  

  // Mostrar incidentes ciclistas
  var IncidenteIcon = L.icon({
    iconUrl: './icons/ic_8.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });
  var IncidenteLayer = L.geoJson(false, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: IncidenteIcon });
      marker.bindPopup("<h3 class='popupHeader'>Incidente vial ciclista</h3>"
      +"<br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
      + "<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
      return marker;
    }
  });
  $.getJSON("./visor/puntos/incidentes-viales.geojson", function (Incidentedata) {
  IncidenteLayer.addData(Incidentedata);
  IncidenteLayer.eachLayer(function(layer) {
  layer.addTo(incidenteMarkerSub);
});
  layerControl.addOverlay(incidenteMarkerSub, "<img src='./icons/ic_8.png' width='18'> Incidentes ciclistas 2020", "Percepciones ciclistas");
  });
  
    // Mostrar robos
    var roboIcon = L.icon({
      iconUrl: './icons/ic_9.png',
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    });
    var roboLayer = L.geoJson(false, {
      pointToLayer: function (feature, latlng) {
        var marker = L.marker(latlng, { icon: roboIcon });
        marker.bindPopup("<h3 class='popupHeader'>Robo</h3><br><strong> Modalidad: </strong>" + feature.properties.tipo + "<br>" + info_descrip(feature.properties.descripcion));
        return marker;
      }
    });
    $.getJSON("./visor/puntos/robos.geojson", function (robodata) {
      roboLayer.addData(robodata);
      roboLayer.eachLayer(function(layer) {
      layer.addTo(roboMarkerSub);
  });
    layerControl.addOverlay(roboMarkerSub, "<img src='./icons/ic_9.png' width='18'> Robos de bici 2020", "Percepciones ciclistas");
  });

//Funcion para no mostrar tooltips sin datos
function info_descrip(descripcion){
  if (descripcion == null){
    return " ";
  }
  else{
    return descripcion + "<br>";
  }
}

//Funcion para decodificar genero
function info_genero(gen){
  if (gen == "1"){
    return "Femenino";
  }
  else if(gen == "2"){
    return "Masculino";
  }
  else if(gen == "3"){
    return "Otro";
  }
  else{
    return "No informa";
  }
}

//Funcion para decodificar nivel de experiencia
function info_exper(expe){
  if (expe == "1"){
    return "Bajo";
  }
  else if(expe == "2"){
    return "Medio - Bajo";
  }
  else if(expe == "3"){
    return "Medio";
  }
  else if(expe == "4"){
    return "Medio - Alto";
  }
  else if(expe == "5"){
    return "Alto";
  }
  else{
    return "No informa";
  }
}

// Create subgroups
var positiveMarkerSub = L.featureGroup.subGroup(perceptionmarkers); // DO NOT add to map.
var negativeMarkerSub = L.featureGroup.subGroup(perceptionmarkers); // DO NOT add to map.
// Create custom icon for positive cluster
var positiveMarkerSub = L.markerClusterGroup({
  iconCreateFunction: function (cluster) { // Custom icon
    var positiveMarkerSub = cluster.getAllChildMarkers();
    var n = 0;
    for (var i = 0; i < positiveMarkerSub.length; i++) {
      n += positiveMarkerSub[i].number;
    }
    return L.divIcon({ html: i, className: 'positivecluster', iconSize: L.point(40, 40) });
  }
});
// Create custom icon for negative cluster
var negativeMarkerSub = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    var negativeMarkerSub = cluster.getAllChildMarkers();
    var n = 0;
    for (var i = 0; i < negativeMarkerSub.length; i++) {
      n += negativeMarkerSub[i].number;
    }
    return L.divIcon({ html: i, className: 'negativecluster', iconSize: L.point(40, 40) });
  }
});
// Agrupar marcadores positivos
var segurosMarkerSub = L.featureGroup.subGroup(positiveMarkerSub);
var agradableMarkerSub = L.featureGroup.subGroup(positiveMarkerSub);
var mejoraMarkerSub = L.featureGroup.subGroup(positiveMarkerSub);
// Agrupar marcadores negativos
var roboMarkerSub = L.featureGroup.subGroup(negativeMarkerSub);
var incidenteMarkerSub = L.featureGroup.subGroup(negativeMarkerSub);
var peligrosoMarkerSub = L.featureGroup.subGroup(negativeMarkerSub);
var desmejoraMarkerSub = L.featureGroup.subGroup(negativeMarkerSub);
var infraMarkerSub = L.featureGroup.subGroup(negativeMarkerSub);
// Agrupar marcadores agregados
var NewMarkerSub = L.featureGroup.subGroup(positiveMarkerSub);
// Agregar clusters al mapa
positiveMarkerSub.addTo(map);
negativeMarkerSub.addTo(map);
perceptionmarkers.addTo(map);

// Leaflet Draw
// Capas para agrupar los marcadores creados y guardados
var drawnItems = L.geoJson().addTo(map);
var savedItems = L.geoJson().addTo(map);

// Definicion del control de la capa de dibujo
drawControl = new L.Control.Draw({
	edit: {// Controla la capa si se va a editar o no
             featureGroup: drawnItems,// Es el nombre de la capa que se crea arriba
             edit: false// Solo permite borrar no editar
         },
	draw: {// Permite seleccionar el tipo de elemento que se va a dibujar, las que estan en false no las muestra
		polygon : false,
		polyline: false,
		rectangle: false,
		circle: false,
		marker: {repeatMode: false}, // solo activar botón para agregar marcador
		circlemarker: false
	},
  position: 'topright'
}).addTo(map);


// Esta función cancela agregar marcador (elimina el marcador)
function cancelar() {
  map.closePopup();
  drawnItems.clearLayers();
  console.log('Cancelado');
}

// Esta funcion procesa la informacion del formulario del PopUp para los lugares marcados
function enviar2(){
	if($("input[name=tipo]:checked").val() != undefined){
		var tempMarker = layer.toGeoJSON();
		tempMarker.properties = {
			clase: "Lugar",
			tipo: $("input[name=tipo]:checked").val(),
			descrip : $("textarea[name=descrip]").val()
		};
    var contenido = "<h3 class='popupHeader'>Tu percepción ciclista</h3>Tipo de punto:" + tempMarker.properties.tipo + "<br>" + "Descripción:" + tempMarker.properties.descrip; 
		L.geoJSON(tempMarker, {markersInheritOptions: true, icon: L.icon({// Se crea el icono personalizado para el punto recien marcado
			iconUrl: getStatoIcon($("input[name=tipo]:checked").val()),
			iconSize: [50, 50],
			iconAnchor: [25, 50],
			})
		})
    .addTo(savedItems)
    .addTo(agradableMarkerSub)
    .bindPopup(contenido, {
      keepInView: true,
      closeButton: true,
      closeOnClick: true
      })
    .addTo(map);
    drawnItems.clearLayers();
    map.closePopup();
  
    console.log(tempMarker);
    console.log(savedItems);

		$("input[name=preg]").val(JSON.stringify(drawnItems.toGeoJSON()));// Se actualiza la entrada a guardar en la base de datos ???

    // La funcion define el icono a mostrar segun la respuesta marcada
function getStatoIcon(dat) {
	return  dat == 'seguro'   ? './icons/ic_1.png' :
			dat == 'peligroso'   ? './icons/ic_2.png' :
			dat == 'agradable'   ? './icons/ic_7.png' :
			dat == 'problema_inf'   ? './icons/ic_6.png' :
			dat == 'accident'   ? './icons/ic_5.png' :
			'./icons/ic_0.png';       
}
	}
	else{
		console.log('undefined');
	}
} 

map.on('draw:created', function(e) {
  layer = e.layer,
    feature = layer.feature = layer.feature || {}; // Intialize layer.feature
    feature.type = feature.type || "Feature"; // Intialize feature.type
    var props = feature.properties = feature.properties || {}; // Intialize feature.properties
    props.tipo = null;
    props.fecha = null;
	$("input[name=tipo]:checked").val("");
	$("textarea[name=descrip]").val("");
	// Toma las coordenadas del marcador reciente
	a = layer.getLatLng();
	lat = a.lat;
	lng = a.lng;
  console.log(`'Lat': ${a.lat}`, `'Lng': ${a.lng}`);
  var tempMarker = drawnItems.addLayer(e.layer);
  var popupContent = // Se crea un formulario al interior del popup
  popup_content = String("<form name='emergente' method='POST'>"
  +"<input type='hidden' name='lat' value="
  +lat
  +"><input type='hidden' name='lng' value="
  +lng
  +">"
  +"<div class='emergente'>"
  +"<label class= 'form-label_emer text-dark'>&#8718;&nbsp;Considera el punto marcado: </label>"
  +"<label class='text-dark'><input type='radio' class='ms-4 form-check-input' name='tipo' id='tipo' value='seguro'> Seguro</label><br>"
  +"<label class='text-dark'><input type='radio' class='ms-4 form-check-input' name='tipo' id='tipo' value='peligroso'> Peligroso</label><br>"
  +"<label class='text-dark'><input type='radio' class='ms-4 form-check-input' name='tipo' id='tipo' value='agradable'> Agradable</label><br>"
  +"<label class='text-dark'><input type='radio' class='ms-4 form-check-input' name='tipo' id='tipo' value='problema_inf'> Con problemas de Infraestructura</label><br>"
  +"<label class='text-dark'><input type='radio' class='ms-4 form-check-input' name='tipo' id='tipo' value='accident'> Con riesgo de incidentalidad</label><br><br>"
  +"<label class='form-label_emer text-dark'>&#8718;&nbsp;Razones por las cuales considera lo anterior:</label><br>"
  +"<textarea class = 'form-control bg-white text-dark' name='descrip' cols='30' rows='3' ></textarea><br><br></div>"
  +"<button type='button' onClick='enviar2();'>&nbsp;&nbsp;Guardar respuestas&nbsp;&nbsp;</button>"
  +"<button type='button' onClick='cancelar();'>&nbsp;&nbsp;Cancelar&nbsp;&nbsp;</button></form>"
);
  tempMarker.bindPopup("<h3 class='popupHeader'>Agregar punto de percepción</h3>" + popupContent,{
    keepInView: true,
    closeButton: false,
    closeOnClick: false
    }).openPopup();  
});


//-------------------------------------------------------------Establecer los textos de LF Draw en español----------------------------------------------------------

L.drawLocal.draw.toolbar.buttons.marker = 'Agregar un punto';
L.drawLocal.draw.toolbar.buttons.polyline = 'Agregar nueva ruta';
L.drawLocal.draw.handlers.marker.tooltip.start = 'Haga clic para agregar un punto';
L.drawLocal.draw.handlers.polyline.tooltip.start = 'Haga clic para empezar a dibujar la ruta';
L.drawLocal.draw.handlers.polyline.tooltip.cont = 'Haga clic en otro punto para continuar la ruta. Para terminar, haga clic en el último punto marcado';
L.drawLocal.draw.handlers.polyline.tooltip.end = 'Haga clic en otro punto para continuar la ruta. Para terminar, haga clic en el último punto marcado';

L.drawLocal.draw.toolbar.actions.title = 'Cancelar dibujo de la ruta';
L.drawLocal.draw.toolbar.actions.text = 'Cancelar';
L.drawLocal.draw.toolbar.undo.title = 'Eliminar último punto dibujado';
L.drawLocal.draw.toolbar.undo.text = 'Eliminar último punto';
L.drawLocal.draw.toolbar.finish.title = 'Finalizar dibujo de la ruta';
L.drawLocal.draw.toolbar.finish.text = 'Finalizar';

L.drawLocal.edit.toolbar.buttons.remove = 'Eliminar elementos';
L.drawLocal.edit.toolbar.buttons.removeDisabled = 'No hay elementos para eliminar';
L.drawLocal.edit.handlers.remove.tooltip.text = 'Clic en el elemento a eliminar';
L.drawLocal.edit.toolbar.actions.cancel.title = 'Cancelar edición, no guardar cambios';
L.drawLocal.edit.toolbar.actions.cancel.text = 'Cancelar';
L.drawLocal.edit.toolbar.actions.save.title = 'Guardar cambios';
L.drawLocal.edit.toolbar.actions.save.text = 'Guardar';
