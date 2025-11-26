// 1. Obter os elementos do HTML
const audio = document.getElementById('myAudio');
const video = document.getElementById('video-bg');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeSlider = document.getElementById('volumeSlider');
const startButton = document.getElementById('startButton');
const welcomeOverlay = document.getElementById('welcomeOverlay');


// 2. Definir o volume inicial do áudio e garantir que esteja mutado no início
audio.volume = volumeSlider.value;
audio.muted = true;


// 3. FUNÇÃO DE INÍCIO FORÇADO POR INTERAÇÃO DO USUÁRIO (Clique no Overlay)
startButton.addEventListener('click', () => {
    // 3a. Iniciar a reprodução do áudio (O clique remove o bloqueio do navegador)
    audio.play().catch(error => {
        console.log("Falha ao iniciar áudio após clique. Erro:", error);
    });
    
    // 3b. Iniciar a reprodução do vídeo (O vídeo já pode estar rodando, mas garantimos)
    video.play().catch(error => {
        console.log("Falha ao iniciar vídeo. Erro:", error);
    });

    // 3c. Ocultar o overlay de boas-vindas
    welcomeOverlay.style.opacity = '0';
    setTimeout(() => {
        welcomeOverlay.style.display = 'none';
    }, 500); // Esconde totalmente após a transição

    // 3d. O ícone do player é atualizado para PAUSE, indicando que a música está rodando mutada.
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
});


// 4. Função para Tocar/Pausar (e desmutar) - A Lógica Principal
playPauseBtn.addEventListener('click', () => {
    // Se o áudio estiver mutado (estado inicial após o start), um clique deve desmutar.
    if (audio.muted) {
        audio.muted = false; // Tira o mudo
        // O ícone deve ser atualizado para PAUSE
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'; 
    } 
    // Se o áudio estiver pausado (mas não mutado), um clique deve tocar.
    else if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } 
    // Se estiver tocando (e não mutado), um clique deve pausar.
    else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// 5. Função para Controlar o Volume
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
    
    // Se o usuário move o slider, desmutamos automaticamente
    if (audio.muted && audio.volume > 0) {
        audio.muted = false;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
});

// 6. Listeners para manter o ícone correto
audio.addEventListener('play', () => {
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
});
audio.addEventListener('pause', () => {
    // Só altera o ícone se o áudio realmente estiver parado (não apenas mutado)
    if (!audio.muted) {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});
