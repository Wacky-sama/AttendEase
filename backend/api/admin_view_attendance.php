<?php
include '../config/db_connect.php';
header('Content-Type: application/json');

$sql = "
    SELECT 
        att.id, 
        att.student_id, 
        CONCAT(usr.first_name, ' ', usr.last_name) AS full_name, 
        usr.course,
        usr.year_level,
        usr.section,
        att.date, 
        att.status 
    FROM attendance att
    JOIN users usr ON att.student_id = usr.student_id
    ORDER BY att.date DESC
";

$result = $conn->query($sql);

$attendance = [];
while ($row = $result->fetch_assoc()) {
    $attendance[] = $row;
}

echo json_encode(["success" => true, "data" => $attendance]);
$conn->close();
?>
