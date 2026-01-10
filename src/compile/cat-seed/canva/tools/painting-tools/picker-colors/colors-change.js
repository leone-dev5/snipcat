import { getEditorState } from '/src/core/editor-state.js';

function initColorPicker() {
    const color_1 = document.getElementById("painter-black");
    const color_2 = document.getElementById("painter-white");
    
    if (!color_1 || !color_2) {
        setTimeout(initColorPicker, 50);
        return;
    }
    
    const inputBlack = document.createElement("input");
    inputBlack.type = "color";
    inputBlack.style.display = "none";
    inputBlack.value = "#000000";
    color_1.appendChild(inputBlack);
    
    const inputWhite = document.createElement("input");
    inputWhite.type = "color";
    inputWhite.style.display = "none";
    inputWhite.value = "#ffffff";
    color_2.appendChild(inputWhite);
    
    color_1.addEventListener('click', () => {
        inputBlack.click();
    });
    
    color_2.addEventListener('click', () => {
        inputWhite.click();
    });
    
    color_1.addEventListener('input', () => {
        const state = getEditorState();
        if (state) {
            state.primaryColor = inputBlack.value;
        }
        color_1.style.background = inputBlack.value;
    });
    
    color_2.addEventListener('input', () => {
        const state = getEditorState();
        if (state) {
            state.secondaryColor = inputWhite.value;
        }
        color_2.style.background = inputWhite.value;
    });
    
    const state = getEditorState();
    if (state) {
        state.primaryColor = inputBlack.value;
        state.secondaryColor = inputWhite.value;
    }
    
    color_1.style.background = inputBlack.value;
    color_2.style.background = inputWhite.value;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initColorPicker);
} else {
    initColorPicker();
}