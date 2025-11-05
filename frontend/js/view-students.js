document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#studentsTable tbody");
  const searchInput = document.getElementById("searchInput");

  async function loadStudentSummaries() {
    document.getElementById("loading").style.display = "block";
    try {
      // Fetch students
      const studentsResponse = await fetch("../backend/api/fetch_students.php");
      const students = await studentsResponse.json();

      // Fetch all attendance records
      const attendanceResponse = await fetch("../backend/api/admin_view_attendance.php");
      const attendanceResult = await attendanceResponse.json();
      const records = attendanceResult.data || [];

      // Aggregate data per student
      const summaries = {};
      students.forEach(student => {
        summaries[student.student_id] = {
          ...student,
          present: 0,
          absent: 0,
          late: 0,
          total: 0
        };
      });

      records.forEach(record => {
        if (summaries[record.student_id]) {
          summaries[record.student_id].total++;
          if (record.status === "Present") summaries[record.student_id].present++;
          else if (record.status === "Absent") summaries[record.student_id].absent++;
          else if (record.status === "Late") summaries[record.student_id].late++;
        }
      });

      // Render table
      tableBody.innerHTML = "";
      Object.values(summaries).forEach(summary => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${summary.student_id}</td>
          <td>${summary.full_name}</td>
          <td>${summary.course}</td>
          <td>${summary.year_level}</td>
          <td>${summary.section}</td>
          <td>${summary.present}</td>
          <td>${summary.absent}</td>
          <td>${summary.late}</td>
          <td>${summary.total}</td>
        `;
        tableBody.appendChild(row);
      });

      // Search functionality
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const rows = document.querySelectorAll("#studentsTable tbody tr");
        rows.forEach(row => {
          const name = row.cells[1].textContent.toLowerCase();
          row.style.display = name.includes(query) ? "" : "none";
        });
      });

    } catch (error) {
      console.error("Error loading student summaries:", error);
      alert("Failed to load data.");
    } finally {
      document.getElementById("loading").style.display = "none";
    }
  }

  document.getElementById("logoutBtn").addEventListener("click", async () => {
    if (confirm("Are you sure you want to log out?")) {
      const response = await fetch("../backend/api/logout.php", { method: "POST", headers: { "Content-Type": "application/json" } });
      const result = await response.json();
      if (result.success) {
        alert(result.message);
        window.location.href = "login.html";
      } else {
        alert("Logout failed. Please try again.");
      }
    }
  });

  loadStudentSummaries();
});