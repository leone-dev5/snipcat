function isFullScreenEnabled() {
    return document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
}

function enableFullScreen() {
    const docElement = document.documentElement;

    if (docElement.requestFullscreen) {
        docElement.requestFullscreen().catch(err => {
            console.log(`Erro no modo de tela: ${err.message} (${err.name})`);
        });
    } else if (docElement.mozRequestFullScreen) { 
        docElement.mozRequestFullScreen().catch(err => {
            console.log(`Erro no modo de tela: ${err.message} (${err.name})`);
        });
    } else if (docElement.webkitRequestFullscreen) { 
        docElement.webkitRequestFullscreen().catch(err => {
            console.log(`Erro no modo de tela: ${err.message} (${err.name})`);
        });
    } else if (docElement.msRequestFullscreen) { 
        docElement.msRequestFullscreen().catch(err => {
            console.log(`Erro no modo de tela: ${err.message} (${err.name})`);
        });
    } else {
        console.log("Esse navegador não suporta essa API");
    }
}

document.body.addEventListener('click', function () {
  
    if (!document.fullscreenElement && isFullScreenEnabled()) {
        enableFullScreen();
    }
});

if (isFullScreenEnabled()) {
    enableFullScreen();
} else {
    console.log("Esse navegador não suporta essa API");
};
