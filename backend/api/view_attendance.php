<?php
require_once '../config/db_connect.php';
require_once '../models/Attendance.php';

$attendance = new Attendance($conn);
$records = $attendance->getAll();

header('Content-Type: application/json');
echo json_encode($records);
?>
