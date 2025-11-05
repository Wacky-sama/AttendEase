<?php
include '../config/db_connect.php';
header('Content-Type: application/json');

// Read JSON input (optional, only used by student)
$input = json_decode(file_get_contents("php://input"), true);
$student_id = $input['student_id'] ?? null;

if ($student_id) {
    // Fetch only this student's attendance
    $stmt = $conn->prepare("
        SELECT 
            a.id, 
            a.student_id, 
            CONCAT(u.first_name, ' ', u.last_name) AS full_name, 
            a.date, 
            a.status 
        FROM attendance a
        JOIN users u ON a.student_id = u.student_id
        WHERE a.student_id = ?
        ORDER BY a.date DESC
    ");
    $stmt->bind_param("s", $student_id);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    // Admin view — fetch all attendance
    $sql = "
        SELECT 
            a.id, 
            a.student_id, 
            CONCAT(u.first_name, ' ', u.last_name) AS full_name, 
            a.date, 
            a.status 
        FROM attendance a
        JOIN users u ON a.student_id = u.student_id
        ORDER BY a.date DESC
    ";
    $result = $conn->query($sql);
}

$attendance = [];
while ($row = $result->fetch_assoc()) {
    $attendance[] = $row;
}

echo json_encode(["success" => true, "data" => $attendance]);
$conn->close();
?>
