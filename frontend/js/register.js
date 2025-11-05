const usernameInput = document.querySelector('input[name="username"]');
const firstNameInput = document.querySelector('input[name="first_name"]');
const lastNameInput = document.querySelector('input[name="last_name"]');
const middleInitialInput = document.querySelector('input[name="middle_initial"]');

// --- Force lowercase usernames ---
usernameInput.addEventListener("input", () => {
  // Filter out non-alphanumeric if you want clean usernames
  usernameInput.value = usernameInput.value.toLowerCase().replace(/[^a-z0-9._-]/g, "");
});

// --- Auto-capitalize names properly ---
function capitalizeName(input) {
  const words = input.value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1));
  input.value = words.join(" ");
}

firstNameInput.addEventListener("input", () => capitalizeName(firstNameInput));
lastNameInput.addEventListener("input", () => capitalizeName(lastNameInput));

// --- Middle Initial: only one uppercase letter allowed ---
middleInitialInput.addEventListener("input", () => {
  middleInitialInput.value = middleInitialInput.value
    .toUpperCase()
    .replace(/[^A-Z]/g, "")   // block numbers/symbols
    .charAt(0);               // only keep the first character
});

// --- Form submission ---
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
