// ===== CẤU HÌNH =====
const FADE_MS = 500;     // Thời gian fade-in/out
const VISIBLE_MS = 1400; // Thời gian hiển thị mỗi câu (trừ câu cuối)
const GAP_MS = 150;      // Khoảng nghỉ giữa các câu

// ===== NỘI DUNG CÂU =====
const sentences = [
  "Chúc mừng nhé.",
  "Em đã vượt qua trò chơi.",
  "Sau đây là một cuốn sách do Jales viết.",
  "Anh ấy đến từ tương lai.",
  "Mời em đọc nhé."
];

document.addEventListener("DOMContentLoaded", () => {
  const lineEl = document.getElementById("line");
  const agreeBtn = document.getElementById("agreeBtn");
  let i = 0;

  const showNext = () => {
    if (i >= sentences.length) return;

    lineEl.textContent = sentences[i];

    // Trường hợp câu cuối cùng
    if (i === sentences.length - 1) {
      requestAnimationFrame(() => {
        lineEl.classList.add("show");
      });

      // Sau khi chữ cuối hiện ra -> hiện nút
      setTimeout(() => {
        agreeBtn.classList.add("show");
      }, FADE_MS);

      return;
    }

    // Các câu 1-4: hiện -> đợi -> ẩn -> chuyển câu
    requestAnimationFrame(() => {
      lineEl.classList.add("show");
    });

    setTimeout(() => {
      lineEl.classList.remove("show");

      setTimeout(() => {
        i++;
        showNext();
      }, FADE_MS + GAP_MS);
    }, VISIBLE_MS);
  };

  showNext();

  // Khi nhấn nút -> chuyển sang trang7.html
  agreeBtn.addEventListener("click", () => {
    window.location.href = "trang10.html";
  });
});
