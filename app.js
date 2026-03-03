// ===== Icons =====
lucide.createIcons();

// ===== Year =====
document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());

// ===== Cursor =====
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;
let rx = mx, ry = my;

window.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  if (dot) dot.style.left = mx + "px", dot.style.top = my + "px";
});

(function cursorLoop(){
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  if (ring) ring.style.left = rx + "px", ring.style.top = ry + "px";
  requestAnimationFrame(cursorLoop);
})();

// ===== Magnetic buttons =====
document.querySelectorAll(".magnetic").forEach(btn => {
  btn.addEventListener("mousemove", (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});

// ===== Tilt cards =====
document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rotY = (px - 0.5) * 10;
    const rotX = -(py - 0.5) * 10;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)`;
  });
});

// ===== Reveal on scroll =====
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(ent=>{
    if(ent.isIntersecting){
      ent.target.classList.add("show");
    }
  });
},{threshold:0.18});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ===== Particles =====
const canvas = document.getElementById("fx");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let w, h, ps = [];

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    ps = Array.from({ length: Math.min(120, Math.floor(w / 14)) }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      a: 0.10 + Math.random() * 0.22
    }));
  }

  resize();
  window.addEventListener("resize", resize);

  (function draw(){
    ctx.clearRect(0, 0, w, h);
    for (const p of ps) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -30) p.x = w + 30;
      if (p.x > w + 30) p.x = -30;
      if (p.y < -30) p.y = h + 30;
      if (p.y > h + 30) p.y = -30;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.a})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  })();
}
const sections = document.querySelectorAll("section");
const navIcons = document.querySelectorAll(".nav-icon");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const top = window.scrollY;
    const offset = section.offsetTop - 200;
    const height = section.offsetHeight;

    if (top >= offset && top < offset + height) {
      current = section.getAttribute("id");
    }
  });

  navIcons.forEach(icon => {
    icon.classList.remove("active");
    if (icon.getAttribute("href") === "#" + current) {
      icon.classList.add("active");
    }
  });
});
document.querySelectorAll(".project-card").forEach(card=>{
  card.addEventListener("mousemove",(e)=>{
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", e.clientX - rect.left + "px");
    card.style.setProperty("--y", e.clientY - rect.top + "px");
  });
});