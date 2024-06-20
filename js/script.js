let nameX = "Player 1";
let nameO = "Player 2";

//aqui vai pegar os valores dos inputs armazenados no localStorage
document.addEventListener("DOMContentLoaded", () => {
    const displayNameX = document.querySelector("span#displayNameX");
    const displayNameO = document.querySelector("span#displayNameO");

    const storedValue1 = localStorage.getItem("inputValue1");
    const storedValue2 = localStorage.getItem("inputValue2");

    nameX = obterNameX();
    nameO = obterNameO();

    if (storedValue1) {
        //aqui vai substituir o player 1 pelo nome escolhido
        displayNameX.textContent = `${storedValue1}`;
    }
    if(storedValue2){
        displayNameO.textContent = `${storedValue2}`;
    }

});

function obterNameX(){
    return localStorage.getItem("inputValue1");
}

function obterNameO(){
    return localStorage.getItem("inputValue2");
}

//variaveis globais
let box = document.querySelectorAll(".box");
let checkPlacarX = 0;
let pontoPlacarX = 0;
let pontoPlacarO = 0;
let verifReiniciar = 0;
let reseteVerif = 0;
let checkVez = 0;
let verifReset;
let verif;

//Fazer evento para receber elementos
for(let cont = 0; cont < box.length; cont++){
    box[cont].addEventListener("click", () =>{

        let x = marcaX();
        let o = marcaO();

        //alternar entre X e O 
        if(checkVez == 0){
            box[cont].appendChild(x);
            checkVez = 1;
        }else if(checkVez == 1){
            box[cont].appendChild(o);
            checkVez = 0;
        }

        //fazer com que cada bloco so receba 1 elemento
        // - bloqueia a div box para que ela so receba um span
        let boxQt = box[cont].childNodes; // <- quantidade de elementos que tem dentro do box
        if(boxQt.length > 1){
            if(checkVez == 0){
            box[cont].removeChild(o);
            checkVez = 1;
            }else if(checkVez == 1){
            box[cont].removeChild(x);
            checkVez = 0;
            }
        }

        /*
        - Verificação de qual angulo ganhou.
        - É verificar se quem ganhou foi X ou O.
        */
        verificarQuemGanhou();
    })
}

/*
FUNÇÃO: verificar quem ganhou se foi X ou O ou se deu EMPATE
*/

function verificarQuemGanhou(){
    let bloco = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]; 
    
    for(let i = 0; i < bloco.length; i++){
        //Em cada loop o verif zera e fica false.
        verif = false;

        //Se 2 resultados do array BLOCO for correto, aceite somente 1 resultado.
        if(box[bloco[i][0]].childNodes.length > 0 && box[bloco[i][1]].childNodes.length > 0 && box[bloco[i][2]].childNodes.length > 0){
            let b1Child = box[bloco[i][0]].childNodes[0].className;
            let b2Child = box[bloco[i][1]].childNodes[0].className;
            let b3Child = box[bloco[i][2]].childNodes[0].className;

            if(b1Child == "x" && b2Child == "x" && b3Child == "x"){
                //x

                //aqui se tiver 2 valores corretos, sera removido 1 deles.
                //obs: ele vai remove tambem aquela que tiver so 1 correto tambem.
                for(let i = 0; i < bloco.length; i++){
                    for(let j = 0; j < bloco.length; j++){
                        if(bloco[i]){
                            let posicao = bloco.indexOf(bloco[i]);
                            if(posicao > -1){
                                //aqui vai remover o elemento do array BLOCO correto.
                                bloco.splice(posicao, 1);
                            }
                            
                            if(bloco[i] == bloco[j]){
                                let posicao = bloco.indexOf(bloco[j]);
                                if(posicao > -1){
                                    
                                    bloco.splice(posicao, 1);
                                }
                            }
                        }
                    }
                }

                verif = true;
                pontosPlacar("x");
                reiniciarJogo();     
                              
            }else if(b1Child == "o" && b2Child == "o" && b3Child == "o"){
                //o

                //aqui se tiver 2 valores corretos, sera removido 1 deles.
                //obs: ele vai remove tambem aquela que tiver so 1 correto tambem.
                for(let i = 0; i < bloco.length; i++){
                    for(let j = 0; j < bloco.length; j++){
                        if(bloco[i]){
                            let posicao = bloco.indexOf(bloco[i]);
                            if(posicao > -1){
                                //aqui vai remover o elemento do array BLOCO correto.
                                bloco.splice(posicao, 1);
                            }
                            
                            if(bloco[i] == bloco[j]){
                                let posicao = bloco.indexOf(bloco[j]);
                                if(posicao > -1){
                                    
                                    bloco.splice(posicao, 1);
                                }
                            }
                        }
                    }
                }

                verif = true;
                pontosPlacar("o");
                reiniciarJogo();       
            }
        } 
    }

    //FUNÇÃO EMPATE para caso nenhuma verificação acima de certo.
    //caso X ou O ganhar a função deuEmpate não vai ativar,por conta do VERIF.
    
    if(verif == false){
        deuEmpate();
    }
}

// Variáveis globais
// Seleciona os spans existentes para os pontos X e O
let placarX = document.querySelector(".pontosX");
let placarO = document.querySelector(".pontosO");
let pontosX = document.createElement("span");
let pontosO = document.createElement("span");

//Variáveis do winner
let tableTicTacToe  = document.querySelector(".tableTicTacToe");
let boxWinner  = document.querySelector(".boxWinner");

// Inicializa os spans com o valor zero
pontosX.innerHTML = pontoPlacarX;
pontosO.innerHTML = pontoPlacarO;
placarX.appendChild(pontosX);
placarO.appendChild(pontosO);

let pegarRounds;

document.addEventListener("DOMContentLoaded", () => {
    pegarRounds = obterRounds();
});

function obterRounds() {
    return localStorage.getItem("rounds");
}

function pontosPlacar(resultado) {
    if (resultado == "x") {
        pontoPlacarX++;
        pontosX.innerHTML = pontoPlacarX;

        if (pontoPlacarX == 1 && verifReset == 0) {
            verifReset = 1; // Prevenir execução repetida desnecessária
        }

    } else if (resultado == "o") {
        pontoPlacarO++;
        pontosO.innerHTML = pontoPlacarO;

        if (pontoPlacarO == 1 && verifReset == 0) {
            verifReset = 1; // Prevenir execução repetida desnecessária
        }
    }

    let winnerName = document.querySelector(".nomeWinner span");
    let perfilWinner = document.querySelector(".fotoWinner img")

    // Inicializar evento de reinício de jogo
    // Aqui vai mostrar quem foi o vencedor
    // Decide quantos rounds serão necessários:
    if (pontoPlacarX == pegarRounds || pontoPlacarO == pegarRounds) {
        tableTicTacToe.style.display = "none";
        boxWinner.style.display = "block";
        if(pontoPlacarX == pegarRounds){
            perfilWinner.setAttribute("src", "assets/images/avatar_01.svg");
            if(nameX == ""){
                winnerName.innerHTML = `Player 1`;
            }else{
                winnerName.textContent = `${nameX}`;
            }
        }else if(pontoPlacarO == pegarRounds){
            perfilWinner.setAttribute("src", "assets/images/avatar_02.svg");
            if(nameO == ""){
                winnerName.innerHTML = `Player 2`;
            }else{
                winnerName.textContent = `${nameO}`;
            }
        }

        recomecarJogo();
    }
}

function recomecarJogo() {
    let botao = document.querySelector(".botoes a.reset");
    
    botao.addEventListener("click", () => {
        pontoPlacarX = 0;
        pontoPlacarO = 0;
        verifReset = 0;

        pontosX.innerHTML = pontoPlacarX;
        pontosO.innerHTML = pontoPlacarO;

        tableTicTacToe.style.display = "block";
        boxWinner.style.display = "none";

        reiniciarJogo();
    });
}

//FUNÇÃO: Verificar se deu EMPATE
function deuEmpate(){
    let contEmpate = 0;
    //vai percorrer por todo o VETOR box
    for(let cont = 0; cont < box.length; cont++){
        if(box[cont].childNodes[0] != undefined){
            contEmpate++;  
        }
    }
    
    if(contEmpate == 9){
        reiniciarJogo();  
    }       
}

//FUNÇÃO: apagar todos os dados do jogo, exceto o placar.
function reiniciarJogo(){
    //temporizador que da um tempo ate apagar.
    setTimeout(() =>{
        for(let cont = 0; cont < box.length; cont++){
            //aqui vai substituir todos os dados dos BOXs por vazio.
            box[cont].innerText = "";
        }     
    }, 200);
}

//FUNÇÃO: fazer elemento X
function marcaX(){
    let span = document.createElement("span");
    let texto = document.createTextNode("X");
    span.appendChild(texto);
    span.classList.add("x");

    //redimeniona o elemento span quando atinge o limite do width
    if(window.matchMedia("(max-width: 490px)").matches){
        span.style.fontSize = "70px";
    }else{
        span.style.fontSize = "90px";
    }
    
    span.style.color = "#48FC28";
    return span;
}

//FUNÇÃO: fazer elemento O
function marcaO(){
    let span = document.createElement("span");
    let texto = document.createTextNode("O");
    span.appendChild(texto);
    span.classList.add("o");

    //redimeniona o elemento span quando atinge o limite do width
    if(window.matchMedia("(max-width: 490px)").matches){
        span.style.fontSize = "70px";
    }else{
        span.style.fontSize = "90px";
    }

    span.style.color = "#30E1D9";
    return span;
}