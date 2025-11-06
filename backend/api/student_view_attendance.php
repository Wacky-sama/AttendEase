<?php
include '../config/db_connect.php';
header('Content-Type: application/json');

$input = json_decode(file_get_contents("php://input"), true);
$student_id = $input['student_id'] ?? null;

if (!$student_id) {
    echo json_encode(["success" => false, "message" => "Missing student ID"]);
    exit;
}

$stmt = $conn->prepare("
    SELECT 
        att.id, 
        att.student_id, 
        CONCAT(usr.first_name, ' ', usr.last_name) AS full_name, 
        att.date, 
        att.status 
    FROM attendance att
    JOIN users usr ON att.student_id = usr.student_id
    WHERE att.student_id = ?
    ORDER BY att.date DESC
");
$stmt->bind_param("s", $student_id);
$stmt->execute();
$result = $stmt->get_result();

$attendance = [];
while ($row = $result->fetch_assoc()) {
    $attendance[] = $row;
}

echo json_encode(["success" => true, "data" => $attendance]);
$conn->close();
?>
