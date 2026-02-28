/* =====================================================
   REFERENCIAS A ELEMENTOS DEL DOM
===================================================== */

/*
  Capturamos los elementos principales del HTML.
  Si cambias los IDs en el HTML, debes actualizar aquí.
*/

const curtainContainer = document.getElementById("curtainContainer"); // Telón completo
const sparkleSound = document.getElementById("sparkleSound");

// Elementos del contador regresivo
const cdDays = document.getElementById("cdDays");
const cdHours = document.getElementById("cdHours");
const cdMins = document.getElementById("cdMins");

// Botón RSVP WhatsApp
const rsvpBtn = document.getElementById("rsvpBtn");


/* =====================================================
   CONFIGURACIÓN PRINCIPAL DEL EVENTO
===================================================== */

/*
  Fecha del evento.
  IMPORTANTE:
  El mes en JavaScript comienza en 0.
  0 = Enero
  8 = Septiembre
*/

const eventDate = new Date(2026, 8, 11, 15, 0, 0);

/*
  Número de WhatsApp en formato internacional
  SIN +
  SIN espacios
*/
const whatsappNumber = "56994394655";


/* =====================================================
   UTILIDADES
===================================================== */

/*
  pad2()
  Agrega cero delante si el número es menor a 10.
  Ejemplo: 5 → "05"
*/

function pad2(n) {
  return String(n).padStart(2, "0");
}


/* =====================================================
   COUNTDOWN (CUENTA REGRESIVA)
===================================================== */

/*
  updateCountdown()
  Calcula la diferencia entre la fecha actual
  y la fecha del evento.
  Actualiza días, horas y minutos en pantalla.
*/

function updateCountdown() {

  const now = new Date();              // Fecha actual
  const diff = eventDate - now;        // Diferencia en milisegundos

  // Si el evento ya ocurrió
  if (diff <= 0) {
    cdDays.textContent = "0";
    cdHours.textContent = "0";
    cdMins.textContent = "0";
    return;
  }

  // Convertimos milisegundos a minutos totales
  const totalMinutes = Math.floor(diff / 1000 / 60);

  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const mins = totalMinutes % 60;

  // Actualizamos en pantalla
  cdDays.textContent = days;
  cdHours.textContent = hours;
  cdMins.textContent = mins;
}


/* =====================================================
   GENERADOR DE LINK WHATSAPP
===================================================== */

/*
  buildWhatsappLink()
  Construye automáticamente el mensaje prellenado
  con fecha y hora del evento.
*/

function buildWhatsappLink() {

  const dateStr =
    `${pad2(eventDate.getDate())}/${pad2(eventDate.getMonth() + 1)}/${eventDate.getFullYear()}`;

  const timeStr =
    `${pad2(eventDate.getHours())}:${pad2(eventDate.getMinutes())}`;

  const msg =
    `Hola Barbara!\n` +
    `Confirmo asistencia al cumpleaños de la Princesa Victoria 🎀✨\n` +
    `📅 ${dateStr}\n` +
    `🕒 ${timeStr}\n` +
    `Nos vemos pronto!`;

  // encodeURIComponent evita errores con emojis y saltos de línea
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
}


/* =====================================================
   TELÓN CINEMATOGRÁFICO
===================================================== */

/*
  Al hacer click:
  1. Elimina texto inicial.
  2. Agrega clase "open" → activa animación CSS.
  3. Espera que termine la animación.
  4. Baja el telón del stack visual.
  5. Inicia música.
*/

curtainContainer.addEventListener("click", async () => {

  if (curtainContainer.classList.contains("open")) return;

  // ✨ 1️⃣ Sonido mágico inmediato
  try {
    sparkleSound.currentTime = 0;
    await sparkleSound.play();
  } catch (err) {
    console.log("Error sparkle:", err);
  }

  // 2️⃣ Eliminar texto
  const introText = document.querySelector(".introText");
  if (introText) introText.remove();

  // 3️⃣ Abrir telón
  curtainContainer.classList.add("open");

  // 4️⃣ Cuando termine animación, bajamos el telón
  setTimeout(() => {
    curtainContainer.style.zIndex = "-1";
    curtainContainer.style.pointerEvents = "none";
  }, 2200);

});

/* =====================================================
   INIT (INICIALIZACIÓN)
===================================================== */

/*
  Ejecutamos el contador inmediatamente
  y lo actualizamos cada 30 segundos.
*/

updateCountdown();

/*
  30.000 ms = 30 segundos.
  Puedes cambiarlo si quieres más precisión.
*/
setInterval(updateCountdown, 30000);

/*
  Asignamos el link generado al botón RSVP.
*/
rsvpBtn.href = buildWhatsappLink();