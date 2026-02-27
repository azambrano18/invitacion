const curtainContainer = document.getElementById("curtainContainer");
const music = document.getElementById("bgMusic");

// Countdown elements
const cdDays = document.getElementById("cdDays");
const cdHours = document.getElementById("cdHours");
const cdMins = document.getElementById("cdMins");

// RSVP WhatsApp button
const rsvpBtn = document.getElementById("rsvpBtn");

const eventDate = new Date(2026, 8, 11, 15, 0, 0);
const whatsappNumber = "56994394655";

/* =========================
   COUNTDOWN
========================= */

function pad2(n) {
  return String(n).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    cdDays.textContent = "0";
    cdHours.textContent = "0";
    cdMins.textContent = "0";
    return;
  }

  const totalMinutes = Math.floor(diff / 1000 / 60);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const mins = totalMinutes % 60;

  cdDays.textContent = days;
  cdHours.textContent = hours;
  cdMins.textContent = mins;
}

function buildWhatsappLink() {
  const dateStr = `${pad2(eventDate.getDate())}/${pad2(eventDate.getMonth() + 1)}/${eventDate.getFullYear()}`;
  const timeStr = `${pad2(eventDate.getHours())}:${pad2(eventDate.getMinutes())}`;

  const msg =
    `Hola! 🙌\n` +
    `Confirmo asistencia al cumpleaños de Victoria 🎀✨\n` +
    `📅 ${dateStr}\n` +
    `🕒 ${timeStr}\n` +
    `¿Hay algo que deba llevar?`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

/* =========================
   TELÓN CINEMATOGRÁFICO
========================= */
curtainContainer.addEventListener("click", () => {

  // Evita múltiples clicks
  if (curtainContainer.classList.contains("open")) return;

  // 🔥 1️⃣ Eliminamos el texto INMEDIATAMENTE
  const introText = document.querySelector(".introText");
  if (introText) introText.remove();

  // 2️⃣ Abrimos el telón
  curtainContainer.classList.add("open");

  // 3️⃣ Cuando termine la animación
  setTimeout(async () => {

    // Bajamos el telón en la capa visual
    curtainContainer.style.zIndex = "-1";
    curtainContainer.style.pointerEvents = "none";

    // 🎵 Ahora comienza la música
    try {
      await music.play();
    } catch (err) {
      console.log("Autoplay bloqueado:", err);
    }

  }, 2200);

});

/* =========================
   INIT
========================= */

updateCountdown();
setInterval(updateCountdown, 30000);
rsvpBtn.href = buildWhatsappLink();