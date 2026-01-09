function loadCanva(src) {
  return new Promise((resolve, reject) => {
    
    if (document.querySelector(`script[src="${src}"]`)) {
      return resolve(`Já estava carregado: ${src}`);
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.onload = () => resolve(`Carregado: ${src}`);
    
    document.body.appendChild(script);
  });
}

(async () => {
  try {
    
      await loadCanva("/src/compile/cat-seed/canva/uploads/upload.js");
      
      await loadCanva("/src/compile/cat-seed/canva/layout/canva-layout/size/border.js");
    
      await loadCanva("/src/compile/cat-seed/canva/layout/canva-layout/canva-element.js")
    
      await loadCanva("/src/compile/cat-seed/canva/layout/canva-layout/position.js"),
      
      await loadCanva("/src/compile/cat-seed/canva/layout/canva-layout/screen.js")
      
      await loadCanva("/src/compile/cat-seed/canva/layout/canva-layout/size.js")
      
      await loadCanva("/src/compile/cat-seed/canva/layout/canva-layout/scroll.js")
      
      await loadCanva("/src/compile/cat-seed/canva/tools/painting-tools/picker-colors/colors-change.js");
      
      await loadCanva("/src/compile/cat-seed/canva/tools/erase-tools/eraser/pen-eraser.js");
      
      await loadCanva("/src/compile/cat-seed/canva/overlay/overlay-menu/submenu.js");
      
      await loadCanva("/src/compile/cat-seed/canva/layout/canva-layout/size/size.js")
      
  } catch (err) {
    console.error("Erro no carregamento:", err);
  }
})();