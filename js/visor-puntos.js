///////////////////////////////////////////////////////////////////////////////////////////////////
// Mapa ciclista interactivo v. 0.3
// Proyecto SIGenBici
// CC-BY-SA
// 21 de julio de 2021
///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
// Panel puntos de interés
// Control de los puntos
///////////////////////////////////////////////////////////////////////////////////////////////////

var controlPuntos = L.control.layers(null, null, { collapsed: false }, { autoZIndex: true }).addTo(map);

var htmlObject3 = controlPuntos.getContainer();
var c = document.getElementById('control-puntos')
function setParent(el, newParent) {
  newParent.appendChild(el);
}
setParent(htmlObject3, c);


// Mostrar lugares seguros
$.getJSON("./visor/puntos/seguro.geojson", function (Segurodata) {
  var SeguroIcon = L.icon({
    iconUrl: './icons/ic_1.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });
  var SeguroLayer = L.geoJson(Segurodata, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: SeguroIcon });
      marker.bindTooltip(info_descrip(feature.properties.descripcio)
        +".<br><br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
        +".<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
      return marker;
    }
  })
  controlPuntos.addOverlay(SeguroLayer, "<img src='./icons/ic_1.png' width='18'> <strong>Percepción de seguridad personal</strong>");
});


// Mostrar lugares agradable
$.getJSON("./visor/puntos/L_agradables.geojson", function (Agradabledata) {
  var AgradableIcon = L.icon({
    iconUrl: './icons/ic_7.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });
  var AgradableLayer = L.geoJson(Agradabledata, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: AgradableIcon });
      marker.bindTooltip(info_descrip(feature.properties.Descripcio)
        +".<br><br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
        +".<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
      return marker;
    }
  })
  controlPuntos.addOverlay(AgradableLayer, "<img src='./icons/ic_7.png' width='18'> <strong>Percepción de zona agradable</strong>");
});


// Mostrar lugares peligrosos
$.getJSON("./visor/puntos/peligroso.geojson", function (Peligrosodata) {
  var PeligrosoIcon = L.icon({
    iconUrl: './icons/ic_2.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });
  var PeligrosoLayer = L.geoJson(Peligrosodata, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: PeligrosoIcon });
      marker.bindTooltip(info_descrip(feature.properties.descripcio)
        +".<br><br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
        +".<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
      return marker;
    }
  })
  controlPuntos.addOverlay(PeligrosoLayer, "<img src='./icons/ic_2.png' width='18'> <strong>Percepción de zona peligrosa</strong>");
});


// Mostrar problemas de infraestructura
$.getJSON("./visor/puntos/problema-infra.geojson", function (Infradata) {
  var InfraIcon = L.icon({
    iconUrl: './icons/ic_6.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });
  var InfraLayer = L.geoJson(Infradata, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: InfraIcon });
      marker.bindTooltip(info_descrip(feature.properties.descripcio));
      return marker;
    }
  })
  controlPuntos.addOverlay(InfraLayer, "<img src='./icons/ic_6.png' width='18'> <strong>Percepción de problema de infraestructura</strong>");
});

// Mostrar mejora entorno con cicloinfraestructura
$.getJSON("./visor/puntos/mejora.geojson", function (Mejoradata) {
  var MejoraIcon = L.icon({
    iconUrl: './icons/ic_10.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });
  var MejoraLayer = L.geoJson(Mejoradata, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: MejoraIcon });
      marker.bindTooltip(info_descrip(feature.properties.descripcio)
        +".<br><br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
        +".<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
      return marker;
    }
  })
  controlPuntos.addOverlay(MejoraLayer, "<img src='./icons/ic_10.png' width='18'> <strong>Percepción de mejora en el entorno</strong>");
});

// Mostrar desmejora entorno con cicloinfraestructura
$.getJSON("./visor/puntos/desmejora.geojson", function (DesMejoradata) {
  var DesMejoraIcon = L.icon({
    iconUrl: './icons/ic_11.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });
  var DesMejoraLayer = L.geoJson(DesMejoradata, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: DesMejoraIcon });
      marker.bindTooltip(info_descrip(feature.properties.descripcio)
        +".<br><br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
        +".<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
      return marker;
    }
  })
  controlPuntos.addOverlay(DesMejoraLayer, "<img src='./icons/ic_11.png' width='18'> <strong>Percepción de desmejora en el entorno</strong>");
});


// Mostrar incidentes ciclistas
$.getJSON("./visor/puntos/incidentes-viales.geojson", function (Incidentedata) {
  var IncidenteIcon = L.icon({
    iconUrl: './icons/ic_8.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });
  var IncidenteLayer = L.geoJson(Incidentedata, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: IncidenteIcon });
      marker.bindTooltip("<strong>Incidente vial ciclista</strong>"
        +".<br><strong>Nivel de experiencia: </strong>"+ info_exper(feature.properties.experienci));
      return marker;
    }
  })
  controlPuntos.addOverlay(IncidenteLayer, "<img src='./icons/ic_8.png' width='18'> <strong>Incidentes ciclistas 2020</strong>");
});


// Mostrar robos
$.getJSON("./visor/puntos/robos.geojson", function (Benchdata) {
  var BenchIcon = L.icon({
    iconUrl: './icons/ic_9.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });
  var benchLayer = L.geoJson(Benchdata, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, { icon: BenchIcon });
      marker.bindTooltip("<strong> Modalidad: </strong>" + feature.properties.tipo);
      return marker;
    }
  })
  controlPuntos.addOverlay(benchLayer, "<img src='./icons/ic_9.png' width='18'> <strong>Robos de bici 2020</strong>");
});


//Funcion para no mostrar tooltips sin datos vacios
function info_descrip(descripcion){
  if (descripcion == null){
    return "Sin datos";
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