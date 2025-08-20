// const line1Text = "Hihi Mình biết như thế mà.";
// const line2Text = "Mình cũng thích bạn nhiều lắm!";
// const line1 = document.getElementById("line1");
// const line2 = document.getElementById("line2");
// const flash = document.getElementById("flash");

// function typeWriter(element, text, delay, callback) {
//     let i = 0;
//     function typing() {
//         if (i < text.length) {
//             element.textContent += text.charAt(i);
//             i++;
//             setTimeout(typing, delay);
//         } else if (callback) {
//             callback();
//         }
//     }
//     typing();
// }

// typeWriter(line1, line1Text, 80, () => {
//     setTimeout(() => {
//         typeWriter(line2, line2Text, 80, () => {
//             setTimeout(() => {
//                 flash.classList.add("active");
//                 line1.style.display = "none";
//                 line2.style.display = "none";
//                 setTimeout(() => {
//                     window.location.href = "trang4.html"; 
//                 }, 1000);
//             }, 4000);
//         });
//     }, 500);
// });










// const line1Text = "Hihi Mình biết như thế mà.";
// const line2Text = "Mình cũng thích cậu nhiều lắm!";
// const line1 = document.getElementById("line1");
// const line2 = document.getElementById("line2");
// const transitionGif = document.getElementById("transitionGif");

// function typeWriter(element, text, delay, callback) {
//     let i = 0;
//     function typing() {
//         if (i < text.length) {
//             element.textContent += text.charAt(i);
//             i++;
//             setTimeout(typing, delay);
//         } else if (callback) {
//             callback();
//         }
//     }
//     typing();
// }

// typeWriter(line1, line1Text, 80, () => {
//     setTimeout(() => {
//         typeWriter(line2, line2Text, 80, () => {
//             setTimeout(() => {
//                 // Ẩn chữ
//                 line1.style.display = "none";
//                 line2.style.display = "none";
//                 // Hiện GIF chuyển cảnh
//                 transitionGif.style.display = "block";

//                 // Sau khi GIF chạy xong thì sang trang4.html
//                 const gifDuration = 3000; // Thời gian chạy GIF (ms), chỉnh theo GIF thật
//                 setTimeout(() => {
//                     window.location.href = "trang4.html";
//                 }, gifDuration);

//             }, 1000);
//         });
//     }, 500);
// });






const line1Text = "Hihi Mình biết như thế mà.";
const line2Text = "Mình cũng thích bạn nhiều lắm!";
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const transitionGif = document.getElementById("transitionGif");

// Thời gian chạy của GIF (ms)
const gifDuration = 2000; // 4 giây

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
    setTimeout(() => {
        typeWriter(line2, line2Text, 80, () => {
            setTimeout(() => {
                // Ẩn chữ
                line1.style.display = "none";
                line2.style.display = "none";
                // Hiện GIF
                transitionGif.style.display = "block";

                // Chờ GIF chạy hết rồi mới chuyển trang
                setTimeout(() => {
                    window.location.href = "trang4.html";
                }, gifDuration);

            }, 1000);
        });
    }, 500);
});
