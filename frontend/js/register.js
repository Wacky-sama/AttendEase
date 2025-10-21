document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const response = await fetch("../backend/api/register.php", {
    method: "POST",
    body: formData,
  });
  const result = await response.json();

  if (result.success) {
    alert(result.message);
    window.location.href = "login.html";
  } else {
    alert(result.message || "Registration failed.");
  }
});
