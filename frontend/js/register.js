const usernameInput = document.querySelector('input[name="username"]');
const firstNameInput = document.querySelector('input[name="first_name"]');
const lastNameInput = document.querySelector('input[name="last_name"]');
const middleInitialInput = document.querySelector(
  'input[name="middle_initial"]'
);

usernameInput.addEventListener("input", () => {
  usernameInput.value = usernameInput.value
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "");
});

function capitalizeName(input) {
  const words = input.value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  input.value = words.join(" ");
}

firstNameInput.addEventListener("input", () => capitalizeName(firstNameInput));
lastNameInput.addEventListener("input", () => capitalizeName(lastNameInput));

middleInitialInput.addEventListener("keydown", (e) => {
  const key = e.key;

  if (["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(key)) {
    return;
  }

  if (!/^[a-zA-Z]$/.test(key)) {
    e.preventDefault();
    return;
  }

  if (middleInitialInput.value.length >= 1 && key.length === 1) {
    e.preventDefault();
  }
});

middleInitialInput.addEventListener("paste", (e) => {
  e.preventDefault();
  const paste = (e.clipboardData || window.clipboardData).getData("text");
  const letter = paste
    .replace(/[^a-zA-Z]/g, "")
    .charAt(0)
    .toUpperCase();
  middleInitialInput.value = letter;
});

middleInitialInput.addEventListener("input", () => {
  let value = middleInitialInput.value.replace(/[^a-zA-Z]/g, "");

  if (value.length > 1) {
    value = value.charAt(0);
  }
  middleInitialInput.value = value.toUpperCase();
});

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const middleInitial = middleInitialInput.value;
    if (middleInitial && !/^[A-Za-z]$/.test(middleInitial)) {
      alert("Middle initial must be a single letter only.");
      middleInitialInput.focus();
      return;
    }

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
