const passwordEl = document.getElementById("password");
const lengthEl = document.getElementById("length");

const upperEl = document.getElementById("uppercase");
const lowerEl = document.getElementById("lowercase");
const numberEl = document.getElementById("numbers");
const symbolEl = document.getElementById("symbols");

const barFill = document.getElementById("bar-fill");
const strengthText = document.getElementById("strength-text");

const generateBtn = document.getElementById("generate");
const incBtn = document.getElementById("increase");
const decBtn = document.getElementById("decrease");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function random(str) {
  return str[Math.floor(Math.random() * str.length)];
}

/* 🔥 GERAÇÃO REALMENTE ALEATÓRIA */
function generatePassword(length) {
  let pool = "";

  if (upperEl.checked) pool += upperChars;
  if (lowerEl.checked) pool += lowerChars;
  if (numberEl.checked) pool += numberChars;
  if (symbolEl.checked) pool += symbolChars;

  if (!pool) return "";

  if (length < 8) return "";

  let password = "";
  for (let i = 0; i < length; i++) {
    password += random(pool);
  }

  return password;
}

/* 🔥 AVALIAÇÃO REAL DE FORÇA */
function strength(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score;
}

/* 🔥 UI DINÂMICA */
function updateStrengthUI(score) {
  let percent = 0;
  let color = "red";
  let text = "Fraca";

  if (score <= 2) {
    percent = 30;
    color = "red";
    text = "Fraca";
  } else if (score <= 4) {
    percent = 65;
    color = "yellow";
    text = "Média";
  } else {
    percent = 100;
    color = "green";
    text = "Forte";
  }

  barFill.style.width = percent + "%";
  barFill.style.background = color;
  strengthText.textContent = text;
}

/* 🔥 FUNÇÃO PRINCIPAL INTERATIVA */
function update() {
  const length = parseInt(lengthEl.value);

  if (length < 8) {
    passwordEl.textContent = "mínimo 8";
    barFill.style.width = "0%";
    strengthText.textContent = "Inválida";
    return;
  }

  const pass = generatePassword(length);

  passwordEl.textContent = pass;

  const score = strength(pass);
  updateStrengthUI(score);
}

/* 🔥 EVENTOS (INTERAÇÃO REAL) */
generateBtn.addEventListener("click", update);

incBtn.addEventListener("click", () => {
  lengthEl.value = Math.min(32, parseInt(lengthEl.value) + 1);
  update();
});

decBtn.addEventListener("click", () => {
  lengthEl.value = Math.max(8, parseInt(lengthEl.value) - 1);
  update();
});

lengthEl.addEventListener("input", update);

upperEl.addEventListener("change", update);
lowerEl.addEventListener("change", update);
numberEl.addEventListener("change", update);
symbolEl.addEventListener("change", update);

/* 🔥 GERAÇÃO INICIAL */
update();