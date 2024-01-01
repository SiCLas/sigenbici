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
	if(preg == "#divPreg13" ){
		mymap.invalidateSize();
		mymap.setView(mapLatLng, 16);
		modal = String("<br><img class='img_gif' src='./icons/eje_ruta.gif'>"
			+"<br>Por favor trace en el mapa las rutas de sus viajes más frecuentes"
			+" utilizando las herramientas que aparecen en la parte superior izquierda."
			+" Para esta encuesta consideramos un viaje el desplazamiento de un punto 'A'"
			+" a un punto 'B' como destino final. Para trazar la ruta de un viaje marque punto a punto su trayecto siguiendo las calles"
			+" que transita habitualmente. Puede agregar el número de viajes que desee."
		);
		infoModal('modalInfo', "Trazado de viajes frecuentes", modal);
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
		next = "divPreg13";
	}
	else{
		next = "";
	}
	$("#divPreg12 .btnTo").attr("toDiv", next);
});

//-------------------------------------------------------------------------Mapa pregunta 13-------------------------------------------------------------------------

// Se inicializa el mapa para el trazado de las rutas
mymap = L.map('mapid').setView([6.2518400, -75.5635900], 13);
L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png').addTo(mymap);
drawnItems = L.featureGroup().addTo(mymap);

// Definicion del control de la capa de dibujo
drawControl = new L.Control.Draw({
	edit: {// Controla la capa si se va a editar o no
             featureGroup: drawnItems,// Es el nombre de la capa que se crea arriba
             edit: false// Solo permite borrar no editar
         },
	draw: {// Permite seleccionar el tipo de elemento que se va a dibujar, las que estan en false no las muestra
		polygon : false,
		polyline: {repeatMode: true, shapeOptions: {weight: 5, color: 'red'}},
		rectangle: false,
		circle: false,
		marker: false,
		circlemarker: false
	}
});

mymap.addControl(drawControl);// Permite añadir control de dibujo al mapa en la esquina superior izquierda
mymap.on('draw:created', info_ruta);// Se genera el oyente para el mapa de las rutas, activado una vez se dibuje algo en el mapa

// Esta funcion se ejecuta cada que se genera un nuevo diagrama
function info_ruta(e) {
	layer = e.layer;
	// Se crea un formulario con la caracterizacion de la ruta marcada al interior del la ventana modal
	popup_content = String("<form name='emergente-ruta' method='POST'>"
		+"<div class='emergente'><br><br>"
		+"<label for='motivo' class= 'form-label_emer text-dark'>&#8718;&nbsp;¿Cuál es el motivo de este viaje?</label></div>"
		+"<select class= 'form-select text-dark' name='motivo' ><option value='--'>Seleccione</option>"
		+"<option class= 'text-dark' value='ir_trabajo'>Ir al trabajo</option>"
		+"<option class= 'text-dark' value='ir_estudiar'>Ir a estudiar</option>"
		+"<option class= 'text-dark' value='almorzar'>Ir a almorzar</option>"
		+"<option class= 'text-dark' value='trabaja_en_bici'>Trabajo en la bici</option>"
		+"<option class= 'text-dark' value='diligencia'>Hacer trámite o diligencia</option>"
		+"<option class= 'text-dark' value='compras'>Ir de compras</option>"
		+"<option class= 'text-dark' value='recreacion'>Recreación</option>"
		+"<option class= 'text-dark' value='dejar_hijos'>Recoger y/o dejar a los hijos</option>"
		+"<option class= 'text-dark' value='dejar_otro'>Recoger y/o dejar a alguien</option>"
		+"<option class= 'text-dark' value='regreso'>Regreso a casa</option>"
		+"<option class= 'text-dark' value='otro'>Otro</option></select>"
		+"<div class='emergente'>"
		+"<label for='otro_cual' class= 'text-dark'><br>En caso de otro, por favor indicar cual: </label></div>"		
		+"<textarea class = 'form-control bg-white text-dark' name='otro_cual' placeholder='(opcional)' cols='30' rows='1'></textarea>"			
		+"<div class='emergente'><br>"
		+"<label for='tipo_ruta' class= 'form-label_emer text-dark'>&#8718;&nbsp;Esta ruta representa un viaje de: </label></div>"
		+"<select class= 'form-select text-dark' name='tipo_ruta' ><option value='--'>Seleccione</option>"
		+"<option class= 'text-dark' value='idayregreso'>Ida y regreso</option>"
		+"<option class= 'text-dark' value='ida'>Solo ida</option>"
		+"<option class= 'text-dark' value='regreso'>Solo regreso</option></select>"	
		+"<div class='emergente'><br>"
		+"<label for='dias' class= 'form-label_emer text-dark'>&#8718;&nbsp;¿Qué días de la semana realiza esta ruta?</label><br>"
		+"<label for= 'lunes' class= 'text-dark'><input type='checkbox' class='ms-4 form-check-input' id='lunes' name='lunes' value='Lunes'> Lunes</label><br>"
		+"<label for= 'martes' class= 'text-dark'><input type='checkbox' class='ms-4 form-check-input' id='martes' name='martes' value='Martes'> Martes</label><br>"
		+"<label for= 'miercoles' class= 'text-dark'><input type='checkbox' class='ms-4 form-check-input' id='miercoles' name='miercoles' value='Miércoles'> Miércoles</label><br>"
		+"<label for= 'jueves' class= 'text-dark'><input type='checkbox' class='ms-4 form-check-input' id='jueves' name='jueves' value='Jueves'> Jueves</label><br>"
		+"<label for= 'viernes' class= 'text-dark'><input type='checkbox' class='ms-4 form-check-input' id='viernes' name='viernes' value='Viernes'> Viernes</label><br>"
		+"<label for= 'sabado' class= 'text-dark'><input type='checkbox' class='ms-4 form-check-input' id='sabado' name='sabado' value='Sábado'> Sábado</label><br>"
		+"<label for= 'domingo' class= 'text-dark'><input type='checkbox' class='ms-4 form-check-input' id='domingo' name='domingo' value='Domingo'> Domingo</label><br></div>"
		+"<div class='emergente'>"
		+"<label for='time' class= 'form-label_emer text-dark'><br>&#8718;&nbsp;¿Cuál es el horario más frecuente en el que realizas esta ruta?<br></label>"
		+"<label class= 'form-text text-dark'>Horario de Ida: </label>"
		+"<input type='time' class = 'form-control bg-white text-dark' name='time' value='hora'>"
		+"<label class= 'form-text text-dark'>Horario de Regreso: </label>"
		+"<input type='time' class = 'form-control bg-white text-dark' name='time_r' value='hora'><br></div>"		
		+"<div class='emergente'>"
		+"<label for='duracion' class= 'form-label_emer text-dark'>&#8718;&nbsp;¿Cuánto tiempo tarda su recorrido?<br></label></div>"
		+"<div class='emergente'>"
		+"<input type='number' class = 'form-control bg-white text-dark' name='duracion' value='duración' placeholder='Ingrese el tiempo en minutos'><br></div>"		
		+"<div class='emergente'>"
		+"<label for='cicloinfra' class= 'form-label_emer text-dark'>&#8718;&nbsp;¿En esta ruta existe cicloinfraestructura en al menos un tramo?</label></div>"
		+"<select class= 'form-select text-dark' name='cicloinfra'><option value='--'>Seleccione</option>"
		+"<option class= 'text-dark' value='si'>Sí</option>"
		+"<option class= 'text-dark' value='no'>No</option>"
		+"<option class= 'text-dark' value='nosabe'>No sabe informar</option></select><br>"
		+"<div class='emergente'>"
		+"<label for='uso' class= 'form-label_emer text-dark'>&#8718;&nbsp;¿Suele emplear cicloinfraestructura en esta ruta?</label></div>"
		+"<select class= 'form-select text-dark' name='uso'><option value='--'>Seleccione</option>"
		+"<option class= 'text-dark' value='si'>Sí</option>"
		+"<option class= 'text-dark' value='no'>No</option>"
		+"<option class= 'text-dark' value='tramos'>En algunos tramos</option></select><br>"
		+"<div class='emergente'>"
		+"<label for='viaje' class= 'form-label_emer text-dark'>&#8718;&nbsp;¿Por qué elige esta ruta?</label></div>"		
		+"<textarea class = 'form-control bg-white text-dark' name='porque_ruta' placeholder='(opcional)' cols='30' rows='2'></textarea><br><br>"
		+"<button type='button' data-remodal-action='confirm' class='remodal-cancel btn btn-primary_emer' onClick='enviar1();'>&nbsp;&nbsp;Guardar respuestas&nbsp;&nbsp;</button></form>"
	);
	infoModal('modalInfo', "<p class='modal_encabezado'>Información sobre el recorrido</p>", popup_content);
}

// Esta funcion procesa la informacion del formulario del PopUp para las rutas trazadas
function enviar1() {
	if($("select[name=motivo]").val() != "--"){
		$("#divPreg13 .btnTo_b").attr("toDiv", "divPreg32");
		var color_ruta = Math.floor((Math.random() * 9) + 1);// Llamado a la funcion de generacion del codigo del color (aleatorio)
		var new_polyline = layer.toGeoJSON();// Se convierte la ruta recientemente creada en un GeoJson para agregar las propiedades
		//Se manipulan los dias de uso de la ruta
		dias = [
			$("input[name=lunes]:checked").val(), 
			$("input[name=martes]:checked").val(), 
			$("input[name=miercoles]:checked").val(), 
			$("input[name=jueves]:checked").val(),
			$("input[name=viernes]:checked").val(),
			$("input[name=sabado]:checked").val(),
			$("input[name=domingo]:checked").val()
		];
		var filtered = dias.filter(function (el) {
			return el != null;//Filtra los valores que son nulos o vacios y los elimina del array
		});

		// Se carga la informacion de las propiedades de la ruta al GeoJson
		new_polyline.properties = {
			Clase: "Ruta",
			Motivo: $("select[name=motivo]").val(),
			Otro: $("textarea[name=otro_cual]").val(),
			Tipo: $("select[name=tipo_ruta]").val(),
			Dias_de_viaje: filtered.toString(),
			Hora_ida: $("input[name=time]").val(),
			Hora_reg: $("input[name=time_r]").val(),
			Duracion: $("input[name=duracion]").val(),
			Existe_ciclo_inf: $("select[name=cicloinfra]").val(),
			Usa_ciclo_inf: $("select[name=uso]").val(),
			Razon_uso : $("textarea[name=porque_ruta]").val()
		};
		L.geoJSON(new_polyline,{style: {weight: 5, color: getRouteColor(color_ruta), opacity : 0.9}}).addTo(drawnItems);// Se carga el nuevo GeoJson de la ruta con las propiedades
		$("input[name=preg13]").val(JSON.stringify(drawnItems.toGeoJSON()));// Se actualiza la entrada a guardar en la base de datos
	}
	else{
		infoModal('modalInfo', "Ingrese por lo menos el motivo", " ");
		setTimeout(function(){ 
			infoModal('modalInfo', "<p style='background: #666666; color: #f2f4f4; padding: 10px; margin: -35px; margin-top: -60px;'>Información sobre el recorrido</p>", popup_content); 
		}, 1500);
	}
}

// Esta funcion retorna el color aleatorio que se le asignara a la ruta trazada
function getRouteColor(dat_color) {
	return  dat_color == 1   ? '#C0392B' :
			dat_color == 2   ? '#8E44AD' :
			dat_color == 3   ? '#2980B9' :
			dat_color == 4   ? '#1ABC9C' :
			dat_color == 5   ? '#F1C40F' :
			dat_color == 6   ? '#E67E22' :
			dat_color == 7   ? '#34495E' :
			dat_color == 8   ? '#E91E63' :
			dat_color == 9   ? '#4CAF50' :
			'#795548';       
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
		if(destino == "#divPreg13"){
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
