document.addEventListener("DOMContentLoaded", async () => {
  const studentId = localStorage.getItem("studentId");
  const studentName = localStorage.getItem("studentName");
  const attendanceHistory = document.getElementById("attendanceHistory");
  const studentNameEl = document.getElementById("studentName");

  console.log("Student ID:", studentId);

  if (studentName) studentNameEl.textContent = studentName;

  try {
    const response = await fetch("../backend/api/student_view_attendance.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_id: studentId }),
    });

    const result = await response.json();

    if (result.success && result.data.length > 0) {
      attendanceHistory.innerHTML = result.data
        .map(
          (record) => `
          <tr>
            <td>${new Date(record.date).toLocaleDateString()}</td>
            <td>
              <span class="badge ${
                record.status === "Present"
                  ? "bg-success"
                  : record.status === "Late"
                  ? "bg-warning"
                  : "bg-danger"
              }">${record.status}</span>
            </td>
          </tr>`
        )
        .join("");
    } else {
      attendanceHistory.innerHTML = `
        <tr><td colspan="3" class="text-center text-muted">No attendance records found.</td></tr>`;
    }
  } catch (error) {
    console.error("Error fetching attendance:", error);
    attendanceHistory.innerHTML = `
      <tr><td colspan="3" class="text-center text-danger">Failed to load data.</td></tr>`;
  }
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
      localStorage.clear();
      window.location.href = "login.html";
    } else {
      alert("Logout failed. Please try again.");
    }
  }
});
