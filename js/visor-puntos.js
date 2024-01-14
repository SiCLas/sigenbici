///////////////////////////////////////////////////////////////////////////////////////////////////
// Mapa ciclista interactivo v. 0.5
// Proyecto SIGenBici
// CC-BY-SA
// Enero de 2023
///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
// Panel puntos de interés
// Control de los puntos
///////////////////////////////////////////////////////////////////////////////////////////////////

var controlPuntos = L.control.layers(null, null, { collapsed: true, position: 'topleft' }, { autoZIndex: true }).addTo(map);

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
          +".<br><br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
          +".<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
        return marker;
  }
});
$.getJSON("./visor/puntos/seguro.geojson", function (Segurodata) {
seguroLayer.addData(Segurodata);
seguroLayer.eachLayer(function(layer) {
layer.addTo(segurosMarkerSub);
});
controlPuntos.addOverlay(segurosMarkerSub, "<img src='./icons/ic_1.png' width='18'> <strong>Percepción de seguridad personal</strong>");
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
          +".<br><br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
          +".<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
        return marker;
      }
    });
    $.getJSON("./visor/puntos/L_agradables.geojson", function (Agradabledata) {
    AgradableLayer.addData(Agradabledata);
    AgradableLayer.eachLayer(function(layer) {
    layer.addTo(agradableMarkerSub);
    });
    controlPuntos.addOverlay(agradableMarkerSub, "<img src='./icons/ic_7.png' width='18'> <strong>Percepción de zona agradable</strong>");
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
          +".<br><br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
          +".<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
        return marker;
    }
  });
  $.getJSON("./visor/puntos/peligroso.geojson", function (Peligrosodata) {
  PeligrosoLayer.addData(Peligrosodata);
  PeligrosoLayer.eachLayer(function(layer) {
  layer.addTo(peligrosoMarkerSub);
});
  controlPuntos.addOverlay(peligrosoMarkerSub, "<img src='./icons/ic_2.png' width='18'> <strong>Percepción de zona peligrosa</strong>");
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
          +".<br><br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
          +".<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
        return marker;
      }
    });
    $.getJSON("./visor/puntos/problema-infra.geojson", function (Infradata) {
      InfraLayer.addData(Infradata);
      InfraLayer.eachLayer(function(layer) {
        layer.addTo(infraMarkerSub);
      });
    controlPuntos.addOverlay(infraMarkerSub, "<img src='./icons/ic_6.png' width='18'> <strong>Percepción de problema de infraestructura</strong>");
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
          +".<br><br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
          +".<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
        return marker;
      }
    });
    $.getJSON("./visor/puntos/mejora.geojson", function (Mejoradata) {
      MejoraLayer.addData(Mejoradata);
      MejoraLayer.eachLayer(function(layer) {
        layer.addTo(mejoraMarkerSub);
      });
    controlPuntos.addOverlay(mejoraMarkerSub, "<img src='./icons/ic_10.png' width='18'> <strong>Percepción de mejora en el entorno</strong>");
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
          +".<br><br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
          +".<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
        return marker;
      }
    });
    $.getJSON("./visor/puntos/desmejora.geojson", function (DesMejoradata) {
      DesMejoraLayer.addData(DesMejoradata);
      DesMejoraLayer.eachLayer(function(layer) {
        layer.addTo(desmejoraMarkerSub);
      });
      controlPuntos.addOverlay(desmejoraMarkerSub, "<img src='./icons/ic_11.png' width='18'> <strong>Percepción de desmejora en el entorno</strong>");
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
  controlPuntos.addOverlay(incidenteMarkerSub, "<img src='./icons/ic_8.png' width='18'> <strong>Incidentes ciclistas 2020</strong>");
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
    controlPuntos.addOverlay(roboMarkerSub, "<img src='./icons/ic_9.png' width='18'> <strong>Robos de bici 2020</strong>");
  });

//Funcion para no mostrar tooltips sin datos
function info_descrip(descripcion){
  if (descripcion == null){
    return " ";
  }
  else{
    return descripcion;
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
// Agregar clusters al mapa
positiveMarkerSub.addTo(map);
negativeMarkerSub.addTo(map);
perceptionmarkers.addTo(map);