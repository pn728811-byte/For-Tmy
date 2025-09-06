const text = "Dành cho em";
const text2 = "Duy nhất riêng em, Trà My"; // dòng chữ thứ 2
let index = 0;
let index2 = 0;

const typingElement = document.getElementById("typing");
const typingElement2 = document.getElementById("typing2");
const nextBtn = document.getElementById("nextBtn");

function type() {
    if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, 90);
    } else {
        setTimeout(type2, 500); // delay trước khi gõ dòng 2
    }
}

function type2() {
    if (index2 < text2.length) {
        typingElement2.textContent += text2.charAt(index2);
        index2++;
        setTimeout(type2, 90);
    } else {
        // Gõ xong dòng 2 thì hiện nút
        nextBtn.style.display = "block";
        setTimeout(() => {
            nextBtn.classList.add("show");
        }, 50);
    }
}

type();
















// 🌸 Tạo hiệu ứng hoa anh đào rơi
function createSakura() {
    const sakura = document.createElement("div");
    sakura.classList.add("sakura");
    sakura.textContent = "🌸";

    // Vị trí ngẫu nhiên trên ngang màn hình
    sakura.style.left = Math.random() * window.innerWidth + "px";

    // Tốc độ rơi (thời gian animation)
    const duration = 8 + Math.random() * 5; // 8-13s
    sakura.style.animationDuration = duration + "s";

    // Độ lệch ngang khi rơi
    sakura.style.setProperty("--x-move", (Math.random() * 200 - 100) + "px");

    document.body.appendChild(sakura);

    // Xóa sau khi rơi xong để tránh rác DOM
    setTimeout(() => {
        sakura.remove();
    }, duration * 1000);
}

// Tạo liên tục
setInterval(createSakura, 150);
