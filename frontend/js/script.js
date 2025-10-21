document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("attendanceForm");
  const tableBody = document.querySelector("#attendanceTable tbody");

  async function loadAttendance() {
    const response = await fetch("../backend/api/view_attendance.php");
    const records = await response.json();

    tableBody.innerHTML = "";
    records.forEach((r) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${r.id}</td>
        <td>${r.student_name}</td>
        <td>${r.student_id}</td>
        <td>${r.date}</td>
        <td>${r.status}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const response = await fetch("../backend/api/save_attendance.php", {
      method: "POST",
      body: formData,
    });

    const result = await response.text();
    alert(result);
    form.reset();
    loadAttendance();
  });

  loadAttendance();
});
