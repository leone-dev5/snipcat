// Função para fechar todos os menus
function closeAllMenus() {
  document.querySelectorAll(".context-menu").forEach(menu => {
    menu.style.display = "none";
  });
  document.querySelectorAll(".context-menu-right").forEach(menu => {
    menu.style.display = "none";
  });
  document.querySelectorAll(".context-menu-top").forEach(menu => {
    menu.style.display = "none";
  });
}

// Menu dos botões da esquerda
document.querySelectorAll(".tool-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    
    const menu = btn.nextElementSibling;
    const isMenuVisible = menu && menu.style.display === "block";
    
    // Fecha todos os menus primeiro
    closeAllMenus();
    
    // Se o menu não estava visível, mostra ele
    if (menu && menu.classList.contains("context-menu") && !isMenuVisible) {
      menu.style.display = "block";
      
      // Posição do menu
      const rect = btn.getBoundingClientRect();
      menu.style.top = rect.top + 18 + "px";
      menu.style.left = "50px";
    }
    // Se já estava visível, apenas fecha (já foi fechado pelo closeAllMenus)
  });
});

// Menu dos botões da direita
document.querySelectorAll(".tool-btn-right").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    
    const menu = btn.nextElementSibling;
    const isMenuVisible = menu && menu.style.display === "block";
    
    // Fecha todos os menus primeiro
    closeAllMenus();
    
    // Se o menu não estava visível, mostra ele
    if (menu && menu.classList.contains("context-menu-right") && !isMenuVisible) {
      menu.style.display = "block";
      
      // Posição do menu
      const rect = btn.getBoundingClientRect();
      menu.style.top = rect.top + "px";
      menu.style.right = "12%";
    }
  });
});

// Menu dos botões do topo
document.querySelectorAll(".btn-top").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    
    const menu = btn.nextElementSibling;
    const isMenuVisible = menu && menu.style.display === "block";
    
    // Fecha todos os menus primeiro
    closeAllMenus();
    
    // Se o menu não estava visível, mostra ele
    if (menu && menu.classList.contains("context-menu-top") && !isMenuVisible) {
      menu.style.display = "block";
      
      // Posição do menu
      const rect = btn.getBoundingClientRect();
      menu.style.top = rect.bottom + 10 + "px";
      menu.style.left = rect.left + 5 + "px";
    }
  });
});

// Fecha menus ao clicar em qualquer lugar da página
document.addEventListener("click", () => {
  closeAllMenus();
});

// Impede que cliques nos menus fechem eles
document.querySelectorAll(".context-menu, .context-menu-right, .context-menu-top").forEach(menu => {
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});