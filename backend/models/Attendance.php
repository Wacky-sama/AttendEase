<?php
class Attendance {
    private $conn;
    private $table = "attendance";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function save($student_id, $status) {
        $date = date('Y-m-d');
        $stmt = $this->conn->prepare("
            INSERT INTO $this->table (student_id, date, status) 
            VALUES (?, ?, ?)
        ");
        $stmt->bind_param("sss", $student_id, $date, $status);
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

    public function getByStudent($student_id) {
        $stmt = $this->conn->prepare("
            SELECT date, status 
            FROM $this->table 
            WHERE student_id = ? 
            ORDER BY date DESC
        ");
        $stmt->bind_param("s", $student_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $records = [];
        while ($row = $result->fetch_assoc()) {
            $records[] = $row;
        }
        return $records;
    }
}
?>
