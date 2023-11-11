const html=document
.querySelector('html');

const focoBt=document
.querySelector('.app__card-button--foco');

const curtoBt=document
.querySelector('.app__card-button--curto');

const longBt=document
.querySelector('.app__card-button--longo');

const banner= document
.querySelector(`.app__image`);

const titulo = document
.querySelector('.app__title');

const musicaFocoInput=document
.querySelector('#alternar-musica');

const botoes=  document
.querySelectorAll('.app__card-button');

const musica = new Audio('/sons/luna-rise-part-one.mp3');

const play = new Audio(`/sons/play.wav`);

const pause = new Audio('/sons/pause.mp3');

const esgotado = new Audio('/sons/beep.mp3')

const startPauseBtn = document.querySelector('#start-pause');

const iniciarOuPausarBtn = document.querySelector('#start-pause span');

const imgBtn=document.querySelector('#start-pause img');

const tempoNaTela = document.querySelector('#timer');

musica.loop = true;

let tempoDecorridoEmSegundos=1500;

let intervaloId=0;

musicaFocoInput.addEventListener('change',()=>{
    if(musica.paused){
        musica.play()
    }
    else{
        musica.pause()
    }
})

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src',`/imagens/${contexto}.png`)

    switch(contexto){
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            titulo.innerHTML = 
            'Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>';
             break;
        case 'descanso-longo':
            titulo.innerHTML =
            'Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>'
             break;
        default:
            break;
    }
}

focoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos =1500;
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos=900;
    alterarContexto('descanso-longo')
    longBt.classList.add('active')
})

const contagemRegressiva=()=>{
    if(tempoDecorridoEmSegundos<=0){
        esgotado.play()
        alert('Tempo Esgotado!')
        zerar();
        tempoDecorridoEmSegundos=5;
        return
    }
    tempoDecorridoEmSegundos -=1;
    mostrarTempo();
}


function iniciarOuPausar(){
    if(intervaloId){
        pause.play();
        imgBtn.setAttribute('src','/imagens/play_arrow.png')
        zerar();
        return
    }
    play.play();
    imgBtn.setAttribute('src','/imagens/pause.png')
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBtn.textContent = "Pausar";
}
startPauseBtn.addEventListener('click', iniciarOuPausar);

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBtn.textContent = "Começar";
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatato=tempo.toLocaleTimeString('pt-Br', {minute:'2-digit',second:'2-digit'})
    tempoNaTela.innerHTML= `${tempoFormatato}`
}

mostrarTempo()