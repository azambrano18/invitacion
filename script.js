const eventDate = new Date(2026, 8, 11, 15, 0);
const whatsappNumber = "56994394655";

const $ = id => document.getElementById(id);

// COUNTDOWN
const update = () => {
  const diff = eventDate - new Date();
  const m = Math.max(0, Math.floor(diff / 60000));

  $("cdDays").textContent  = Math.floor(m / 1440);
  $("cdHours").textContent = Math.floor((m % 1440) / 60);
  $("cdMins").textContent  = m % 60;
};

update();
setInterval(update, 30000);

// WHATSAPP
$("rsvpBtn").href =
  `https://wa.me/${whatsappNumber}?text=` +
  encodeURIComponent(
    `Hola Barbara!
Confirmo asistencia al cumpleaños de la Princesa Victoria 🎀✨
📅 11/09/2026
🕒 15:00
Nos vemos pronto!`
  );

// TELÓN
$("curtainContainer").onclick = () => {
  $("sparkleSound").play().catch(()=>{});
  document.querySelector(".introText")?.remove();
  $("curtainContainer").classList.add("open");

  setTimeout(() => {
    $("curtainContainer").style.display = "none";
  }, 2200);
};
