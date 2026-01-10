import { registerTool, activateTool } from '/src/core/tool-manager.js';
import { getEditorState, drawLayers, getCanvasPosition } from '/src/core/editor-state.js';

const bar_choose = document.createElement("div");
bar_choose.classList.add("bar_choose");
bar_choose.style.display = "none";

const root = document.getElementById("root");
if (root) {
    root.appendChild(bar_choose);
}

function initEraserTool() {
    registerTool('eraser', {
        activate: (state) => {
            if (bar_choose) {
                bar_choose.style.display = "block";
            }
            console.log('Ferramenta Borracha ativada');
        },
        
        deactivate: (state) => {
            if (bar_choose) {
                bar_choose.style.display = "none";
            }
            console.log('Ferramenta Borracha desativada');
        },
        
        onCanvasClick: (event, state) => {
            console.log('Borracha clicada no canvas');
        }
    });
    
    const eraserButton = document.getElementById('eraser');
    if (eraserButton) {
        eraserButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const currentState = getEditorState();
            const isAlreadyActive = currentState && currentState.activeTool === 'eraser';
            activateTool(isAlreadyActive ? null : 'eraser');
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEraserTool);
} else {
    initEraserTool();
}
