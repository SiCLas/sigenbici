<?php
error_reporting(E_ERROR | E_PARSE);
header('Content-Type: text/html; charset=utf-8');
$connect = new PDO("mysql:host=localhost;dbname=name;charset=utf8mb4", "db_user", "db_password");/* localhost es el servidor, "encuesta" es el nombre de la base de datos, nombre de usuario, contraseña */
$message = 'Nada para enviar';
if(isset($_POST["preg1"]))
{
	$query = "INSERT INTO encuesta";/* "encuesta" es el nombre de la tabla en la base de datos */
	$query .= "(consenti, nombre, edad, genero, municipio, comuna, barrio, educacion, ocupacion, jornada_lab, sector_lab, modos, comb_modos, cual_comb, tipo_bici, bici_otro, t_uso_bici, experiencia, rutas, percepcion, accidente, acc_donde, robo, robo_donde, percep_cambio, optima_bici, dific_bici, correo, contacto) ";/* el .= lo que hace es concatenar y en esa fila van los NOMBRES DE LAS COLUMNAS EN LA BASE DE DATOS */
	$query .= "VALUES(:preg0, :preg1, :preg2, :preg3, :preg4, :preg5_com, :preg5, :preg6, :preg7, :preg8, :preg8a, :preg9, :preg9a, :preg9b, :preg10, :preg10a, :preg11, :preg12, :preg13, :preg22, :preg27, :preg27A, :preg28, :preg28A, :preg29, :preg30, :preg31, :preg32, :preg32a);";/* AQUÍ SON LOS VALORES DE LAS VARIABLES EN LA ENCUESTA, QUE NO ESTÁN DEFINIDAS, LUEGO SE ASOCIAN A LOS VALORES DE LA ENCUESTA CON EL POST*/

	if ($_POST["preg4"] != "0"){
		$municipio = $_POST["preg4"];
		if ($municipio == "9"){
			$comuna = $_POST["preg5_c2"];
			$barrio = $_POST["preg5_2"];
		}
		elseif ($municipio == "2"){
			$comuna = $_POST["preg5_c3"];
			$barrio = $_POST["preg5_3"];
		}
		elseif ($municipio == "7"){
			$comuna = $_POST["preg5_c4"];
			$barrio = $_POST["preg5_4"];
		}
		else{
			$comuna = "-1";
			$barrio = $_POST["preg5"];
		}
	}

	$preg7 = implode(",",$_POST["preg7"]);
	$preg9 = implode(",",$_POST["preg9"]);
	if(isset($_POST["preg10"])){
		$preg10 = implode(",",$_POST["preg10"]);
	} 
	else {
		$preg10 = "0";
	}
	$user_data = array(
		':preg0' => $_POST["trat_datos"],
		':preg1' => $_POST["preg1"],
		':preg2' => $_POST["preg2"],
		':preg3' => $_POST["preg3"],
		':preg4' => $_POST["preg4"],
		':preg5_com' => $comuna,
		':preg5' => $barrio,
		':preg6' => $_POST["preg6"],
		':preg7' => implode(",",$_POST["preg7"]),
		':preg8' => $_POST["preg8"],
		':preg8a' => $_POST["preg8a"],
		':preg9' => implode(",",$_POST["preg9"]),
		':preg9a' => $_POST["preg9a"],
		':preg9b' => $_POST["preg9b"],
		':preg10' => $preg10,
		':preg10a' => $_POST["preg10a"],
		':preg11' => $_POST["preg11"], 
		':preg12' => $_POST["preg12"],
		':preg13' => $_POST["preg13"],
		':preg22' => $_POST["preg22"],
		':preg27' => $_POST["preg27"],
		':preg27A' => $_POST["preg27A"],
		':preg28' => $_POST["preg28"],
		':preg28A' => $_POST["preg28A"],
		':preg29' => $_POST["preg29"],
		':preg30' => $_POST["preg30"],
		':preg31' => $_POST["preg31"],
		':preg32' => $_POST["preg32"],
		':preg32a' => $_POST["preg32a"]
	);
	$statement = $connect->prepare($query);// Prepara la sentencia, connect guarda el ultimo id
	if($statement->execute($user_data))
	{
		$newid = $connect->lastInsertId();// Obtiene el id del último registro insertado en la base de datos
		
		/*----------------------Transformar el valor guardado de las rutas y puntos en objeto nuevamente para cargar atributo ID a cada uno-----------------------*/

	$rev_ruta = $_POST["preg13"];
		if($rev_ruta == ""){
			$rev_ruta = '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"Clase":"Ruta","Motivo":"otro","Otro":"NO_APLICA_RUTA"},"geometry":{"type":"LineString","coordinates":[[-75.523195,6.281877],[-75.52253,6.27678]]}}]}';
		}

		$rutas13 = json_decode($rev_ruta, "yes");// Pregunta 13
		foreach($rutas13["features"] as &$f){
			$f["properties"]["id_db"]="$newid";
			$f["properties"]["edad"]=$_POST["preg2"];
			$f["properties"]["genero"]=$_POST["preg3"];
			$f["properties"]["t_uso_bici"]=$_POST["preg11"];
			$f["properties"]["experiencia"]=$_POST["preg12"];
		}
		$rutas13 = json_encode($rutas13);
		
		// Pregunta 22
		$puntos22 = $_POST["preg22"];
		if($_POST["preg22"] != ""){
			$puntos22 = json_decode($_POST["preg22"], "yes");
			foreach($puntos22["features"] as &$f){
				$f["properties"]["id_db"]="$newid";
				$f["properties"]["edad"]=$_POST["preg2"];
				$f["properties"]["genero"]=$_POST["preg3"];
				$f["properties"]["t_uso_bici"]=$_POST["preg11"];
				$f["properties"]["experiencia"]=$_POST["preg12"];
			}
			$puntos22 = json_encode($puntos22);
		}

		// Pregunta 27A
		$puntos27a = $_POST["preg27A"];
		if($_POST["preg27A"] != ""){
			$puntos27a = json_decode($_POST["preg27A"], "yes");
			foreach($puntos27a["features"] as &$f){
				$f["properties"]["id_db"]="$newid";
				$f["properties"]["edad"]=$_POST["preg2"];
				$f["properties"]["genero"]=$_POST["preg3"];
				$f["properties"]["t_uso_bici"]=$_POST["preg11"];
				$f["properties"]["experiencia"]=$_POST["preg12"];
			}
			$puntos27a = json_encode($puntos27a);
		}

		// Pregunta 28A
		$puntos28a = $_POST["preg28A"];
		if($_POST["preg28A"] != ""){
			$puntos28a = json_decode($_POST["preg28A"], "yes");
			foreach($puntos28a["features"] as &$f){
				$f["properties"]["id_db"]="$newid";
				$f["properties"]["edad"]=$_POST["preg2"];
				$f["properties"]["genero"]=$_POST["preg3"];
				$f["properties"]["t_uso_bici"]=$_POST["preg11"];
				$f["properties"]["experiencia"]=$_POST["preg12"];
			}
			$puntos28a = json_encode($puntos28a);
		}

		// Pregunta 29
		$puntos29 = $_POST["preg29"];
		if($_POST["preg29"] != ""){
			$puntos29 = json_decode($_POST["preg29"], "yes");
			foreach($puntos29["features"] as &$f){
				$f["properties"]["id_db"]="$newid";
				$f["properties"]["edad"]=$_POST["preg2"];
				$f["properties"]["genero"]=$_POST["preg3"];
				$f["properties"]["t_uso_bici"]=$_POST["preg11"];
				$f["properties"]["experiencia"]=$_POST["preg12"];
			}
			$puntos29 = json_encode($puntos29);
		}

		// sql actualización de registros individuales con id
		$query = "UPDATE encuesta SET rutas=:preg13, percepcion=:preg22, acc_donde=:preg27A, robo_donde=:preg28A, percep_cambio=:preg29 where id=:id";// (nombre en base de datos) = :(nombre de la columna a actualizar)** separada por ","
		$user_data = array(
			':preg13' => $rutas13,
			':preg22' => $puntos22,
			':preg27A' => $puntos27a,
			':preg28A' => $puntos28a,
			':preg29' => $puntos29,
			':id' => $newid
		);
		
		$statement = $connect->prepare($query);
		$statement->execute($user_data);

		/*----------------------------------------Generacion de unico registro Geojson para el nuevo ingreso en base de datos-------------------------------------*/

		$rutas13= json_decode($rutas13, "yes");
		$agregado=$rutas13;
		if($_POST["preg22"] != ""){
			$puntos22= json_decode($puntos22, "yes");
			$agregado["features"] = array_merge($agregado["features"], $puntos22["features"]);
		}
		if($_POST["preg27A"] != ""){
			$puntos27a= json_decode($puntos27a, "yes");
			$agregado["features"] = array_merge($agregado["features"], $puntos27a["features"]);
		}
		if($_POST["preg28A"] != ""){
			$puntos28a= json_decode($puntos28a, "yes");
			$agregado["features"] = array_merge($agregado["features"], $puntos28a["features"]);
		}
		if($_POST["preg29"] != ""){
			$puntos29= json_decode($puntos29, "yes");
			$agregado["features"] = array_merge($agregado["features"], $puntos29["features"]);
		}
		$agregado=json_encode($agregado);
		
		//sql actualización de registro combinado de mapas en base de datos
		$query = "UPDATE encuesta SET geojson_tot=:agregado where id=:id";
		$user_data = array(
			':agregado' => $agregado,
			':id' => $newid
		);
		
		$statement = $connect->prepare($query);
		$statement->execute($user_data);

		/*----------------------------------------Generacion de unico registro Geojson para el nuevo ingreso en base de datos-------------------------------------*/

	/*	$acum=[];
		$sql = 'SELECT geojson_tot FROM encuesta ORDER BY id';
		foreach ($connect->query($sql) as $row) {
			$acumulado= json_decode($row['geojson_tot'], "yes");
			if(empty($acum)){
				$acum = $acumulado;
			}
			else{
				$acum["features"] = array_merge($acum["features"], $acumulado["features"]);
			}
		}

		$acum=json_encode($acum); */
		
		//sql actualización de registro acumulado de todos los ingresos de mapas en base de datos
		/* $query = "UPDATE encuesta SET acum_enc=:acum where id=:id";
		$user_data = array(
			':acum' => $acum,
			':id' => $newid
		);

		$statement = $connect->prepare($query);
		$statement->execute($user_data);
 */
		$message = 'Encuesta enviada satisfactoriamente.';
		
	}
	else
	{
	$message = 'Hubo un problema:  '.$statement->errorInfo()[0].' = '.$statement->errorInfo()[1].' = '.$statement->errorInfo()[2];
	}
}
?>

<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link  rel="icon"   href="../img/favicon.png" type="image/png" />
		<title>Encuesta SIGenBici</title>

		<!-- Bootstrap CSS -->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
		
		<!-- Hojas de Estilo -->
		<link rel="stylesheet" href="../css/style_form.css" />
	</head>

	<body>
		<div id="form-result" class="d-flex justify-content-center vw-100 min-vh-100">

			<h1 id="title-form-result" class="text-end p-3 pb-2 fw-bold">Resultado</h1>
			<div id="cierre" class="pregunta col-12 col-sm-6 background-blur p-5">
				<div class="d-flex flex-column align-items-center h-100">
					
					<!-- Logo de SIGenBici -->
					<div id="logo3" class="icon_wrapper my-5">
						<a href="../index.html"><img class="icon" src="../img/logo2_b.svg" alt="Logo SIGenBici"></a>
					</div>

					<div class="mb-2">
						<p style = "text-align: justify">
							<?php echo $message;?><br><br>
						</p>
					</div>

					<div class="botonera mt-auto">
						<input type="button" class="btnTo btn btn-primary" onclick=" location.href='../visor.html' " value="Ir a mapa SIGenBici" name="boton" />
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
