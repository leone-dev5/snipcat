function loadCSS(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            
            return resolve(`Já estava carregado: ${src}`);
        }
        
        const styleCSS = document.createElement('link');
        
        styleCSS.rel = 'stylesheet';
        styleCSS.href = src;
        styleCSS.onload = () => resolve(src);
        styleCSS.onerror = () => reject(new Error(`Falha ao carregar CSS: ${src}`));
        
        document.head.appendChild(styleCSS);
        
    });
}

(async () => {

    await loadCSS("/src/compile/cat-seed/canva/layout/buttons/button-top.css");
    
    await loadCSS("/src/compile/cat-seed/canva/layout/buttons/buttons-left.css");
    
    await loadCSS("/src/compile/cat-seed/canva/overlay/overlay-menu/submenu.css")
    
    await loadCSS("/src/origin/screenshot/icons/box-icon/box.css");
    
    await loadCSS("/src/origin/screenshot/icons/painters/style-change.css");
    
    await loadCSS("/src/compile/cat-seed/canva/layout/buttons/button-right.css");
    
    await loadCSS("/src/compile/cat-seed/canva/layout/buttons/button-right.css");
})();