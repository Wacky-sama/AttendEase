document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    const response = await fetch("../backend/api/login.php", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      if (result.user) {
        localStorage.setItem(
          "studentName",
          `${result.user.first_name} ${result.user.last_name}`
        );
        localStorage.setItem("studentId", result.user.student_id);
      }

      // Redirect AFTER saving
      if (result.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "student.html";
      }
    } else {
      alert(result.message || "Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Try again later.");
  }
});
