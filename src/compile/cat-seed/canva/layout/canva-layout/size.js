import { getEditorState, drawLayers } from '/src/core/editor-state.js';

let initialDistance = 0;
let initialSize = { width: 0, height: 0 };

const boxWorkers = document.getElementById("box-work");

if (boxWorkers) {
    boxWorkers.addEventListener('touchstart', (e) => {
        const state = getEditorState();
        if (!state || !state.selectedLayer || e.touches.length !== 2) return;
        
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        
        initialDistance = Math.hypot(dx, dy);
        
        const layer = state.selectedLayer;
        const layerWidth = layer.originalWidth * layer.scale;
        const layerHeight = layer.originalHeight * layer.scale;
        
        initialSize.width = layerWidth;
        initialSize.height = layerHeight;
    });
    
    boxWorkers.addEventListener('touchmove', (e) => {
        const state = getEditorState();
        if (!state || !state.selectedLayer || e.touches.length !== 2) return;
        
        e.preventDefault();
        
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        
        const distance = Math.hypot(dx, dy);
        const scale = distance / initialDistance;
        
        state.selectedLayer.scale = (initialSize.width / state.selectedLayer.originalWidth) * scale;
        
        drawLayers();
    });
}