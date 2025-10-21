<?php
require_once '../config/db_connect.php';
require_once '../models/Attendance.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $student_name = $_POST['studentName'] ?? '';
    $student_id = $_POST['studentId'] ?? '';
    $status = $_POST['status'] ?? 'Present';

    $attendance = new Attendance($conn);

    if ($student_name && $student_id) {
        $result = $attendance->save($student_name, $student_id, $status);
        echo $result ? "Attendance recorded successfully!" : "Error saving attendance.";
    } else {
        echo "Please fill out all fields.";
    }
}
?>
