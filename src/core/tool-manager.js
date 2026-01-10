import { getEditorState } from './editor-state.js';

const tools = new Map();
let currentActiveTool = null;

export function registerTool(name, toolConfig) {
    if (!name || typeof name !== 'string') {
        console.error('ToolManager: nome da ferramenta deve ser uma string não vazia');
        return;
    }
    
    if (tools.has(name)) {
        console.warn(`ToolManager: ferramenta "${name}" já está registrada. Substituindo...`);
    }
    
    tools.set(name, {
        name,
        activate: toolConfig.activate || (() => {}),
        deactivate: toolConfig.deactivate || (() => {}),
        onCanvasClick: toolConfig.onCanvasClick || null
    });
    
    console.log(`ToolManager: ferramenta "${name}" registrada`);
}

export function activateTool(toolName) {
    const state = getEditorState();
    if (!state) return;
    
    if (currentActiveTool) {
        const previousTool = tools.get(currentActiveTool);
        if (previousTool && previousTool.deactivate) {
        previousTool.deactivate(state);
        }
    }
    
    if (!toolName) {
        state.activeTool = null;
        currentActiveTool = null;
        return;
    }
    
    const tool = tools.get(toolName);
    if (!tool) {
        console.warn(`ToolManager: ferramenta "${toolName}" não encontrada`);
        return;
    }
    
    currentActiveTool = toolName;
    state.activeTool = toolName;
    
    tool.activate(state);
    
    console.log(`ToolManager: ferramenta "${toolName}" ativada`);
}

export function getActiveTool() {
    return currentActiveTool;
}

export function isToolActive(toolName) {
    return currentActiveTool === toolName;
}

export function getAllTools() {
    return Array.from(tools.keys());
}

export function handleCanvasClick(event) {
    if (!currentActiveTool) return;
    
    const tool = tools.get(currentActiveTool);
    if (tool && tool.onCanvasClick) {
        const state = getEditorState();
        tool.onCanvasClick(event, state);
    }
}

registerTool('none', {
    activate: (state) => {
        if (state) state.activeTool = null;
    }
});
