const line1Text = "Hihi Mình biết như thế mà.";
const line2Text = "Mình cũng thích bạn nhiều lắm!";
const line3Text = "Bây giờ chúng ta sẽ chơi 1 trò chơi nhé!";
const line4Text = "Let's go";

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.createElement("h1");
const line4 = document.createElement("h1");
const transitionGif = document.getElementById("transitionGif");

// Thêm line3 và line4 vào container
document.querySelector(".container").appendChild(line3);
document.querySelector(".container").appendChild(line4);

// Ẩn line3 và line4 ban đầu
line3.style.display = "none";
line4.style.display = "none";

// Thêm style cho line3 và line4 (giống line1, line2)
line3.id = "line3";
line4.id = "line4";

// Thời gian chạy của GIF (ms)
const gifDuration = 2000; // 2 giây

function typeWriter(element, text, delay, callback) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, delay);
        } else if (callback) {
            callback();
        }
    }
    typing();
}

typeWriter(line1, line1Text, 80, () => {
    line1.classList.add("fade-in"); // hiệu ứng fade in cho line1
    setTimeout(() => {
        typeWriter(line2, line2Text, 80, () => {
            line2.classList.add("fade-in"); // hiệu ứng fade in cho line2

            setTimeout(() => {
                line1.classList.add("fade-out"); // fade out line1
                line2.classList.add("fade-out"); // fade out line2

                setTimeout(() => {
                    line1.style.display = "none";
                    line2.style.display = "none";

                    // Hiện line3
                    line3.style.display = "block";
                    typeWriter(line3, line3Text, 80, () => {
                        line3.classList.add("fade-in"); // fade in line3

                        setTimeout(() => {
                            line4.style.display = "block";
                            typeWriter(line4, line4Text, 80, () => {
                                line4.classList.add("fade-in"); // fade in line4

                                // Sau khi hiện xong 2 câu cuối → show GIF
                                setTimeout(() => {
                                    line3.classList.add("fade-out");
                                    line4.classList.add("fade-out");

                                    setTimeout(() => {
                                        line3.style.display = "none";
                                        line4.style.display = "none";
                                        transitionGif.style.display = "block";
                                        setTimeout(() => {
                                            window.location.href = "trang4.html";
                                        }, gifDuration);
                                    }, 1200); // chờ fade out xong
                                }, 2000);
                            });
                        }, 500);
                    });
                }, 1200); // chờ fade out xong
            }, 1000);
        });
    }, 500);
});
