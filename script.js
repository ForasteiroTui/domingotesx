// 1. Obter os elementos do HTML
const audio = document.getElementById('myAudio');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeSlider = document.getElementById('volumeSlider');

// 2. Definir o volume inicial do áudio com base no slider (0.5 = 50%)
// E garantir que o slider representa o estado atual.
audio.volume = volumeSlider.value;

// 3. Função para Tocar/Pausar
playPauseBtn.addEventListener('click', () => {
    // Se o áudio estiver mutado (estado inicial de autoplay), um clique deve desmutar e manter tocando.
    if (audio.muted) {
        audio.muted = false; // Tira o mudo
        audio.play(); // Garante que está tocando
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

// 4. Função para Controlar o Volume
volumeSlider.addEventListener('input', () => {
    // Atualiza o volume do áudio com o valor do slider
    audio.volume = volumeSlider.value;
    // Se o usuário move o slider, desmutamos automaticamente para que ele ouça a mudança
    if (audio.muted && audio.volume > 0) {
        audio.muted = false;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
});

// Atualiza o ícone de Play/Pause se o áudio for pausado/tocado por outros meios (ex: fone de ouvido).
audio.addEventListener('play', () => {
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
});
audio.addEventListener('pause', () => {
    // Não alteramos o ícone se o áudio for pausado porque o usuário abriu a página (mutado).
    if (!audio.muted) {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});