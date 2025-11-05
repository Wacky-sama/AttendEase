<?php
class Users {
    private $conn;
    private $table = "users";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function save($role, $student_id, $last_name, $first_name, $middle_initial, $username, $password, $course, $year_level, $section) {
        $stmt = $this->conn->prepare("
            INSERT INTO $this->table 
            (role, student_id, last_name, first_name, middle_initial, username, password, course, year_level, section) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->bind_param("ssssssssss", $role, $student_id, $last_name, $first_name, $middle_initial, $username, $password, $course, $year_level, $section);
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

    public function getByStudentId($student_id) {
        $stmt = $this->conn->prepare("SELECT * FROM $this->table WHERE student_id = ?");
        $stmt->bind_param("s", $student_id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }
}
?>
