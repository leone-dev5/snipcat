let initialDistance = 0;
let initialSize = { width: 0, height: 0 };

boxWorkers.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2 && selectedLayer) {
        
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        
        initialDistance = Math.hypot(dx, dy);
        
        initialSize.width = selectedLayer.width;
        
        initialSize.height = selectedLayer.height;
    }
});
boxWorkers.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && selectedLayer) {
        
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        
        const distance = Math.hypot(dx, dy);
        const scale = distance / initialDistance;
        
        selectedLayer.width = initialSize.width * scale;
        
        selectedLayer.height = initialSize.height * scale;
        
        e.preventDefault();
        drawLayers();
        
    }
});