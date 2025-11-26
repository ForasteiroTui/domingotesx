// 1. Obter os elementos do HTML
const audio = document.getElementById('myAudio');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeSlider = document.getElementById('volumeSlider');

// 2. TENTATIVA DE AUTOPLAY (Garantir que a mídia inicie mutada)
// Isso é necessário para contornar as políticas de navegador que bloqueiam o autoplay com som.
// O áudio JÁ deve ter 'autoplay' e 'muted' no HTML.
// O 'play()' é executado de forma assíncrona, que é o que muitos navegadores exigem.
audio.play().catch(error => {
    // Se a reprodução automática falhar (pode acontecer em alguns ambientes),
    // a página carregará, mas o usuário precisará clicar no Play para iniciar.
    console.log("Autoplay falhou. O usuário precisa interagir.", error);
});


// 3. Definir o volume inicial do áudio com base no slider (0.5 = 50%)
audio.volume = volumeSlider.value;

// 4. Função para Tocar/Pausar (e desmutar)
playPauseBtn.addEventListener('click', () => {
    // Se o áudio estiver mutado (estado inicial de autoplay), um clique deve desmutar.
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
    // Atualiza o volume do áudio com o valor do slider
    audio.volume = volumeSlider.value;
    
    // Se o usuário move o slider, desmutamos automaticamente para que ele ouça a mudança
    if (audio.muted && audio.volume > 0) {
        audio.muted = false;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
});

// 6. Listener para garantir que o ícone de Play/Pause esteja sempre correto
audio.addEventListener('play', () => {
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
});
audio.addEventListener('pause', () => {
    // Não altera o ícone se o áudio estiver mutado, pois visualmente ele está "tocando"
    if (!audio.muted) {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});
