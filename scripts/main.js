const header = document.querySelector("[data-header]");
const filters = document.querySelectorAll("[data-filter]");
const archiveItems = document.querySelectorAll("[data-kind]");
const canvas = document.querySelector("#noise-canvas");
const context = canvas?.getContext("2d", { alpha: true });
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let noiseTimer;

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 32);
};

const resizeCanvas = () => {
  if (!canvas) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
};

const drawNoise = () => {
  if (!canvas || !context) return;
  const { width, height } = canvas;
  const imageData = context.createImageData(width, height);
  const buffer = imageData.data;

  for (let i = 0; i < buffer.length; i += 4) {
    const value = Math.random() * 255;
    buffer[i] = value;
    buffer[i + 1] = value;
    buffer[i + 2] = value;
    buffer[i + 3] = Math.random() * 22;
  }

  context.putImageData(imageData, 0, 0);
};

const startNoise = () => {
  window.clearInterval(noiseTimer);

  if (reduceMotion.matches) {
    drawNoise();
    return;
  }

  drawNoise();
  noiseTimer = window.setInterval(drawNoise, 180);
};

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filters.forEach((item) => item.classList.toggle("active", item === button));
    archiveItems.forEach((item) => {
      item.classList.toggle("is-hidden", filter !== "all" && item.dataset.kind !== filter);
    });
  });
});

window.addEventListener("scroll", setHeaderState, { passive: true });
window.addEventListener("resize", () => {
  resizeCanvas();
  drawNoise();
});
reduceMotion.addEventListener("change", startNoise);

resizeCanvas();
setHeaderState();
startNoise();
