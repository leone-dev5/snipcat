let editorState = null;

function initEditorState() {
    const canvas = document.getElementById('work-image');
    if (!canvas) {
        console.warn('Canvas não encontrado. EditorState será inicializado depois.');
        return null;
    }

    const ctx = canvas.getContext('2d');
    
    return {
        canvas,
        ctx,
        layers: [],
        selectedLayer: null,
        offsetX: 0,
        offsetY: 0,
        isDragging: false,
        isPinching: false,
        activeTool: null,
        primaryColor: '#000000',
        secondaryColor: '#ffffff'
    };
}

export function getEditorState() {
    if (!editorState) {
        editorState = initEditorState();
    }
    
    if (!editorState && document.readyState !== 'loading') {
        editorState = initEditorState();
    }
    
    return editorState;
}

export function drawLayers() {
    const state = getEditorState();
    if (!state || !state.ctx || !state.canvas) return;
    
    const { ctx, canvas, layers } = state;
    
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

export function getCanvasPosition(e) {
    const state = getEditorState();
    if (!state || !state.canvas) return null;
    
    const rect = state.canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    
    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
    };
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        editorState = initEditorState();
    });
} else {
    editorState = initEditorState();
}
