//-------------------------------------------------------------Establecer los textos de LF Draw en español----------------------------------------------------------

L.drawLocal.draw.toolbar.buttons.marker = 'Agregar un punto';
L.drawLocal.draw.toolbar.buttons.polyline = 'Agregar nueva ruta';
L.drawLocal.draw.handlers.marker.tooltip.start = 'Haga clic para agregar un punto';
L.drawLocal.draw.handlers.polyline.tooltip.start = 'Haga clic para empezar a dibujar la ruta';
L.drawLocal.draw.handlers.polyline.tooltip.cont = 'Haga clic en otro punto para continuar la ruta';
L.drawLocal.draw.handlers.polyline.tooltip.end = 'Haga clic en el último punto para terminar la ruta';

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

//---------------------------------------Función que se ejecutará al inicio de cada pregunta de tipo mapa, es obligatorio-------------------------------------------

function welcome(preg){
	if(preg == "#divPreg22" ){
		mymap_22.invalidateSize();
		mymap_22.setView(mapLatLng, 15);
		modal = String("Utilizando las herramientas en la parte superior izquierda,"
			+" por favor indíquenos qué zonas a lo largo de su recorrido considera:<br><br>"
			+"<ul class='list_text-dark'>"
			+"<li class= 'text-dark'><span class='fw-bold text-dark'> Seguras </span> (seguridad personal)</li>"
			+"<li class= 'text-dark'><span class='fw-bold text-dark'> Peligrosas </span>(percepción temerosa del lugar)</li>"
			+"<li class= 'text-dark'><span class='fw-bold text-dark'> Agradables</span></li>"
			+"<li class= 'text-dark'><span class='fw-bold text-dark'> Con problemas de infraestructura</span></li>"
			+"<li class= 'text-dark'><span class='fw-bold text-dark'> Con alto riesgo de incidentalidad</span></li>"
			+"</ul>"
		);
		infoModal('modalInfo', "Información sobre el entorno de las rutas", modal);
	}
}

//---------------------------------------------------------------------Oyentes Preg intro---------------------------------------------------------------------------

$(document).on("change", "#intro input:checkbox", function(e){
	var valor = $("#intro input:checkbox:checked").val();
	var next = "";
	if (valor == 'acepto'){
		next = "divPreg3";
	}
	$("#intro .btnTo").attr("toDiv", next);
});

//-------------------------------------------------------------------Oyentes Preguntas prev-------------------------------------------------------------------------

$(document).on("change", "input[name=preg3]", function(e){ /* Pregunta 3 */
	var valor = $("input[name=preg3]:checked").val();
	if(valor!= undefined){
		next = "divPreg4";
	}
	else{
		next = "";
	}
	$("#divPreg3 .btnTo").attr("toDiv", next);
});

$(document).on("change", "select[name=preg4]", function(e){ /* Pregunta 4 */
	var valor = $("select[name=preg4]").val();
	if(valor == "1" || valor == "3" || valor == "4" || valor == "5" || valor == "6" || valor == "8" || valor == "10"){
		next = "divPreg5";
	}
	else if(valor == "9"){
		next = "divPreg5_2"
	}
	else if(valor == "2"){
		next = "divPreg5_3"
	}
	else if(valor == "7"){
		next = "divPreg5_4"
	}
	else{
		next = "";
	}
	$("#divPreg4 .btnTo").attr("toDiv", next);
});

$(document).on("change", "input[name=preg5]", function(e){ /* Pregunta 5 */
	var valor = $("input[name=preg5]").val();
	var next = "";	
	if(valor != ""){
		next = "divPreg12";
	}
	$("#divPreg5 .btnTo").attr("toDiv", next);
});

$(document).on("change", "select[name=preg5_c2]", function(e){ /* Pregunta 5_2 */
	var valor = $("select[name=preg5_c2]").val();
	var next = "";	
	if(valor != "0"){
		next = "divPreg12";
	}
	$("#divPreg5_2 .btnTo").attr("toDiv", next);
});

$(document).on("change", "select[name=preg5_c3]", function(e){ /* Pregunta 5_3 */
	var valor = $("select[name=preg5_c3]").val();
	var next = "";	
	if(valor != "0"){
		next = "divPreg12";
	}
	$("#divPreg5_3 .btnTo").attr("toDiv", next);
});

$(document).on("change", "select[name=preg5_c4]", function(e){ /* Pregunta 5_4 */
	var valor = $("select[name=preg5_c4]").val();
	var next = "";	
	if(valor != "0"){
		next = "divPreg12";
	}
	$("#divPreg5_4 .btnTo").attr("toDiv", next);
});

$(document).on("change", "input[name=preg12]", function(e){ /* Pregunta 12 */
	var valor = $("input[name=preg12]:checked").val();
	if(valor!= undefined){
		next = "divPreg22";
	}
	else{
		next = "";
	}
	$("#divPreg12 .btnTo").attr("toDiv", next);
});

//-------------------------------------------------------------------Mapa preguntas 22 a 26 ------------------------------------------------------------------------

mymap_22 = L.map('mapid_22').setView([6.2518400, -75.5635900], 13);
L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png').addTo(mymap_22);
drawnItems_22 = L.featureGroup().addTo(mymap_22);

// Se genera el icono base personalizado para el mapa de lugares
var Icon_22 = L.icon({
    iconUrl: './icons/ic_0.png',
    iconSize: [50, 50],
    iconAnchor: [25, 50],
});

drawControl_22 = new L.Control.Draw({
	edit: {
             featureGroup: drawnItems_22,
             edit: false
         },
	draw: {
		polygon : false,
		polyline: false,
		rectangle: false,
		circle: false,
		marker: {repeatMode: true, icon: Icon_22},
		circlemarker: false
	}
});

mymap_22.addControl(drawControl_22);
mymap_22.on('draw:created', info_zona); 

function info_zona(e) {
	layer = e.layer;
	$("input[name=tipo]:checked").val("");
	$("textarea[name=descrip]").val("");
	// Toma las coordenadas del marcador reciente
	a = layer.getLatLng();
	lat = a.lat;
	lng = a.lng;     
	// Se crea un formulario al interior del PopUp con la caracterizacion del lugar marcado

	/* "<label for= 'lunes' class= 'text-dark'><input type='checkbox' class='ms-4 form-check-input' id='lunes' name='lunes' value='Lunes'> Lunes</label><br>" */
	popup_content = String("<form name='emergente' method='POST'>"
		+"<input type='hidden' name='lat' value="
		+lat
		+"><input type='hidden' name='lng' value="
		+lng
		+"><br><br>"
		+"<div class='emergente'>"
		+"<label class= 'form-label_emer text-dark'>&#8718;&nbsp;Considera la zona marcada: </label>"
		+"<label class='text-dark'><input type='radio' class='ms-4 form-check-input' name='tipo' id='tipo' value='seguro'> Segura</label><br>"
		+"<label class='text-dark'><input type='radio' class='ms-4 form-check-input' name='tipo' id='tipo' value='peligroso'> Peligrosa</label><br>"
		+"<label class='text-dark'><input type='radio' class='ms-4 form-check-input' name='tipo' id='tipo' value='agradable'> Agradable</label><br>"
		+"<label class='text-dark'><input type='radio' class='ms-4 form-check-input' name='tipo' id='tipo' value='problema_inf'> Con problemas de Infraestructura</label><br>"
		+"<label class='text-dark'><input type='radio' class='ms-4 form-check-input' name='tipo' id='tipo' value='accident'> Con riesgo de incidentalidad</label><br><br>"
		+"<label class='form-label_emer text-dark'>&#8718;&nbsp;Razones por las cuales considera lo anterior:</label><br>"
		+"<textarea class = 'form-control bg-white text-dark' name='descrip' placeholder='(opcional)' cols='30' rows='5' ></textarea><br><br></div>"
		+"<button type='button' data-remodal-action='confirm' class='remodal-cancel btn btn-primary_emer' onClick='enviar2();'>&nbsp;&nbsp;Guardar respuestas&nbsp;&nbsp;</button></form>"
	);
	infoModal('modalInfo', "<p class='modal_encabezado'>Información sobre la zona</p>", popup_content);
}

// Esta funcion procesa la informacion del formulario del PopUp para los lugares marcados
function enviar2(){
	if($("input[name=tipo]:checked").val() != undefined){
		var new_marker = layer.toGeoJSON();
		new_marker.properties = {
			Clase: "Lugar",
			Tipo: $("input[name=tipo]:checked").val(),
			Descripcion : $("textarea[name=descrip]").val()
		};
		L.geoJSON(new_marker, {markersInheritOptions: true, icon: L.icon({// Se crea el icono personalizado para el punto recien marcado
			iconUrl: getStatoIcon($("input[name=tipo]:checked").val()),
			iconSize: [50, 50],
			iconAnchor: [25, 50],
			})
		}).addTo(drawnItems_22);

		$("input[name=preg22]").val(JSON.stringify(drawnItems_22.toGeoJSON()));// Se actualiza la entrada a guardar en la base de datos
	}
	else{
		infoModal('modalInfo', "Ingrese su percepción de la zona indicada", " ");
		setTimeout(function(){ 
			infoModal('modalInfo', "<p style='background: #666666; color: #f2f4f4; padding: 10px; margin: -35px; margin-top: -60px;'>Información sobre la zona</p>", popup_content); 
		}, 1500);
	}
}

// La funcion define el icono a mostrar en la encuesta segun la respuesta marcada
function getStatoIcon(dat) {
	return  dat == 'seguro'   ? './icons/ic_1.png' :
			dat == 'peligroso'   ? './icons/ic_2.png' :
			dat == 'agradable'   ? './icons/ic_7.png' :
			dat == 'problema_inf'   ? './icons/ic_6.png' :
			dat == 'accident'   ? './icons/ic_5.png' :
			'./icons/ic_0.png';       
}

// Esta funcion es para la definicion del nuevo centro de los mapas
function obt_coord(municipio) {
	codigo = "";
	if(municipio == "9"){
		codigo = municipio +"_"+$("select[name=preg5_c2]").val();
	}
	else if(municipio == "2"){
		codigo = municipio +"_"+$("select[name=preg5_c3]").val();
	}
	else if(municipio == "7"){
		codigo = municipio +"_"+$("select[name=preg5_c4]").val();
	}
	else{
		codigo = municipio +"_0";
	}
	return  codigo == "9_1"   ? [6.293141,  -75.541766] :
			codigo == "9_2"   ? [6.297369,  -75.553476] :
			codigo == "9_3"   ? [6.274017,  -75.545918] :
			codigo == "9_4"   ? [6.274728,  -75.561016] :
			codigo == "9_5"   ? [6.290202,  -75.569505] :
			codigo == "9_6"   ? [6.302180,  -75.576486] :
			codigo == "9_7"   ? [6.275548,  -75.589603] :
			codigo == "9_8"   ? [6.249325,  -75.548929] :
			codigo == "9_9"   ? [6.235633,  -75.555169] :
			codigo == "9_10"   ? [6.252146,  -75.568265] :
			codigo == "9_11"   ? [6.249249,  -75.588812] :
			codigo == "9_12"   ? [6.255758,  -75.601795] :
			codigo == "9_13"   ? [6.257120,  -75.614184] :
			codigo == "9_14"   ? [6.210336,  -75.570992] :
			codigo == "9_15"   ? [6.218576,  -75.586266] :
			codigo == "9_16"   ? [6.232493,  -75.596808] :
			codigo == "9_95"   ? [6.209820,  -75.498194] :
			codigo == "9_96"   ? [6.184866,  -75.656369] :
			codigo == "9_97"   ? [6.223466,  -75.625991] :
			codigo == "9_98"   ? [6.344336,  -75.691823] :
			codigo == "9_99"   ? [6.277509,  -75.635701] :
			codigo == "2_1"   ? [6.312929,  -75.582462] :
			codigo == "2_2"   ? [6.317007,  -75.561976] :
			codigo == "2_3"   ? [6.325740,  -75.562424] :
			codigo == "2_4"   ? [6.334765,  -75.558232] :
			codigo == "2_5"   ? [6.340791,  -75.567380] :
			codigo == "2_6"   ? [6.348884,  -75.565818] :
			codigo == "2_7"   ? [6.345608,  -75.552134] :
			codigo == "2_8"   ? [6.340381,  -75.543178] :
			codigo == "2_9"   ? [6.346364,  -75.527236] :
			codigo == "2_10"   ? [6.333348,  -75.538765] :
			codigo == "2_11"   ? [6.318585,  -75.551066] :
			codigo == "2_99"   ? [6.339142,  -75.607507] :
			codigo == "7_1"   ? [6.172146,  -75.609301] :
			codigo == "7_2"   ? [6.163391,  -75.622335] :
			codigo == "7_3"   ? [6.168480,  -75.633410] :
			codigo == "7_4"   ? [6.187208,  -75.592080] :
			codigo == "7_5"   ? [6.180607,  -75.606081] :
			codigo == "7_6"   ? [6.176479,  -75.612931] :
			codigo == "7_99"   ? [6.188627,  -75.616965] :
			codigo == "1_0"   ? [6.437029,  -75.331449] :
			codigo == "6_0"   ? [6.377597,  -75.446195] :
			codigo == "4_0"   ? [6.346075,  -75.508108] :
			codigo == "5_0"   ? [6.170192,  -75.587421] :
			codigo == "10_0"   ? [6.151591,  -75.615388] :
			codigo == "8_0"   ? [6.157698,  -75.643391] :
			codigo == "3_0"   ? [6.091861,  -75.635655] :
			[6.2518400, -75.5635900];       
}

//-------------------------------------------------------------------------Oyente Pregunta 32-----------------------------------------------------------------------

$(document).on("change", "input[name=preg32]", function(e){
	var valor = $("input[name=preg32]").val();
	regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ //regex para email, es para verificar que se encuentre correcto el e-mail contra una expresion regular
	var check = valor.match(regex);//si es null, correo no válido
	var next = "divPreg100";
	if(check != null && valor != ""){
		next = "divPreg100";
	}
	$("#divPreg32 .btnTo").attr("toDiv", next);
});

//////////////////////////////////////////// DE AQUÍ EN ADELANTE ESTÁN LAS FUNCIONES NECESARIAS EN CUALQUIER FORMULARIO ////////////////////////////////////////////

var historial=[];
$('.pregunta').hide();
$('.pregunta_mapa').hide();
$('#intro').show();

$('.btnTo').click(btn_To);//Oyente de boton siguiente
$('.btnTo_b').click(btn_To);//Oyente de boton siguiente en barra de mapas
$('.btnFrom').click(btn_From);//Oyente de boton anterior
$('.btnFrom_b').click(btn_From);//Oyente de boton anterior en barra de mapas

// Funcion que controla el boton al div siguiente
function btn_To(e){
	$('input[name]').change();
	$('select[name]').change();
	$('textarea[name]').change();
	var valid = $(this).attr("toDiv");
	if(valid != ""){
		$('.pregunta').hide();
		$('.pregunta_mapa').hide();
		destino = "#" + $(this).attr('toDiv');
		$(destino).show();
		divanterior = $(this).closest(".pregunta").attr("id")!=undefined?$(this).closest(".pregunta").attr("id"):$(this).closest(".pregunta_mapa").attr("id");
		historial.push(divanterior);
		if(destino == "#divPreg22"){
			mapLatLng = obt_coord($("select[name=preg4]").val());
		}
		welcome(destino);
	}
	else{
		var msg=$(this).attr("msg")
		msg=msg==''?null:msg;
		/* msg=msg??="Por favor responda la pregunta"; */
		infoModal('modalInfo', "Respuesta inválida", msg);
	}
	return false;
}

// Funcion que controla el boton al div anterior
function btn_From(e){
	if(e.screenX!=0 && e.screenY !=0 && e.clientX!=0 && e.clientY!=0){
		$('.pregunta').hide();
		$('.pregunta_mapa').hide();
		destino = historial.pop();
		if(destino == 'divPreg13'){
			mymap.remove();
			mymap = L.map('mapid').setView(mapLatLng, 16);
			L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png').addTo(mymap);
			drawnItems.addTo(mymap);
			mymap.addControl(drawControl);
			mymap.on('draw:created', info_ruta);
		}
		$("#"+destino).show();
		welcome("#"+destino);
	}
	return false;
}

//Función para abrir la ventana modal con algún mensaje y ventana emergente
function infoModal(remodal_id, titulo, mensaje){
	$("#"+remodal_id+"Title").html(titulo);
	$("#"+remodal_id+"Desc").html(mensaje);
	var inst = $('[data-remodal-id='+remodal_id+']').remodal();
	inst.open();
}

//Función para abrir la ventana modal de ayuda en las preguntas de tipo mapa
function ayuda(){
	ayuda_txt = String(
		"<div class= 'emergente text-dark'><br><br>"
		+"<label class= 'form-label_emer text-dark'>Si se encuentra en un dispositivo con pantalla táctil, siga las siguientes instrucciones:</label>"
		+"<p class='emergente'>"
		+"<ul class='list_text-dark'>"
		+"<li class= 'text-dark'><span class='fw-bold text-dark'>Desplazar el mapa:</span>"
		+" Toque con un dedo, mantenga presionado y arrastre para mover el mapa.</li><br>"
		+"<li class= 'text-dark'><span class='fw-bold text-dark'>Dibujar elemento:</span>"
		+" Tome la herramienta de dibujo en la esquina superior izquierda, toque la pantalla en el lugar deseado para marcar un punto"
		+" y luego retire el dedo. Para trazar una ruta, marque una secuencia de puntos siguiendo el recorrido de las calles. </li><br>"
		+"<li class= 'text-dark'><span class='fw-bold text-dark'>Hacer zoom:</span>"
		+" Coloque dos dedos en la pantalla, sepárelos para acercar el mapa o únalos para alejar el mapa.</li></ul></p>"
		+"<label class= 'form-label_emer text-dark'>Si se encuentra en una computadora, sigua las siguientes instrucciones:</label>"
		+"<p class='emergente'>"
		+"<ul class='list_text-dark'>"
		+"<li class= 'text-dark'><span class='fw-bold text-dark'>Desplazar el mapa:</span>"
		+" Clic con el botón izquierdo del mouse, mantenga presionado y arrastre para mover el mapa.</li><br>"
		+"<li class= 'text-dark'><span class='fw-bold text-dark'>Dibujar elemento:</span>"
		+" Seleccione la herramienta de dibujo en la esquina superior izquierda y de clic en el lugar deseado para marcar un punto."
		+" Para trazar una ruta, marque una secuencia de puntos siguiendo el recorrido de las calles.</li><br>"
		+"<li class= 'text-dark'><span class='fw-bold text-dark'>Hacer zoom:</span>"
		+" Pulsar la rueda de desplazamiento (scroll) para acercar o alejar el mapa.</li></ul></p>"
		+"</div><br>"
	);
	infoModal('modalInfo', "<p class='modal_encabezado'>Ayuda</p>", ayuda_txt);
}
