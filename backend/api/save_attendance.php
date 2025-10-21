<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once '../config/db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $student_id = $_POST['student_id'] ?? null; // varchar(8)
    $status = $_POST['status'] ?? null;
    $date = date('Y-m-d');

    if (!$student_id || !$status) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Missing required fields"]);
        exit;
    }

    // Prevent duplicate entries for the same student and date
    $check = $conn->prepare("SELECT id FROM attendance WHERE student_id = ? AND date = ?");
    $check->bind_param("ss", $student_id, $date);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Attendance already recorded for today"]);
        $check->close();
        $conn->close();
        exit;
    }
    $check->close();

    $query = "INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sss", $student_id, $date, $status);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Attendance recorded successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
