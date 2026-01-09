const canvas = document.getElementById('work-image');

const ctx = canvas.getContext('2d');

let layers = [];
let selectedLayer = null;
let offsetX = 0;
let offsetY = 0;

// Desenhar camadas
function drawLayers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    layers.forEach(layer => {
    ctx.drawImage(
        layer.img,
        layer.x,
        layer.y,
        layer.originalWidth * layer.scale,
        layer.originalHeight * layer.scale
    );
});

}
// Pegar posição
function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
    };
}

// Selecionar camada
function startDrag(e) {
    const pos = getPos(e);
    for (let i = layers.length - 1; i >= 0; i--) {
        const layer = layers[i];
        if (pos.x >= layer.x && pos.x <= layer.x + layer.width &&
            pos.y >= layer.y && pos.y <= layer.y + layer.height) {
            selectedLayer = layer;
            e.preventDefault()
            offsetX = pos.x - layer.x;
            offsetY = pos.y - layer.y;
            isDragging = true;
            layers.push(layer);
            break;
        }
    }
}

// Arrastar camada
function drag(e) {
    if (!isDragging || !selectedLayer || (e.touches && e.touches.length === 2)) return;
    e.preventDefault();
    const pos = getPos(e);
    selectedLayer.x = pos.x - offsetX;
    selectedLayer.y = pos.y - offsetY;
    drawLayers();
}

// Soltar camada
function endDrag() {
    selectedLayer = null;
}

// Eventos
['mousedown', 'touchstart'].forEach(evt => canvas.addEventListener(evt, startDrag));

['mousemove', 'touchmove'].forEach(evt => canvas.addEventListener(evt, drag));

['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(evt => canvas.addEventListener(evt, endDrag));