import { negociacaoController } from './controllers/negociacao-controller.js'; //Importa o negociacaoController.ts
//import { Negociacao } from './models/negociacao.js';

// const negociacao = new Negociacao(new Date(), 10, 1000); //Cria uma negociacao com data e valores 
// console.log(negociacao.volume);

const controller = new negociacaoController; //Declara uma variavel controller e cria um novo negocicaoController (POO)
const form = document.querySelector(".form"); //Declara uma variavel e puxa do html os elementos da classe form 
if (form) {
    form.addEventListener("submit", event => { //adiciona um eventlistener a classe e quando o submit for feito, dispara a execução abaixo 
    event.preventDefault(); //Previne que. apagina de reload apos enviar o submit
    controller.adiciona(); //chama a funcao do negociacaoController informando os dados.
    })
} else {
    throw Error("Não foi possivel inicializar a aplicação. Verifique se o form é null.")
}

const botaoImporta = document.querySelector(`#botao-importa`);

if (botaoImporta) {
    botaoImporta.addEventListener(`click`, () => {
        controller.importaDados();
    });
} else {
    throw Error("Botao importa não foi encontrado");
}

 