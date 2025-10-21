document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("attendanceForm");
  const tableBody = document.querySelector("#attendanceTable tbody");
  const studentSelect = document.getElementById("student_id");

  async function loadStudents() {
    try {
      const response = await fetch("../backend/api/fetch_students.php");
      const students = await response.json();

      studentSelect.innerHTML = '<option value="">Select Student</option>';
      students.forEach((s) => {
        const option = document.createElement("option");
        option.value = s.student_id;
        option.textContent = `${s.name} (${s.student_id})`;
        studentSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error loading students:", error);
    }
  }

  async function loadAttendance() {
    try {
      const response = await fetch("../backend/api/view_attendance.php");
      const result = await response.json();
      const records = result.data || [];

      tableBody.innerHTML = "";
      records.forEach((r) => {
        const row = document.createElement("tr");
        row.innerHTML = `
    <td>${r.id}</td>
    <td>${r.full_name}</td>
    <td>${r.student_id}</td>
    <td>${r.date}</td>
    <td>${r.status}</td>
  `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error loading attendance:", error);
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
      loadAttendance();
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Failed to submit attendance.");
    }
  });

  loadStudents();
  loadAttendance();
});
