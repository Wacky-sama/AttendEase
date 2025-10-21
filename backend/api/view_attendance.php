<?php
include '../config/db_connect.php';

header('Content-Type: application/json');

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

if ($result->num_rows > 0) {
    $attendance = [];
    while ($row = $result->fetch_assoc()) {
        $attendance[] = $row;
    }
    echo json_encode(["success" => true, "data" => $attendance]);
} else {
    echo json_encode(["success" => true, "data" => []]);
}

$conn->close();
?>
