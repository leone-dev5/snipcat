const boxWorkers = document.getElementById("box-work");

// ===== Variáveis globais =====
let isDragging = false;
let isPinching = false;


// Limites de tamanho
const MIN_WIDTH = 100;
const MIN_HEIGHT = 100;
const MAX_WIDTH = 2000;
const MAX_HEIGHT = 2000;

// ===== Utilitário =====
function getDistance(t1, t2) {
  const dx = t2.clientX - t1.clientX;
  const dy = t2.clientY - t1.clientY;
  return Math.hypot(dx, dy);
}

// ===== MOUSE EVENTS =====
boxWorkers.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - boxWorkers.offsetLeft;
  offsetY = e.clientY - boxWorkers.offsetTop;
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || isPinching) return;

  boxWorkers.style.left = (e.clientX - offsetX) + 'px';
  boxWorkers.style.top = (e.clientY - offsetY) + 'px';
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

// ===== TOUCH EVENTS =====
boxWorkers.addEventListener('touchstart', (e) => {

  if (e.touches.length === 1) {
    // 1 dedo → drag
    isDragging = true;
    isPinching = false;
    const touch = e.touches[0];
    offsetX = touch.clientX - boxWorkers.offsetLeft;
    offsetY = touch.clientY - boxWorkers.offsetTop;
  }

  if (e.touches.length === 2) {
    // 2 dedos → zoom
    isDragging = false;
    isPinching = true;

    startDistance = getDistance(e.touches[0], e.touches[1]);
    startWidth = boxWorkers.offsetWidth;
    startHeight = boxWorkers.offsetHeight;
  }

}, { passive: false });

boxWorkers.addEventListener('touchmove', (e) => {

  if (isPinching && e.touches.length === 2) {
    e.preventDefault();

    const currentDistance = getDistance(e.touches[0], e.touches[1]);
    const factor = currentDistance / startDistance;

    let newWidth = startWidth * factor;
    let newHeight = startHeight * factor;

    // Limites
    newWidth = Math.max(MIN_WIDTH, Math.min(newWidth, MAX_WIDTH));
    newHeight = Math.max(MIN_HEIGHT, Math.min(newHeight, MAX_HEIGHT));

    boxWorkers.style.width = newWidth + "px";
    boxWorkers.style.height = newHeight + "px";

    return;
  }

  if (isDragging && e.touches.length === 1) {
    e.preventDefault();
    const touch = e.touches[0];
    boxWorkers.style.left = (touch.clientX - offsetX) + "px";
    boxWorkers.style.top = (touch.clientY - offsetY) + "px";
  }

}, { passive: false });

boxWorkers.addEventListener('touchend', (e) => {
  if (e.touches.length === 0) {
    isDragging = false;
    isPinching = false;
  }
});