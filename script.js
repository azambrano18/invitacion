const el = document.getElementById("countdown");
const targetISO = el.dataset.iso;
const dEl = document.getElementById("d");
const hEl = document.getElementById("h");
const mEl = document.getElementById("m");
const sEl = document.getElementById("s");

function pad(n){ return String(n).padStart(2,"0"); }

function tick(){
  const now = new Date();
  const target = new Date(targetISO);
  let diff = target - now;

  if(diff < 0) diff = 0;

  const sec = Math.floor(diff/1000);
  const days = Math.floor(sec / 86400);
  const hrs  = Math.floor((sec % 86400) / 3600);
  const min  = Math.floor((sec % 3600) / 60);
  const s    = sec % 60;

  dEl.textContent = days;
  hEl.textContent = pad(hrs);
  mEl.textContent = pad(min);
  sEl.textContent = pad(s);
}
setInterval(tick, 250);
tick();

// Confetti ultra liviano
const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");
function resize(){
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
}
resize();
window.addEventListener("resize", ()=>location.reload());

let parts = [];
function burst(){
  const w = window.innerWidth, h = window.innerHeight;
  const x = w * 0.5, y = h * 0.2;
  for(let i=0;i<120;i++){
    parts.push({
      x, y,
      vx: (Math.random()*2-1)*6,
      vy: (Math.random()*2-1)*8 - 6,
      g: 0.25 + Math.random()*0.18,
      r: 3 + Math.random()*4,
      a: 1
    });
  }
}
function step(){
  ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
  parts = parts.filter(p=>p.a>0.02);
  for(const p of parts){
    p.vy += p.g;
    p.x += p.vx;
    p.y += p.vy;
    p.a *= 0.985;

    // sin colores fijos "duros": usamos un degradado suave por partícula
    const grad = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*3);
    grad.addColorStop(0, "rgba(255,255,255,0.9)");
    grad.addColorStop(1, `rgba(243,166,166,${p.a})`);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  }
  requestAnimationFrame(step);
}
step();

document.getElementById("confetti").addEventListener("click", burst);
