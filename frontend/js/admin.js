document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("attendanceForm");
  const tableBody = document.querySelector("#attendanceTable tbody");
  const studentSelect = document.getElementById("student_id");

  async function loadStudents() {
    try {
      const response = await fetch("../backend/api/fetch_students.php");
      const students = await response.json();

      studentSelect.innerHTML = '<option value="">Select Student</option>';
      students.forEach((student) => {
        const option = document.createElement("option");
        option.value = student.student_id;
        option.textContent = `${student.full_name} - ${student.course} - ${student.year_level}-${student.section}`;
        studentSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error loading students:", error);
    }
  }

  async function loadAttendance() {
    document.getElementById("loading").style.display = "block";
    try {
      const response = await fetch("../backend/api/admin_view_attendance.php");
      const result = await response.json();
      const records = result.data || [];

      tableBody.innerHTML = "";
      records.forEach((record) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${record.student_id}</td>
        <td>${record.full_name}</td>
        <td>${record.course}</td>
        <td>${record.year_level}</td>
        <td>${record.section}</td>
        <td>${record.date}</td>
        <td>${record.status}</td>
      `;
        tableBody.appendChild(row);
      });

      updateTally();
    } catch (error) {
      console.error("Error loading attendance:", error);
    } finally {
      document.getElementById("loading").style.display = "none";
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetch("../backend/api/save_attendance.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert("Attendance recorded successfully!");
      } else {
        alert("Error: " + result.message);
      }

      form.reset();
      await loadAttendance();
      updateTally();
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Failed to submit attendance.");
    }
  });

  function updateTally() {
    const rows = document.querySelectorAll("#attendanceTable tbody tr");
    let present = 0,
      absent = 0,
      late = 0;

    rows.forEach((row) => {
      const status = row.cells[6].textContent.trim();
      if (status === "Present") present++;
      else if (status === "Absent") absent++;
      else if (status === "Late") late++;
    });

    document.getElementById("presentCount").textContent = present;
    document.getElementById("absentCount").textContent = absent;
    document.getElementById("lateCount").textContent = late;
  }

  document.getElementById("searchInput").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const rows = document.querySelectorAll("#attendanceTable tbody tr");
    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? "" : "none";
    });
  });

  document.getElementById("logoutBtn").addEventListener("click", async () => {
    if (confirm("Are you sure you want to log out?")) {
      const response = await fetch("../backend/api/logout.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();

      if (result.success) {
        alert(result.message);
        window.location.href = "login.html";
      } else {
        alert("Logout failed. Please try again.");
      }
    }
  });

  document.getElementById("exportBtn").addEventListener("click", () => {
    const table = document.getElementById("attendanceTable");
    let csv = [];
    for (let row of table.rows) {
      let rowData = [];
      for (let cell of row.cells) {
        rowData.push(cell.textContent);
      }
      csv.push(rowData.join(","));
    }
    const blob = new Blob([csv.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance_records.csv";
    a.click();
  });

  loadStudents();
  loadAttendance();
});
