///////////////////////////////////////////////////////////////////////////////////////////////////
// Mapa ciclista interactivo v. 0.3
// Proyecto SIGenBici
// CC-BY-SA
// 21 de julio de 2021
///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
// Panel de control Mapas tematicos
// Control de las capas
///////////////////////////////////////////////////////////////////////////////////////////////////

var controlTematico = L.control.layers(null, null, { collapsed: false }, { autoZIndex: true }).addTo(map);

var htmlObject5 = controlTematico.getContainer();
var cont_tematico = document.getElementById('control-tematico')
function setParent(el, newParent) {
  newParent.appendChild(el);
}
setParent(htmlObject5, cont_tematico);

var tematico_geojson;
$(document).on("change", "select[name=mostrar_mapa]", function(e){
  // load GeoJSON from an external file
  if (map.hasLayer(tematico_geojson)){
    controlTematico.removeLayer(tematico_geojson);
    map.removeLayer(tematico_geojson);

    if($("select[name=mostrar_mapa]").val() == "1" || $("select[name=mostrar_mapa]").val() == "2"){
      $.getJSON(mostrar_mapa($("select[name=mostrar_mapa]").val()),function(tematico_data){
        // add GeoJSON layer to the map once the file is loaded
        tematico_geojson = L.geoJson(tematico_data, {onEachFeature: recorreRazgos, style: style}).addTo(map);
        var leyenda_tematico = mostrar_leyenda($("select[name=mostrar_mapa]").val());

        controlTematico.addOverlay(tematico_geojson, leyenda_tematico);
      });
    }
    else{
      mc_link = mostrar_mapa($("select[name=mostrar_mapa]").val());
      mc_bounds = [[6.441, -75.668],[6.090, -75.317]];
      tematico_geojson = L.imageOverlay(mc_link, mc_bounds).addTo(map);
//      controlTematico.addOverlay(tematico_geojson, "mapa calor");
    }
  }
  else{
    if($("select[name=mostrar_mapa]").val() == "1" || $("select[name=mostrar_mapa]").val() == "2"){
      $.getJSON(mostrar_mapa($("select[name=mostrar_mapa]").val()),function(tematico_data){
        // add GeoJSON layer to the map once the file is loaded
        tematico_geojson = L.geoJson(tematico_data, {onEachFeature: recorreRazgos, style: style}).addTo(map);
        var leyenda_tematico = mostrar_leyenda($("select[name=mostrar_mapa]").val());

        controlTematico.addOverlay(tematico_geojson, leyenda_tematico);
      });
    }
    else{
      mc_link = mostrar_mapa($("select[name=mostrar_mapa]").val());
      mc_bounds = [[6.441, -75.668],[6.090, -75.317]];
      tematico_geojson = L.imageOverlay(mc_link, mc_bounds).addTo(map);
//      controlTematico.addOverlay(tematico_geojson, "mapa calor");
    }
  }
});

//Se escoge el archivo que se cargará al mapa
function mostrar_mapa(opcion){
	if(opcion =="1" || opcion == "2"){
		mapa = './visor/geojson/rutas_sigenbici.geojson';
	}
  else if(opcion =="3"){
    mapa = './visor/mc/mc_rutas2.png';
  }
	else {
		mapa = null;
	}
	return mapa;
}

//Definicion de la funcion del estilo
function style(feature) { 
	return { 
		weight: 2, 
		opacity: 1, 
		color: lineColor($("select[name=mostrar_mapa]").val(), feature.properties), 
		dashArray: '3', 
		fillOpacity: 0.7
	}; 
}

//Seleccion de los colores en los que se mostrará la capa, depende del mapa que se seleccione en la lista
function lineColor(opcion, m){
  var l_color;
  if(opcion =="1"){
    l_color = m.Motivo == "almorzar" ? '#FF0000':
        m.Motivo == "compras" ? '#FFFF00':
        m.Motivo == "dejar_otro" ? '#808000':
        m.Motivo == "diligencia" ? '#00FF00':
        m.Motivo == "ir_estudiar" ? '#008000':
        m.Motivo == "ir_trabajo" ? '#000080':
        m.Motivo == "recreacion" ? '#FF00FF':
        m.Motivo == "regreso" ? '#800080':
        m.Motivo == "trabaja_en_bici" ? '#00FFFF':
        '#C0C0C0';
  }
  else if(opcion =="2"){
    l_color = m.experienci == "1" ? '#1E8449':
        m.experienci == "2" ? '#2ECC71':
        m.experienci == "3" ? '#F4D03F':
        m.experienci == "4" ? '#E67E22':
        m.experienci == "5" ? '#A93226':
        '#C0C0C0';
  }
  else{
    l_color = 'white';
  }
  return l_color;
}

function mostrar_leyenda(opcion){
    if(opcion =="1"){
		leyenda = '<strong>Clasificación de las rutas según el motivo de viaje:</strong>'
            +'<br>&nbsp&nbsp&nbsp&nbsp<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dashed #FF0000 3px; vertical-align: middle;"></span><strong>&nbspIr a almorzar</strong>'
            +'<br>&nbsp&nbsp&nbsp&nbsp<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dashed #FFFF00 3px; vertical-align: middle;"></span><strong>&nbspIr de compras</strong>'
            +'<br>&nbsp&nbsp&nbsp&nbsp<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dashed #808000 3px; vertical-align: middle;"></span><strong>&nbspIr a dejar a alguien</strong>'
            +'<br>&nbsp&nbsp&nbsp&nbsp<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dashed #00FF00 3px; vertical-align: middle;"></span><strong>&nbspRealizar diligencia</strong>'
            +'<br>&nbsp&nbsp&nbsp&nbsp<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dashed #008000 3px; vertical-align: middle;"></span><strong>&nbspIr a estudiar</strong>'
            +'<br>&nbsp&nbsp&nbsp&nbsp<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dashed #000080 3px; vertical-align: middle;"></span><strong>&nbspIr a trabajar</strong>'
            +'<br>&nbsp&nbsp&nbsp&nbsp<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dashed #FF00FF 3px; vertical-align: middle;"></span><strong>&nbspRecreación</strong>'
            +'<br>&nbsp&nbsp&nbsp&nbsp<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dashed #800080 3px; vertical-align: middle;"></span><strong>&nbspRegreso a casa</strong>'
            +'<br>&nbsp&nbsp&nbsp&nbsp<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dashed #00FFFF 3px; vertical-align: middle;"></span><strong>&nbspTrabaja en bicicleta</strong>'
            +'<br>&nbsp&nbsp&nbsp&nbsp<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dashed #C0C0C0 3px; vertical-align: middle;"></span><strong>&nbspOtro</strong>';
	}
	else if (opcion == "2"){
		leyenda = '<strong>Clasificación de las rutas según el nivel de experiencia:</strong>'
            +'<br>&nbsp&nbsp&nbsp&nbsp<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dashed #1E8449 3px; vertical-align: middle;"></span><strong>&nbspBajo (1)</strong>'
            +'<br>&nbsp&nbsp&nbsp&nbsp<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dashed #2ECC71 3px; vertical-align: middle;"></span><strong>&nbspMedio-Bajo (2)</strong>'
            +'<br>&nbsp&nbsp&nbsp&nbsp<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dashed #F4D03F 3px; vertical-align: middle;"></span><strong>&nbspMedio (3)</strong>'
            +'<br>&nbsp&nbsp&nbsp&nbsp<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dashed #E67E22 3px; vertical-align: middle;"></span><strong>&nbspMedio-Alto (4)</strong>'
            +'<br>&nbsp&nbsp&nbsp&nbsp<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dashed #A93226 3px; vertical-align: middle;"></span><strong>&nbspAlto (5)</strong>'
            +'<br>&nbsp&nbsp&nbsp&nbsp<span style="display: inline-block; height: 0.5em; width: 2em; border-top: dashed #C0C0C0 3px; vertical-align: middle;"></span><strong>&nbspSin Datos</strong>';
	}
	else {
		leyenda = null;
	}

	return leyenda;
}

function recorreRazgos(feature, layer) {
	// does this feature have a property named popupContent?
	if (feature.properties) {
		var texto = "";
    if($("select[name=mostrar_mapa]").val() == "1"){
      texto = "<strong>Motivo de viaje: </strong>" + info_motivo(feature.properties.Motivo)
        + ".<br><strong>Género: </strong>"+ info_genero(feature.properties.genero)
        /* + ".<br><strong>Edad: </strong>"+ feature.properties.Encuesta_Edad */
        + ".<br><strong>Nivel de experiencia: </strong>" + info_exper(feature.properties.experienci)
        +".";
    }
    else if($("select[name=mostrar_mapa]").val() == "2"){
        texto = "<strong>Género: </strong>"+ info_genero(feature.properties.genero)
         /*  + ".<br><strong>Edad: </strong>"+ feature.properties.Encuesta_Edad */
          + ".<br><strong>Nivel de experiencia: </strong>" + info_exper(feature.properties.experienci)
          +".";
      }
    else{
      $.each(feature.properties, function(key, value){
        texto = texto+key+": <b>"+value+"</b><br />";
      });
    }
    layer.bindPopup(texto);
	}
  oyente_popup(layer);
}	

//Funcion para decodificar motivo
function info_motivo(motiv){
  if (motiv == "almorzar"){
    return "Ir a almorzar";
  }
  else if(motiv == "compras"){
    return "Ir de compras";
  }
  else if(motiv == "dejar_otro"){
    return "Ir a dejar a alguien";
  }
  else if(motiv == "diligencia"){
    return "Realizar diligencia";
  }
  else if(motiv == "ir_estudiar"){
    return "Ir a estudiar";
  }
  else if(motiv == "ir_trabajo"){
    return "Ir a trabajar";
  }
  else if(motiv == "recreacion"){
    return "Recreación";
  }
  else if(motiv == "regreso"){
    return "Regreso a casa";
  }
  else if(motiv == "trabaja_en_bici"){
    return "Trabaja en bicicleta";
  }
  else{
    return "Otro";
  }
}


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.3
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    tematico_geojson.resetStyle(e.target);
}

