let countdownEl = document.getElementById("countdown");
let contentEl = document.getElementById("content");
let noBtn = document.getElementById("no");
let yesBtn = document.getElementById("yes");

let count = 3;

// Đếm ngược
let timer = setInterval(() => {
    countdownEl.textContent = count;
    count--;
    if (count < 0) {
        clearInterval(timer);
        countdownEl.style.display = "none";
        contentEl.classList.remove("hidden");
    }
}, 1000);

// Nút "Không" chạy trốn
noBtn.addEventListener("mouseenter", () => {
    let x = Math.floor(Math.random() * (window.innerWidth - noBtn.offsetWidth));
    let y = Math.floor(Math.random() * (window.innerHeight - noBtn.offsetHeight));
    noBtn.style.position = "absolute";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

// Nút "Có" chuyển trang
yesBtn.addEventListener("click", () => {
    window.location.href = "trang3.html"; // Đổi thành link bạn muốn
});
