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
