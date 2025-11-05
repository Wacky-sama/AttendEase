<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once '../config/db_connect.php';

$query = "
    SELECT 
        id, 
        student_id, 
        CONCAT(last_name, ', ', first_name, ' ', COALESCE(middle_initial, '')) AS full_name,
        course,
        year_level,
        section
    FROM users
    WHERE role = 'student'
    ORDER BY last_name ASC
";

$result = $conn->query($query);

$students = [];
while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}

header('Content-Type: application/json');
echo json_encode($students);
?>
