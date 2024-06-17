//Marca em que botão clicou
const botoes = document.querySelectorAll('.botao'); // Seleciona todos os botões
let botaoClicado = false;

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        ativarBotao(botao); // Função para ativar o botão
        botaoClicado = true; // Marca que um botão foi clicado
    });
});

function ativarBotao(botaoClicado) {
    botoes.forEach(botao => { // Remove a classe 'checkClick' de todos os botões
        botao.classList.remove('checkClick');
    });

    botaoClicado.classList.add('checkClick'); // Adiciona a classe 'checkClick' ao botão clicado
}

//Mostra quando não foi selecionado nenhum botão do ROUNDS/POINTS
const buttonNext = document.querySelector('.buttonNext');
let attencion = document.querySelector(".alertButton");

attencion.style.display = "none";

buttonNext.addEventListener('click', (event) => {
    if (!botaoClicado) { // Se nenhum botão foi clicado
        event.preventDefault(); // Impede a navegação para a próxima página

        setTimeout(() => {
            attencion.style.display = "flex";
        }, 500);

        setTimeout(() => {
            attencion.style.display = "none";
        }, 5000);
    }
});

//Captura o valor do botao em que clicou e salva no localStorage
document.addEventListener("DOMContentLoaded", () => {
    let buttons = document.querySelectorAll("button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            let rounds = button.getAttribute("data-round");
            localStorage.setItem("rounds", rounds);
        });
    });
});

//captura os valores dos imputs e salva no localStorage
document.addEventListener("DOMContentLoaded", () => {
    const inputX = document.querySelector("input#nameX");
    const inputO = document.querySelector("input#nameO");

    const buttonNext = document.querySelector(".buttonNext");

    if (buttonNext) {
        buttonNext.addEventListener("click", () => {
            if (inputX && inputO) {
                // Armazena o valor do input em localStorage
                localStorage.setItem("inputValue1", inputX.value);
                localStorage.setItem("inputValue2", inputO.value);
            }
        });
    }
});