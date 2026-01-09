const input = document.getElementById('inputImagem');
const botao = document.getElementById('matters');

botao.addEventListener('click', () => {
    input.click();
});

input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    img.onload = function() {
        const ow = img.width;
        const oh = img.height;
        
        // escala para CABER no canvas sem distorcer
        const scale = Math.min(
            canvas.width / ow,
            canvas.height / oh
        );
        
        const fw = ow * scale;
        const fh = oh * scale;
        
        const x = (canvas.width - fw) / 2;
        const y = (canvas.height - fh) / 2;
        
        layers.push({
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
});
