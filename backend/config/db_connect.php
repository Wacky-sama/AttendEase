<?php
$servername = "localhost";
$username = "root"; // XAMPP default
$password = "";
$database = "attendance_db";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
?>
