const boxWorker = document.getElementById("box-work");

let startDistance = 0;
let startWidth = 0;
let startHeight = 0;

function distance(t1, t2) {
  const dx = t2.clientX - t1.clientX;
  const dy = t2.clientY - t1.clientY;
  return Math.hypot(dx, dy);
}

boxWorker.addEventListener("touchstart", e => {
  if (e.touches.length === 2) {
    startDistance = distance(e.touches[0], e.touches[1]);
    startWidth = boxWorker.offsetWidth;
    startHeight = boxWorker.offsetHeight;
  }
});

boxWorker.addEventListener("touchmove", e => {
  if (e.touches.length === 2) {
    e.preventDefault();

    const currentDistance = distance(e.touches[0], e.touches[1]);
    const factor = currentDistance / startDistance;

    let newWidth = startWidth * factor;
    let newHeight = startHeight * factor;
    
    boxWorker.style.width = newWidth + "px";
    boxWorker.style.height = newHeight + "px";
  }
});