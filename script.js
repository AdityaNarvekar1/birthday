let clickCount = 0;

const giftBox = document.getElementById("giftBox");
const wishContainer = document.getElementById("wish-container");

// Gift box click behavior
giftBox.addEventListener("click", () => {
  clickCount++;

  giftBox.classList.add("bounce");
  setTimeout(() => giftBox.classList.remove("bounce"), 600);

  const lid = document.querySelector(".lid");
  lid.style.transform = "rotate(-10deg)";
  setTimeout(() => lid.style.transform = "rotate(0deg)", 300);

  if (clickCount === 2) {
    explodeGift();
  }
});

function explodeGift() {
  confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 } });

  const lid = document.querySelector(".lid");
  lid.style.transition = "transform 0.6s ease-out";
  lid.style.transform = "translateY(-150px) rotate(45deg)";

  const box = document.querySelector(".box");
  box.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";
  box.style.transform = "scale(0)";
  box.style.opacity = "0";

  setTimeout(() => {
    giftBox.style.display = "none";
    showBirthdayPage();
  }, 900);
}

function showBirthdayPage() {
  wishContainer.style.display = "block";
  window.scrollTo({ top: 0 });

  // Music (optional)
  const audio = new Audio('birthday.mp3');
  audio.play();

  // Confetti rain
  const duration = 8 * 1000;
  const end = Date.now() + duration;
  (function frame() {
    confetti({ particleCount: 8, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 8, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  // Slideshow
  let slides = document.querySelectorAll(".slide");
  let index = 0;
  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 2500);

  // Typewriter animation line by line
  const lines = document.querySelectorAll('#wishMessage span');
  let lineIndex = 0;

  function typeLine(line) {
    const text = line.textContent;
    line.textContent = "";
    line.style.opacity = 1;
    let i = 0;
    const interval = setInterval(() => {
      line.textContent += text.charAt(i);
      i++;
      if (i === text.length) {
        clearInterval(interval);
        line.style.borderRight = "none";
        lineIndex++;
        if (lineIndex < lines.length) {
          setTimeout(() => typeLine(lines[lineIndex]), 700);
        }
      }
    }, 60);
  }
  typeLine(lines[lineIndex]);

  // Sparkles
  const container = document.getElementById("wish-container");
  for (let i = 0; i < 15; i++) {
    const s = document.createElement("div");
    s.classList.add("sparkle");
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.animationDelay = (Math.random() * 2) + "s";
    container.appendChild(s);
  }
}
