const curtainContainer = document.getElementById("curtainContainer");
const main = document.getElementById("mainContent");
const music = document.getElementById("bgMusic");

// Countdown elements
const cdDays = document.getElementById("cdDays");
const cdHours = document.getElementById("cdHours");
const cdMins = document.getElementById("cdMins");

// RSVP WhatsApp button
const rsvpBtn = document.getElementById("rsvpBtn");

// Evento: 11 Septiembre 2026 15:00 (hora local)
const eventDate = new Date(2026, 8, 11, 15, 0, 0);

// Ajusta aquí el número WhatsApp (formato internacional sin +, sin espacios)
// Ejemplo Chile: 569XXXXXXXX
const whatsappNumber = "569XXXXXXXX";

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

  const encoded = encodeURIComponent(msg);
  return `https://wa.me/${whatsappNumber}?text=${encoded}`;
}

curtainContainer.addEventListener("click", async () => {
  // Música: mejor compatibilidad iOS
  try {
    await music.play();
  } catch (err) {
    // Si iOS bloquea, igual continuamos (el usuario ya tocó)
    console.log("Autoplay bloqueado o error:", err);
  }

  curtainContainer.classList.add("open");

  setTimeout(() => {
    curtainContainer.style.display = "none";
    main.classList.add("showContent");
    main.setAttribute("aria-hidden", "false");
  }, 2000);
});

// Init
updateCountdown();
setInterval(updateCountdown, 30_000);

// RSVP
rsvpBtn.href = buildWhatsappLink();