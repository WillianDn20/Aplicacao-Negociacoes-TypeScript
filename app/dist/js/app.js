import { negociacaoController } from './controllers/negociacao-controller.js';
const controller = new negociacaoController;
const form = document.querySelector(".form");
if (form) {
    form.addEventListener("submit", event => {
        event.preventDefault();
        controller.adiciona();
    });
}
else {
    throw Error("Não foi possivel inicializar a aplicação. Verifique se o form é null.");
}
const botaoImporta = document.querySelector(`#botao-importa`);
if (botaoImporta) {
    botaoImporta.addEventListener(`click`, () => {
        controller.importaDados();
    });
}
else {
    throw Error("Botao importa não foi encontrado");
}
//# sourceMappingURL=app.js.map