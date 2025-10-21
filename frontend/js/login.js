document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const response = await fetch("../backend/api/login.php", {
    method: "POST",
    body: formData,
  });
  const result = await response.json();

  if (result.success) {
    if (result.role === "admin") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "index.html";
    }
  } else {
    alert(result.message || "Login failed.");
  }
});
