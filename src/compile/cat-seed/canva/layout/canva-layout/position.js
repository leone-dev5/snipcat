import { getEditorState, drawLayers, getCanvasPosition } from '/src/core/editor-state.js';
import { isToolActive, handleCanvasClick } from '/src/core/tool-manager.js';

function getPos(e) {
    return getCanvasPosition(e);
}

function startDrag(e) {
    const state = getEditorState();
    if (!state) return;
    
    if (state.activeTool) {
        handleCanvasClick(e);
        return;
    }
    
    const pos = getPos(e);
    if (!pos) return;
    
    for (let i = state.layers.length - 1; i >= 0; i--) {
        const layer = state.layers[i];
        const layerWidth = layer.originalWidth * layer.scale;
        const layerHeight = layer.originalHeight * layer.scale;
        
        if (pos.x >= layer.x && pos.x <= layer.x + layerWidth &&
            pos.y >= layer.y && pos.y <= layer.y + layerHeight) {
            state.selectedLayer = layer;
            e.preventDefault();
            state.offsetX = pos.x - layer.x;
            state.offsetY = pos.y - layer.y;
            state.isDragging = true;
            
            state.layers.splice(i, 1);
            state.layers.push(layer);
            break;
        }
    }
}

function drag(e) {
    const state = getEditorState();
    if (!state) return;
    
    if (!state.isDragging || !state.selectedLayer || (e.touches && e.touches.length === 2)) {
        return;
    }
    
    e.preventDefault();
    const pos = getPos(e);
    if (!pos) return;
    
    state.selectedLayer.x = pos.x - state.offsetX;
    state.selectedLayer.y = pos.y - state.offsetY;
    drawLayers();
}

function endDrag() {
    const state = getEditorState();
    if (!state) return;
    
    state.selectedLayer = null;
    state.isDragging = false;
}

function initPositionEvents() {
    const state = getEditorState();
    if (!state || !state.canvas) {
        setTimeout(initPositionEvents, 50);
        return;
    }
    
    const canvas = state.canvas;
    
    ['mousedown', 'touchstart'].forEach(evt => canvas.addEventListener(evt, startDrag));
    ['mousemove', 'touchmove'].forEach(evt => canvas.addEventListener(evt, drag));
    ['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(evt => canvas.addEventListener(evt, endDrag));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPositionEvents);
} else {
    initPositionEvents();
}