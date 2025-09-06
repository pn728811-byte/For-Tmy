

// // Canvas + context
// const canvas = document.getElementById('gameCanvas');
// const ctx = canvas.getContext('2d');
// const W = canvas.width, H = canvas.height;

// // Overlay elements
// const overlay = document.getElementById('overlay');
// const overlayTitle = document.getElementById('overlayTitle');
// const retryBtn = document.getElementById('retryBtn');
// const homeBtn = document.getElementById('homeBtn');
// const nextBtn = document.getElementById('nextBtn');
// const info = document.getElementById('info');

// // GAME STATE
// let running = false;
// let score = 0;
// let speed = 7.0;        // tốc độ ban đầu (yêu cầu: hơi nhanh)
// const maxSpeed = 14.0; // tốc độ tối đa
// const speedIncrement = 0.5; // tăng speed sau một số điểm
// let spawnInterval = 1400;  // ms giữa các chướng ngại (sẽ giảm dần)
// const minSpawn = 800;
// let lastSpawnTime = 0;
// let lastTime = 0;
// let obstacles = [];
// let animationId = null;

// // KITTY PHYSICS
// const gravity = 0.75;
// const jumpPower = -13.5;
// const groundY = H - 50; // y của mặt đất
// const kitty = {
//   x: 90,
//   y: groundY - 44, // top-left y
//   vy: 0,
//   w: 40,
//   h: 44,
//   onGround: true
// };

// // CONTROL: nhảy với Space/ArrowUp hoặc click/tap
// window.addEventListener('keydown', (e) => {
//   if ((e.code === 'Space' || e.code === 'ArrowUp')) {
//     e.preventDefault();
//     jump();
//   }
// });
// canvas.addEventListener('mousedown', jump);
// canvas.addEventListener('touchstart', (e)=>{
//   e.preventDefault();
//   jump();
// });

// // Reset / start game
// function resetGame(){
//   score = 0;
//   speed = 7.0;
//   spawnInterval = 1400;
//   lastSpawnTime = 0;
//   obstacles = [];
//   kitty.y = groundY - kitty.h;
//   kitty.vy = 0;
//   kitty.onGround = true;
//   running = true;
//   overlay.classList.add('hidden');
//   lastTime = performance.now();
//   if(animationId) cancelAnimationFrame(animationId);
//   animationId = requestAnimationFrame(loop);
// }

// // End game (win==true -> thắng, else thua)
// function endGame(win){
//   running = false;
//   if(animationId) cancelAnimationFrame(animationId);
//   overlayTitle.textContent = win ? '🎉 Bạn đã qua màn!' : '💔 Bạn đã thua!';
//   info.textContent = `Điểm: ${score}`;
//   nextBtn.classList.toggle('hidden', !win);
//   overlay.classList.remove('hidden');
// }

// // Overlay buttons
// retryBtn.onclick = () => resetGame();
// homeBtn.onclick = () => window.location.href = 'trang4.html';
// nextBtn.onclick = () => alert('Đang chuyển màn tiếp theo (bạn có thể thay đường dẫn).');

// // Jump logic
// function jump(){
//   if (!running) return;
//   if (kitty.onGround){
//     kitty.vy = jumpPower;
//     kitty.onGround = false;
//   }
// }

// // SPAWN obstacle
// function spawnObstacle(){
//   // tảng đá nhỏ pixel
//   const size = (Math.random() < 0.5) ? 26 : 40; // đôi lúc đá to hơn
//   const obs = {
//     x: W + 20,
//     y: groundY - size + 4, // cho ôm sát ground
//     w: size,
//     h: size,
//     passed: false,
//     pixelPattern: makeRockPattern(size)
//   };
//   obstacles.push(obs);
// }

// // Helper: create a small rock pixel pattern (array of rows)
// function makeRockPattern(size){
//   // Return simple pattern based on size; each cell is color string or null
//   // We'll create grid cellSize px blocks to draw "pixel" feel.
//   const cells = Math.floor(size / 6); // number of blocks per side
//   const pattern = [];
//   for (let r=0;r<cells;r++){
//     const row = [];
//     for (let c=0;c<cells;c++){
//       // random hole to make shape
//       const rand = Math.random();
//       if (rand > 0.25) row.push('#777'); else row.push(null);
//     }
//     pattern.push(row);
//   }
//   return pattern;
// }

// // DRAW KITTY (pixel-like using rectangles)
// // We'll draw a simple, recognizable Hello Kitty-ish face with bow using blocks.
// function drawKitty(x,y){
//   const P = 3; // pixel block size small -> sharper pixel-art
//   // head (white block with black border)
//   ctx.fillStyle = '#fff';
//   ctx.fillRect(x, y, 40, 28);
//   // outline (thin)
//   ctx.strokeStyle = '#000';
//   ctx.lineWidth = 2;
//   roundRect(ctx, x, y, 40, 28, 4);
//   ctx.stroke();

//   // eyes (black small squares)
//   ctx.fillStyle = '#000';
//   ctx.fillRect(x+10, y+10, 4, 6);
//   ctx.fillRect(x+26, y+10, 4, 6);

//   // nose (yellow small)
//   ctx.fillStyle = '#f2c94c';
//   ctx.fillRect(x+18, y+14, 6, 4);

//   // cheeks (pink)
//   ctx.fillStyle = '#f4b6c2';
//   ctx.fillRect(x+6, y+16, 5, 3);
//   ctx.fillRect(x+29, y+16, 5, 3);

//   // whiskers (lines)
//   ctx.strokeStyle = '#000';
//   ctx.lineWidth = 2;
//   ctx.beginPath();
//   ctx.moveTo(x+3, y+13); ctx.lineTo(x+12, y+13);
//   ctx.moveTo(x+28, y+13); ctx.lineTo(x+37, y+13);
//   ctx.stroke();

//   // bow (red) on top-left
//   // left lobe
//   ctx.fillStyle = '#e33';
//   ctx.fillRect(x+2, y-6, 10, 8);
//   ctx.strokeStyle = '#000';
//   ctx.strokeRect(x+2, y-6, 10, 8);
//   // center circle
//   ctx.fillStyle = '#ffcc2b';
//   ctx.fillRect(x+11, y-3, 6, 6);
//   ctx.strokeRect(x+11, y-3, 6, 6);
//   // right lobe
//   ctx.fillStyle = '#e33';
//   ctx.fillRect(x+16, y-6, 10, 8);
//   ctx.strokeRect(x+16, y-6, 10, 8);

//   // small body (overalls) under head
//   ctx.fillStyle = '#2f77d6';
//   ctx.fillRect(x+6, y+28, 28, 14);
//   ctx.strokeStyle = '#000';
//   ctx.strokeRect(x+6, y+28, 28, 14);
//   // straps
//   ctx.fillStyle = '#ffe066';
//   ctx.fillRect(x+9, y+24, 6, 6);
//   ctx.fillRect(x+25, y+24, 6, 6);
// }

// // Draw rock pixel-style
// function drawRock(obs){
//   const {x,y,w,h, pixelPattern} = obs;
//   // background irregular outline
//   ctx.fillStyle = '#555';
//   ctx.fillRect(x, y, w, h);

//   // draw pixel pattern on top (grid)
//   const rows = pixelPattern.length;
//   const cols = pixelPattern[0].length;
//   const cellW = Math.max(4, Math.floor(w / cols));
//   const cellH = Math.max(4, Math.floor(h / rows));
//   for (let r=0;r<rows;r++){
//     for (let c=0;c<cols;c++){
//       const color = pixelPattern[r][c];
//       if (color){
//         ctx.fillStyle = color;
//         ctx.fillRect(x + c*cellW, y + r*cellH, cellW, cellH);
//         // thin border for pixel look
//         ctx.strokeStyle = '#2b2b2b';
//         ctx.lineWidth = 1;
//         ctx.strokeRect(x + c*cellW, y + r*cellH, cellW, cellH);
//       }
//     }
//   }
// }

// // utility: rounded rect (for kitty outline)
// function roundRect(ctx, x, y, w, h, r){
//   ctx.beginPath();
//   ctx.moveTo(x+r, y);
//   ctx.arcTo(x+w, y, x+w, y+h, r);
//   ctx.arcTo(x+w, y+h, x, y+h, r);
//   ctx.arcTo(x, y+h, x, y, r);
//   ctx.arcTo(x, y, x+w, y, r);
//   ctx.closePath();
// }

// // MAIN LOOP
// function loop(now){
//   if (!lastTime) lastTime = now;
//   const dt = now - lastTime;
//   lastTime = now;

//   // Clear
//   ctx.clearRect(0,0,W,H);

//   // Draw ground
//   ctx.fillStyle = '#f3e8ef';
//   ctx.fillRect(0, groundY, W, H - groundY);
//   // road stripe (dashed style)
//   ctx.fillStyle = '#e6ccd9';
//   for (let i=0;i<W;i+=40){
//     ctx.fillRect(i, groundY + 18, 24, 6);
//   }

//   // update kitty physics
//   kitty.vy += gravity;
//   kitty.y += kitty.vy;
//   if (kitty.y >= groundY - kitty.h){
//     kitty.y = groundY - kitty.h;
//     kitty.vy = 0;
//     kitty.onGround = true;
//   } else {
//     kitty.onGround = false;
//   }

//   // spawn obstacles by time
//   if (now - lastSpawnTime > spawnInterval){
//     spawnObstacle();
//     lastSpawnTime = now;
//     // slightly reduce spawnInterval (harder) but never below minSpawn
//     spawnInterval = Math.max(minSpawn, spawnInterval - 12);
//   }

//   // update obstacles
//   for (let i = obstacles.length - 1; i >= 0; i--){
//     const obs = obstacles[i];
//     // movement scaled by dt for smoothness
//     const deltaPx = speed * (dt/16);
//     obs.x -= deltaPx;

//     // draw rock
//     drawRock(obs);

//     // collision check (AABB)
//     const kittyBox = {left: kitty.x, top: kitty.y, right: kitty.x + kitty.w, bottom: kitty.y + kitty.h};
//     const obsBox = {left: obs.x, top: obs.y, right: obs.x + obs.w, bottom: obs.y + obs.h};
//     if (rectsIntersect(kittyBox, obsBox)){
//       // collision -> lose
//       endGame(false);
//       return;
//     }

//     // passed obstacle?
//     if (!obs.passed && obs.x + obs.w < kitty.x){
//       obs.passed = true;
//       score++;
//       // every 5 điểm tăng speed 1 (cho cảm giác khó dần)
//       if (score % 5 === 0 && speed < maxSpeed){
//         speed += speedIncrement;
//       }
//       // win condition
//       if (score >= 25){
//         endGame(true);
//         return;
//       }
//     }

//     // remove off-screen
//     if (obs.x + obs.w < -50){
//       obstacles.splice(i,1);
//     }
//   }

//   // Draw kitty
//   drawKitty(kitty.x, Math.round(kitty.y));

//   // HUD: score + speed
//   ctx.fillStyle = '#222';
//   ctx.font = '16px sans-serif';
//   ctx.fillText(`Score: ${score}`, 12, 22);
//   ctx.fillText(`Speed: ${speed.toFixed(1)}`, 12, 42);

//   if (running) animationId = requestAnimationFrame(loop);
// }

// // simple rectangle intersection
// function rectsIntersect(a,b){
//   return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
// }

// // Start the game
// function start(){
//   score = 0;
//   obstacles = [];
//   lastSpawnTime = 0;
//   lastTime = 0;
//   spawnInterval = 1400;
//   speed = 7.0; // initial slightly faster as you asked
//   running = true;
//   overlay.classList.add('hidden');
//   animationId = requestAnimationFrame(loop);
// }
// start(); // auto start on load




// // Restart behaviour: remove overlay and reset state
// retryBtn.addEventListener('click', ()=>{
//   overlay.classList.add('hidden');
//   // reset variables
//   score = 0;
//   obstacles = [];
//   kitty.y = groundY - kitty.h;
//   kitty.vy = 0;
//   spawnInterval = 1400;
//   speed = 7.0;
//   lastSpawnTime = performance.now();
//   lastTime = performance.now();
//   running = true;
//   animationId = requestAnimationFrame(loop);
// });

// // home button handled above (redirect to trang4.html)

// // Utility: allow jump while playing after overlay removed
// canvas.addEventListener('click', ()=>{
//   if (!running && overlay.classList.contains('hidden')) { start(); }
// });

// // Allow mobile tap to jump (already touchstart added above)

// // END





















// Canvas + context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;

// Overlay elements
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const retryBtn = document.getElementById('retryBtn');
const homeBtn = document.getElementById('homeBtn');
const nextBtn = document.getElementById('nextBtn');
const info = document.getElementById('info');

// --- Ensure overlay is hidden immediately (avoid flash on load) ---
overlay.classList.add('hidden');

// GAME STATE
let running = false;
let score = 0;
let speed = 7.0;
const maxSpeed = 14.0;
const speedIncrement = 0.5;
let spawnInterval = 1400;
const minSpawn = 800;
let lastSpawnTime = 0;
let lastTime = 0;
let obstacles = [];
let animationId = null;

// KITTY PHYSICS
const gravity = 0.75;
const jumpPower = -13.5;
const groundY = H - 50;
const kitty = {
  x: 90,
  y: groundY - 44,
  vy: 0,
  w: 40,
  h: 44,
  onGround: true
};

// CONTROL: nhảy với Space/ArrowUp hoặc click/tap
window.addEventListener('keydown', (e) => {
  if ((e.code === 'Space' || e.code === 'ArrowUp')) {
    e.preventDefault();
    jump();
  }
});
// Jump via mouse/touch on canvas — **only jump**, NOT restart
canvas.addEventListener('mousedown', (e) => {
  // do not trigger when overlay is visible
  if (overlay.classList.contains('hidden')) jump();
});
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  if (overlay.classList.contains('hidden')) jump();
}, {passive:false});

function jump(){
  if (!running) return;
  if (kitty.onGround){
    kitty.vy = jumpPower;
    kitty.onGround = false;
  }
}

// SPAWN obstacle
function spawnObstacle(){
  const size = (Math.random() < 0.5) ? 26 : 40;
  const obs = {
    x: W + 20,
    y: groundY - size + 4,
    w: size,
    h: size,
    passed: false,
    pixelPattern: makeRockPattern(size)
  };
  obstacles.push(obs);
}

function makeRockPattern(size){
  const cells = Math.max(2, Math.floor(size / 6));
  const pattern = [];
  for (let r=0;r<cells;r++){
    const row = [];
    for (let c=0;c<cells;c++){
      row.push(Math.random() > 0.25 ? '#777' : null);
    }
    pattern.push(row);
  }
  return pattern;
}

// DRAW KITTY
function drawKitty(x,y){
  ctx.fillStyle = '#fff';
  ctx.fillRect(x, y, 40, 28);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  roundRect(ctx, x, y, 40, 28, 4);
  ctx.stroke();

  ctx.fillStyle = '#000';
  ctx.fillRect(x+10, y+10, 4, 6);
  ctx.fillRect(x+26, y+10, 4, 6);

  ctx.fillStyle = '#f2c94c';
  ctx.fillRect(x+18, y+14, 6, 4);

  ctx.fillStyle = '#f4b6c2';
  ctx.fillRect(x+6, y+16, 5, 3);
  ctx.fillRect(x+29, y+16, 5, 3);

  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x+3, y+13); ctx.lineTo(x+12, y+13);
  ctx.moveTo(x+28, y+13); ctx.lineTo(x+37, y+13);
  ctx.stroke();

  // bow
  ctx.fillStyle = '#e33';
  ctx.fillRect(x+2, y-6, 10, 8);
  ctx.strokeStyle = '#000';
  ctx.strokeRect(x+2, y-6, 10, 8);
  ctx.fillStyle = '#ffcc2b';
  ctx.fillRect(x+11, y-3, 6, 6);
  ctx.strokeRect(x+11, y-3, 6, 6);
  ctx.fillStyle = '#e33';
  ctx.fillRect(x+16, y-6, 10, 8);
  ctx.strokeRect(x+16, y-6, 10, 8);

  // body
  ctx.fillStyle = '#2f77d6';
  ctx.fillRect(x+6, y+28, 28, 14);
  ctx.strokeStyle = '#000';
  ctx.strokeRect(x+6, y+28, 28, 14);
  ctx.fillStyle = '#ffe066';
  ctx.fillRect(x+9, y+24, 6, 6);
  ctx.fillRect(x+25, y+24, 6, 6);
}

function drawRock(obs){
  const {x,y,w,h, pixelPattern} = obs;
  ctx.fillStyle = '#555';
  ctx.fillRect(x, y, w, h);
  const rows = pixelPattern.length;
  const cols = pixelPattern[0].length;
  const cellW = Math.max(4, Math.floor(w / cols));
  const cellH = Math.max(4, Math.floor(h / rows));
  for (let r=0;r<rows;r++){
    for (let c=0;c<cols;c++){
      const color = pixelPattern[r][c];
      if (color){
        ctx.fillStyle = color;
        ctx.fillRect(x + c*cellW, y + r*cellH, cellW, cellH);
        ctx.strokeStyle = '#2b2b2b';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + c*cellW, y + r*cellH, cellW, cellH);
      }
    }
  }
}

function roundRect(ctx, x, y, w, h, r){
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.arcTo(x+w, y, x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x, y+h, r);
  ctx.arcTo(x, y+h, x, y, r);
  ctx.arcTo(x, y, x+w, y, r);
  ctx.closePath();
}

// MAIN LOOP
function loop(now){
  if (!lastTime) lastTime = now;
  const dt = now - lastTime;
  lastTime = now;

  ctx.clearRect(0,0,W,H);

  // Draw ground
  ctx.fillStyle = '#f3e8ef';
  ctx.fillRect(0, groundY, W, H - groundY);
  ctx.fillStyle = '#e6ccd9';
  for (let i=0;i<W;i+=40){
    ctx.fillRect(i, groundY + 18, 24, 6);
  }

  // physics
  kitty.vy += gravity;
  kitty.y += kitty.vy;
  if (kitty.y >= groundY - kitty.h){
    kitty.y = groundY - kitty.h;
    kitty.vy = 0;
    kitty.onGround = true;
  } else {
    kitty.onGround = false;
  }

  // spawn obstacles by time
  if (now - lastSpawnTime > spawnInterval){
    spawnObstacle();
    lastSpawnTime = now;
    spawnInterval = Math.max(minSpawn, spawnInterval - 12);
  }

  // update obstacles
  for (let i = obstacles.length - 1; i >= 0; i--){
    const obs = obstacles[i];
    const deltaPx = speed * (dt/16);
    obs.x -= deltaPx;
    drawRock(obs);

    const kittyBox = {left: kitty.x, top: kitty.y, right: kitty.x + kitty.w, bottom: kitty.y + kitty.h};
    const obsBox = {left: obs.x, top: obs.y, right: obs.x + obs.w, bottom: obs.y + obs.h};
    if (rectsIntersect(kittyBox, obsBox)){
      endGame(false);
      return;
    }

    if (!obs.passed && obs.x + obs.w < kitty.x){
      obs.passed = true;
      score++;
      if (score % 5 === 0 && speed < maxSpeed) speed += speedIncrement;
      if (score >= 25){ endGame(true); return; }
    }

    if (obs.x + obs.w < -50) obstacles.splice(i,1);
  }

  drawKitty(kitty.x, Math.round(kitty.y));

  // HUD
  ctx.fillStyle = '#222';
  ctx.font = '16px sans-serif';
  ctx.fillText(`Score: ${score}`, 12, 22);
  ctx.fillText(`Speed: ${speed.toFixed(1)}`, 12, 42);

  if (running) animationId = requestAnimationFrame(loop);
}

function rectsIntersect(a,b){
  return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
}

// START / RESET GAME
function startGame(){
  // reset variables
  score = 0;
  obstacles = [];
  lastSpawnTime = performance.now();
  lastTime = performance.now();
  spawnInterval = 1400;
  speed = 7.0;
  kitty.y = groundY - kitty.h;
  kitty.vy = 0;
  kitty.onGround = true;

  // hide overlay (important)
  overlay.classList.add('hidden');

  // start loop
  running = true;
  if (animationId) cancelAnimationFrame(animationId);
  animationId = requestAnimationFrame(loop);
}

// SHOW overlay (only called from endGame)
function showOverlay(win=false){
  running = false;
  overlayTitle.textContent = win ? '🎉 Bạn đã qua màn!' : '💔 Bạn đã thua!';
  info.textContent = `Điểm: ${score}`;
  nextBtn.classList.toggle('hidden', !win);
  overlay.classList.remove('hidden');
  if (animationId) cancelAnimationFrame(animationId);
}

// END GAME
function endGame(win){
  showOverlay(win);
}

// Button listeners
retryBtn.addEventListener('click', () => {
  startGame();
});
homeBtn.addEventListener('click', () => {
  window.location.href = 'trang4.html';
});

// nextBtn.addEventListener('click', () => {
//   alert('Đang chuyển màn tiếp theo (bạn có thể thay đường dẫn).');
// });

nextBtn.addEventListener('click', () => {
  window.location.href = 'trang7.html';
});

// Auto-start when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startGame);
} else {
  // already loaded
  startGame();
}
