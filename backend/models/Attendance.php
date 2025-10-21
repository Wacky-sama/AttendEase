<?php
class Attendance {
    private $conn;
    private $table = "attendance";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function save($student_name, $student_id, $status) {
        $date = date('Y-m-d');
        $stmt = $this->conn->prepare("INSERT INTO $this->table (student_name, student_id, date, status) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $student_name, $student_id, $date, $status);
        return $stmt->execute();
    }

    public function getAll() {
        $sql = "SELECT * FROM $this->table ORDER BY id DESC";
        $result = $this->conn->query($sql);
        $records = [];
        while ($row = $result->fetch_assoc()) {
            $records[] = $row;
        }
        return $records;
    }
}
?>
