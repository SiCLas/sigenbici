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
$sql = "CREATE TABLE IF NOT EXISTS lugares (
id	INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
reg_date	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
consenti VARCHAR(50),
genero	INT,
municipio	INT,
comuna INT,
barrio	VARCHAR(50),
experiencia  INT,
percepcion TEXT,
correo VARCHAR(50)
)";

if ($conn->query($sql) === TRUE) {
  echo "Table created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}

$conn->close();
?> 
