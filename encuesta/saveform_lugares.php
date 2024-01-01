<?php
error_reporting(E_ERROR | E_PARSE);
header('Content-Type: text/html; charset=utf-8');
$connect = new PDO("mysql:host=localhost;dbname=siclas_sigenbici;charset=utf8mb4", "siclas_sigenbici", "SIGenBici2020");/* localhost es el servidor, "encuesta" es el nombre de la base de datos, nombre de usuario, contraseña */
$message = 'Nada para enviar';
if(isset($_POST["preg22"]))
{
	$query = "INSERT INTO lugares";/* "rutas" es el nombre de la tabla en la base de datos */
	$query .= "(consenti, genero, municipio, comuna, barrio, experiencia, percepcion, correo) ";/* el .= lo que hace es concatenar y en esa fila van los NOMBRES DE LAS COLUMNAS EN LA BASE DE DATOS */
	$query .= "VALUES(:preg0, :preg3, :preg4, :preg5_com, :preg5, :preg12,:preg22, :preg32);";/* AQUÍ SON LOS VALORES DE LAS VARIABLES EN LA ENCUESTA, QUE NO ESTÁN DEFINIDAS, LUEGO SE ASOCIAN A LOS VALORES DE LA ENCUESTA CON EL POST*/

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

	$user_data = array(
		':preg0' => $_POST["trat_datos"],
		':preg3' => $_POST["preg3"],
		':preg4' => $_POST["preg4"],
		':preg5_com' => $comuna,
		':preg5' => $barrio,
		':preg12' => $_POST["preg12"],
		':preg22' => $_POST["preg22"],
		':preg32' => $_POST["preg32"]
	);
	$statement = $connect->prepare($query);// Prepara la sentencia, connect guarda el ultimo id
	if($statement->execute($user_data))
	{
		$newid = $connect->lastInsertId();// Obtiene el id del último registro insertado en la base de datos
		
		/*----------------------Transformar el valor guardado de las rutas y puntos en objeto nuevamente para cargar atributo ID a cada uno-----------------------*/

		$puntos22 = $_POST["preg22"];
		if($_POST["preg22"] != ""){
			$puntos22 = json_decode($_POST["preg22"], "yes");
			foreach($puntos22["features"] as &$f){
				$f["properties"]["id_db"]="$newid";
				$f["properties"]["genero"]=$_POST["preg3"];
				$f["properties"]["experiencia"]=$_POST["preg12"];
				$f["properties"]["correo"]=$_POST["preg32"];
			}
			$puntos22 = json_encode($puntos22);
		}

		// sql actualización de registros individuales con id
		$query = "UPDATE lugares SET percepcion=:preg22 where id=:id";// (nombre en base de datos) = :(nombre de la columna a actualizar)** separada por ","
		$user_data = array(
			':preg22' => $puntos22,
			':id' => $newid
		);
		
		$statement = $connect->prepare($query);
		$statement->execute($user_data);

		$message = 'Encuesta enviada satisfactoriamente';
		
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
		<div id="form-result-ruta" class="d-flex justify-content-center vw-100 min-vh-100">

			<h1 id="title-form-result-ruta" class="text-end p-3 pb-2 fw-bold">Resultado</h1>
			<div id="cierre" class="pregunta col-12 col-sm-6 background-blur p-5">
				<div class="d-flex flex-column align-items-center h-100">

					<!-- Logo de SIGenBici -->
					<div id="logo3" class="icon_wrapper my-5">
						<a href="../index.html"><img class="icon" src="../img/Logo2_b.svg" alt="Logo SIGenBici"></a>
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
