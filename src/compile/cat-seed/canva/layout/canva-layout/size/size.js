import { getEditorState } from '/src/core/editor-state.js';

const CONFIG_PS_STYLE = {
  CANONICAL_SIZE: 600,
  PADDING_VISUAL: 40,
  SCALE_MAX: 1.0,
  SCALE_MIN: 0.1,
  PRESERVE_PROPORTION: true   
};

function CalcutorScale(widhtDoc, heightDoc) {
  const largerSide  = Math.max(widhtDoc, heightDoc);
  
  if (largerSide <= CONFIG_PS_STYLE.CANONICAL_SIZE) {
    return CONFIG_PS_STYLE.SCALE_MAX;
  }
  
  let scale = CONFIG_PS_STYLE.CANONICAL_SIZE / largerSide;
  const SCALE_PADDING = scale * 0.5;
  
  return Math.max(
    CONFIG_PS_STYLE.SCALE_MIN,
    Math.min(SCALE_PADDING, CONFIG_PS_STYLE.SCALE_MAX)
  );
}

function applyScale() {
  const state = getEditorState();
  if (!state || !state.canvas) return;
  
  const canvas = state.canvas;
  const scale = CalcutorScale(canvas.width, canvas.height);
  
  canvas.style.transform = `scale(${scale})`;
  canvas.style.transformOrigin = 'center';
}

function ZoomStability() {
  const state = getEditorState();
  if (!state || !state.canvas) return;
  
  state.canvas.style.transform = `scale(${CONFIG_PS_STYLE.SCALE_MAX})`;
}

function AdjustmentStabily() {
  const state = getEditorState();
  if (!state || !state.canvas) return;
  
  const canvas = state.canvas;
  const viewportWidth = window.innerWidth - CONFIG_PS_STYLE.PADDING_VISUAL * 2;
  const viewportHeight = window.innerHeight - CONFIG_PS_STYLE.PADDING_VISUAL * 2;
  
  const escalaX = viewportWidth / canvas.width;
  const escalaY = viewportHeight / canvas.height;
  const escala = Math.min(escalaX, escalaY) * 0.9; 
  
  const SCALE_LIMIT = Math.max(
    CONFIG_PS_STYLE.SCALE_MIN,
    Math.min(escala, CONFIG_PS_STYLE.SCALE_MAX)
  );
  
  canvas.style.transform = `scale(${SCALE_LIMIT})`;
}

function initCanvasSize() {
  const state = getEditorState();
  if (!state || !state.canvas) {
    setTimeout(initCanvasSize, 50);
    return;
  }
  
  const canvas = state.canvas;
  
  canvas.height = 4000;
  canvas.width = 3000;
  
  applyScale();
  ZoomStability();
  AdjustmentStabily();
  
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      applyScale();
      AdjustmentStabily();
    }, 100);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCanvasSize);
} else {
  initCanvasSize();
}