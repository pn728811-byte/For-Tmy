// =================== TOP HALF: text + clovers ===================
const leafCanvas = document.getElementById("leafCanvas");
const leafCtx = leafCanvas.getContext("2d");

function resizeLeafCanvas() {
  leafCanvas.width = window.innerWidth;
  leafCanvas.height = window.innerHeight;
}
resizeLeafCanvas();
window.addEventListener("resize", resizeLeafCanvas);

// text swap
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
let toggle = true;
function switchText() {
  if (toggle) {
    line1.style.display = "block";
    line2.style.display = "none";
  } else {
    line1.style.display = "none";
    line2.style.display = "block";
  }
  toggle = !toggle;
}
switchText();
setInterval(switchText, 2000);

// Clover (lá 4 cánh)
class Clover {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * leafCanvas.width;
    this.y = -20 - Math.random() * 200;
    this.size = 15 + Math.random() * 20;
    this.speed = 1 + Math.random() * 2;
    this.swing = Math.random() * 1.5;
    this.angle = Math.random() * Math.PI * 2;
    this.rotation = Math.random() * Math.PI * 2;
  }
  update() {
    this.y += this.speed;
    this.x += Math.sin(this.angle) * this.swing;
    this.angle += 0.03;
    this.rotation += 0.01;
    if (this.y > leafCanvas.height + 30) this.reset();
  }
  draw() {
    const ctx = leafCtx;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    let grad = ctx.createRadialGradient(0, 0, this.size/8, 0, 0, this.size);
    grad.addColorStop(0, "#66bb6a");
    grad.addColorStop(1, "#2e7d32");
    ctx.fillStyle = grad;
    ctx.strokeStyle = "#1b5e20";
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.ellipse(0, this.size / 2, this.size / 2.5, this.size, i * Math.PI / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(0, this.size / 2);
    ctx.lineTo(0, this.size + 10);
    ctx.stroke();
    ctx.restore();
  }
}

const clovers = [];
for (let i = 0; i < 35; i++) clovers.push(new Clover());

function animateLeaves() {
  leafCtx.clearRect(0, 0, leafCanvas.width, leafCanvas.height);
  clovers.forEach(c => { c.update(); c.draw(); });
  requestAnimationFrame(animateLeaves);
}
animateLeaves();

// =================== AUTO SNAP SCROLL ===================
let autoScrolling = false;
window.addEventListener("wheel", (e) => {
  if (autoScrolling) return;
  autoScrolling = true;
  if (e.deltaY > 0 && window.scrollY < window.innerHeight / 2) {
    window.scrollTo({ top: window.innerHeight, behavior: "auto" });
  } else if (e.deltaY < 0 && window.scrollY >= window.innerHeight / 2) {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  setTimeout(() => autoScrolling = false, 200);
}, { passive: false });

// =================== BOTTOM HALF: countdown + fireworks + wishes ===================
const countdownBox = document.querySelector(".countdown");
const readyText = document.querySelector(".ready-text");
const countdownNum = document.getElementById("countdownNum");
const wishes = document.getElementById("wishes");

function showElement(el) { el.style.opacity = 1; }
function hideElement(el) { el.style.opacity = 0; }

// Sequence: show "Are you ready?" -> fade out -> countdown -> fireworks -> wishes
function startSequence() {
  readyText.style.display = "block";
  countdownNum.style.display = "none";
  showElement(countdownBox);

  setTimeout(() => {
    hideElement(countdownBox);
    setTimeout(() => {
      readyText.style.display = "none";
      countdownNum.style.display = "block";
      showElement(countdownBox);
      startCountdown();
    }, 900);
  }, 2500);
}

let countdown = 3;
function startCountdown() {
  countdown = 3;
  countdownNum.textContent = countdown;
  const interval = setInterval(() => {
    countdown--;
    if (countdown >= 0) {
      countdownNum.textContent = countdown;
    } else {
      clearInterval(interval);
      hideElement(countdownBox);
      setTimeout(() => {
        startFireworks();          
        showWishesSequence();
      }, 800);
    }
  }, 1000);
}

// ---------------- FIREWORKS ----------------
let fwCanvas = null;
let fwCtx = null;
let rockets = [];

function makeFwCanvas() {
  if (fwCanvas) return;
  fwCanvas = document.createElement("canvas");
  fwCanvas.style.position = "absolute";
  fwCanvas.style.top = 0;
  fwCanvas.style.left = 0;
  fwCanvas.style.width = "100%";
  fwCanvas.style.height = "100%";
  fwCanvas.style.zIndex = "0";
  document.querySelector(".bottom-half").appendChild(fwCanvas);

  const rect = fwCanvas.getBoundingClientRect();
  fwCanvas.width = Math.round(rect.width);
  fwCanvas.height = Math.round(rect.height);
  fwCtx = fwCanvas.getContext("2d");

  window.addEventListener("resize", () => {
    const r = fwCanvas.getBoundingClientRect();
    fwCanvas.width = Math.round(r.width);
    fwCanvas.height = Math.round(r.height);
  });
}

function createRocket() {
  return {
    x: Math.random() * fwCanvas.width,
    y: fwCanvas.height + 10,
    vy: - (6 + Math.random() * 4),
    exploded: false,
    fragments: [],
    color: `hsl(${Math.random() * 360},100%,60%)`
  };
}

function explode(rocket) {
  const count = 120;
  for (let i = 0; i < count; i++) {
    const ang = Math.random() * Math.PI * 2;
    const sp = Math.random() * 5 + 1.5;
    rocket.fragments.push({
      x: rocket.x,
      y: rocket.y,
      dx: Math.cos(ang) * sp,
      dy: Math.sin(ang) * sp,
      life: 60 + Math.random() * 40,
      color: `hsl(${Math.random() * 360},100%,60%)`,
      size: 1 + Math.random() * 3
    });
  }
}

function animateFireworks() {
  if (!fwCtx) return;
  requestAnimationFrame(animateFireworks);

  fwCtx.fillStyle = "rgba(0,0,0,0.18)";
  fwCtx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);

  if (Math.random() < 0.08) rockets.push(createRocket());

  for (let i = rockets.length - 1; i >= 0; i--) {
    const r = rockets[i];
    if (!r.exploded) {
      r.y += r.vy;
      fwCtx.beginPath();
      fwCtx.arc(r.x, r.y, 3, 0, Math.PI * 2);
      fwCtx.fillStyle = r.color;
      fwCtx.fill();
      if (r.y < fwCanvas.height * (0.2 + Math.random() * 0.15)) {
        r.exploded = true;
        explode(r);
      }
    } else {
      for (let j = r.fragments.length - 1; j >= 0; j--) {
        const p = r.fragments[j];
        p.x += p.dx;
        p.y += p.dy;
        p.dy += 0.06;
        p.life--;
        fwCtx.globalAlpha = Math.max(0, p.life / 100);
        fwCtx.beginPath();
        fwCtx.fillStyle = p.color;
        fwCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        fwCtx.fill();
        fwCtx.globalAlpha = 1;
        if (p.life <= 0) r.fragments.splice(j, 1);
      }
      if (r.fragments.length === 0) rockets.splice(i, 1);
    }
  }
}

function startFireworks() {
  makeFwCanvas();
  animateFireworks();
}

// ---------------- WISHES: sequence 10 dòng, lặp vô hạn ----------------
function showWishesSequence() {
  const messages = [
    "Chúc em luôn vui vẻ 🎉",
    "Mãi xinh đẹp 💖",
    "Thành công trong học tập 📚",
    "Luôn hạnh phúc 💕",
    "Thêm nhiều niềm vui mỗi ngày 😄",
    "Sức khỏe dồi dào 💪",
    "Luôn gặp may mắn 🍀",
    "Thành đạt trong công việc 🏆",
    "Luôn tươi cười mỗi sáng 🌞",
    "Những giấc mơ đều thành hiện thực ✨",
    "Hạnh phúc trọn vẹn ❤️",
    "Tình yêu luôn ngọt ngào 💌",
    "Ngày mới năng lượng tràn đầy ⚡",
    "Mọi việc thuận buồm xuôi gió ⛵",
    "Mọi khó khăn đều vượt qua 🌈",
    "Niềm vui lan tỏa khắp nơi 🌟",
    "Được yêu thương thật nhiều 💕",
    "Gia đình luôn hạnh phúc 👨‍👩‍👧‍👦",
    "Bạn bè luôn thân thiết 🤝",
    "Luôn tự tin và mạnh mẽ 💪",
    "Mỗi ngày đều là một bất ngờ 🎁",
    "Luôn giữ nụ cười tươi 😁",
    "Thành công nối tiếp thành công 🏅",
    "Được khám phá những điều mới 🌍",
    "Những điều tốt đẹp luôn đến 🌸",
    "Luôn vui vẻ và lạc quan 🌞",
    "Mọi ước mơ đều đạt được ✨",
    "Mọi ngày đều tràn đầy năng lượng ⚡",
    "Sống hạnh phúc và yêu đời 💖"
  ];

  const rowsOrder = [3,7,1,9,5,2,8,4,10,6];
  const rowCount = rowsOrder.length;

  const fullHeight = wishes.clientHeight;
  const paddingTop = 140;
  const availableHeight = fullHeight - paddingTop - 90;
  const rowHeight = availableHeight / rowCount;

  wishes.innerHTML = "";

  let index = 0;

  function createNextSpan() {
    const msg = messages[index % messages.length];
    const span = document.createElement("span");
    span.textContent = msg;
    span.style.position = "absolute";
    span.style.whiteSpace = "nowrap";
    span.style.left = "-100%";

    const rowNum = rowsOrder[index % rowsOrder.length];
    span.style.top = `${paddingTop + (rowNum - 1) * rowHeight}px`;

    span.style.animationName = "moveText";
    span.style.animationDuration = "12s";
    span.style.animationTimingFunction = "linear";
    span.style.animationIterationCount = "1";

    span.addEventListener("animationend", () => {
      if (span.parentNode) span.parentNode.removeChild(span);
    });

    wishes.appendChild(span);
    index++;
    setTimeout(createNextSpan, 1000);
  }

  createNextSpan();
}

// ---------------- START ON SCROLL ----------------
let sequenceStarted = false;
const bottomHalf = document.querySelector(".bottom-half");

function checkStartSequence() {
  const triggerPoint = bottomHalf.offsetTop - window.innerHeight / 2;
  if (!sequenceStarted && window.scrollY + window.innerHeight >= triggerPoint) {
    sequenceStarted = true;
    setTimeout(startSequence, 100); // delay nhỏ để bottom-half render
  }
}

// LẮNG NGHE scroll
window.addEventListener("scroll", checkStartSequence);

// KIỂM TRA NGAY KHI LOAD
window.addEventListener("load", () => {
  checkStartSequence();
});
