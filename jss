// Tab switching
const tabLogin = document.getElementById("tab-login");
const tabSignup = document.getElementById("tab-signup");
const formLogin = document.getElementById("login");
const formSignup = document.getElementById("signup");

function setActiveTab(tab) {
  const isLogin = tab === "login";
  tabLogin.classList.toggle("active", isLogin);
  tabSignup.classList.toggle("active", !isLogin);

  formLogin.hidden = !isLogin;
  formSignup.hidden = isLogin;

  formLogin.classList.toggle("active", isLogin);
  formSignup.classList.toggle("active", !isLogin);

  tabLogin.setAttribute("aria-selected", String(isLogin));
  tabSignup.setAttribute("aria-selected", String(!isLogin));
}

tabLogin.addEventListener("click", () => setActiveTab("login"));
tabSignup.addEventListener("click", () => setActiveTab("signup"));

// Basic validation helpers
function showError(inputId, message) {
  const el = document.querySelector(`[data-error-for="${inputId}"]`);
  if (el) el.textContent = message || "";
}
function clearErrors(form) {
  form.querySelectorAll(".error").forEach(e => (e.textContent = ""));
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Login submit
formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors(formLogin);

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  if (!isValidEmail(email)) showError("login-email", "Enter a valid email");
  if (!password || password.length < 6) showError("login-password", "At least 6 characters");

  const hasErrors = Array.from(formLogin.querySelectorAll(".error")).some(el => el.textContent);
  if (hasErrors) return;

  // TODO: Replace with real API/Firebase call
  try {
    // Example: const res = await fetch("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
    // Or Firebase Auth: await signInWithEmailAndPassword(auth, email, password);
    alert("Logged in (demo). Wire this to your backend/Firebase.");
  } catch (err) {
    showError("login-password", "Invalid credentials");
  }
});

// Signup submit
formSignup.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors(formSignup);

  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  if (!name) showError("signup-name", "Name is required");
  if (!isValidEmail(email)) showError("signup-email", "Enter a valid email");
  if (!password || password.length < 8) showError("signup-password", "At least 8 characters");

  const hasErrors = Array.from(formSignup.querySelectorAll(".error")).some(el => el.textContent);
  if (hasErrors) return;

  // TODO: Replace with real API/Firebase call
  try {
    // Example: await fetch("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) });
    // Or Firebase: await createUserWithEmailAndPassword(auth, email, password);
    alert("Signed up (demo). Wire this to your backend/Firebase.");
    setActiveTab("login");
  } catch (err) {
    showError("signup-email", "Email already in use");
  }
});

// Initialize default tab
setActiveTab("login");
