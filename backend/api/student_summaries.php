<?php
require_once '../config/db_connect.php';

$query = "
    SELECT 
        usr.student_id, usr.full_name, usr.course, usr.year_level, usr.section,
        SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) AS present,
        SUM(CASE WHEN a.status = 'Absent' THEN 1 ELSE 0 END) AS absent,
        SUM(CASE WHEN a.status = 'Late' THEN 1 ELSE 0 END) AS late,
        COUNT(a.status) AS total
    FROM users usr
    LEFT JOIN attendance a ON usr.student_id = a.student_id
    WHERE usr.role = 'student'
    GROUP BY usr.student_id
";

$result = $conn->query($query);
$summaries = [];
while ($row = $result->fetch_assoc()) {
    $summaries[] = $row;
}

echo json_encode($summaries);
?>