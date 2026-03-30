import { View } from "./view.js"

export class MensagemView extends View<string>{//Utilizamos o extends para reutilizar e herdar o código do pai(view) e assim evitar repetição do código //Utilizamos o <..> para dizer qual vai ser o tipo que o View deve considerar


    //código que se repetia

    // private elemento: HTMLElement; //Indica que o elemento vai ser do tipo HTMLElement
    // constructor(seletor: string){ //Cria um constructor que recebe como parametro o seletor do ipo string (a id do html) 

    //     this.elemento = document.querySelector(seletor); //Procura no html o seletor informado (id ou classe) 

    // }

    protected template(model: string): string { //Cria o template que deve ser passado para o html, recebendo como parametro o string recebido pelo update //Utilizamos o protected para dizer que somente o pai e as filhas podem acessar essa classe.
        return `
            <p class="alert alert-info">${model}</p>
        `
    }

    //Código reescrito pelo View
    
    // update(model: string): void{ //inicia o update rebendo como informacao a string informada pelo negociacao-controller
    //     const template = this.template(model);
    //     this.elemento .innerHTML = template;
    // }
}