<?php
error_reporting(E_ERROR | E_PARSE);
header('Content-Type: text/html; charset=utf-8');
$connect = new PDO("mysql:host=localhost;dbname=siclas_sigenbici;charset=utf8mb4", "siclas_sigenbici", "SIGenBici2020");/* localhost es el servidor, "sigenbici" es el nombre de la base de datos, nombre de usuario, contraseña */

/*--------------------------------------Generacion de registro ACUMULADO Geojson para el nuevo ingreso en base de datos-----------------------------------*/

$file = fopen("./txt/acumulado.json","w");

$acum=[];
$sql = 'SELECT geojson_tot FROM encuesta ORDER BY id';//encuesta es el nombre de la hoja
foreach ($connect->query($sql) as $row) {
    $acumulado= json_decode($row['geojson_tot'], "yes");
    if(empty($acum)){
        $acum = $acumulado;
    }
    else{
        $acum["features"] = array_merge($acum["features"], $acumulado["features"]);
    }
}

$acum=json_encode($acum);
fwrite($file, "$acum" . PHP_EOL);
fclose($file);

$message = 'Se generó el acumulado correctamente.';
?>

<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link  rel="icon"   href="../img/favicon.png" type="image/png" />
		<title>Acumulado SIGenBici</title>

		<!-- Bootstrap CSS -->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
		
		<!-- Hojas de Estilo -->
		<link rel="stylesheet" href="../css/style_form.css" />
	</head>

	<body>
		<div id="acumulado" class="d-flex justify-content-center vw-100 min-vh-100">

			<h1 id="title-acumulado" class="text-end p-3 pb-2 fw-bold">Generación Acumulado</h1>
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

					<!-- <div class="botonera mt-auto">
						<input type="button" class="btnTo btn btn-primary" onclick=" location.href='../visor.html' " value="Ir a mapa SIGenBici" name="boton" />
					</div> -->
				</div>
			</div>
		</div>
	</body>
</html>