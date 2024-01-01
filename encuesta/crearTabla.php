 <?php
$servername = "localhost";
$username = "siclas_sigenbici";
$password = "SIGenBici2020";

// Create connection
$conn = new mysqli($servername, $username, $password);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// sql to create database
$conn->query("CREATE DATABASE IF NOT EXISTS siclas_sigenbici CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci");
$dbase = "siclas_sigenbici";
mysqli_select_db($conn,$dbase);

// sql to create table
$sql = "CREATE TABLE IF NOT EXISTS encuesta (
id	INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
reg_date	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
consenti VARCHAR(50),
nombre	VARCHAR(50),
edad	VARCHAR(50),
genero	INT,
municipio	INT,
comuna INT,
barrio	VARCHAR(50),
educacion	INT,
ocupacion	VARCHAR(50),
jornada_lab	INT,
sector_lab VARCHAR(50),
modos	VARCHAR(50),
comb_modos	INT,
cual_comb VARCHAR(100),
tipo_bici VARCHAR(50),
bici_otro VARCHAR(50),
t_uso_bici INT,
experiencia  INT,
rutas TEXT,
percepcion TEXT,
accidente INT, 
acc_donde TEXT,
robo INT, 
robo_donde TEXT,
percep_cambio TEXT, 
optima_bici VARCHAR(500), 
dific_bici VARCHAR(500), 
correo VARCHAR(50),
contacto INT,
geojson_tot TEXT,
acum_enc TEXT
)";

if ($conn->query($sql) === TRUE) {
  echo "Table created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}

$conn->close();
?> 
