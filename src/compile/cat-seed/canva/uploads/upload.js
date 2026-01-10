import { getEditorState, drawLayers } from '/src/core/editor-state.js';

function initUpload() {
    const input = document.getElementById('inputImagem');
    const botao = document.getElementById('matters');
    
    if (!input || !botao) {
        setTimeout(initUpload, 50);
        return;
    }
    
    botao.addEventListener('click', () => {
        input.click();
    });
    
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const state = getEditorState();
        if (!state || !state.canvas) {
            console.error('EditorState não inicializado. Não é possível fazer upload.');
            return;
        }
        
        const img = new Image();
        img.src = URL.createObjectURL(file);
        
        img.onload = function() {
            const ow = img.width;
            const oh = img.height;
            
            const scale = Math.min(
                state.canvas.width / ow,
                state.canvas.height / oh
            );
            
            const fw = ow * scale;
            const fh = oh * scale;
            
            const x = (state.canvas.width - fw) / 2;
            const y = (state.canvas.height - fh) / 2;
            
            state.layers.push({
                img,
                x,
                y,
                scale,
                originalWidth: ow,
                originalHeight: oh
            });
            
            drawLayers();
            
            URL.revokeObjectURL(img.src);
        };
        
        img.onerror = function() {
            console.error('Erro ao carregar imagem');
            URL.revokeObjectURL(img.src);
        };
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUpload);
} else {
    initUpload();
}
