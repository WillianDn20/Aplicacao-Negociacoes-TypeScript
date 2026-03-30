import { escapar } from "../decorators/escapar.js";
import { Negociacoes } from "../models/negociacoes.js";
import { View } from "./view.js";

export class NegociacoesView extends View<Negociacoes>{ //Utilizamos o extends para reutilizar e herdar o código do pai(view) e assim evitar repetição do código //Utilizamos o <..> para dizer qual vai ser o tipo que o View deve considerar

    //código que se repetia
    // private elemento: HTMLElement; //Criamos uma classe privada chamada elemento e dizemos que o tipo dela vai ser um elemento HTML
    // constructor(seletor:string){ //Criamos o construc tor que recebe como parametro um seletor do tipo string (o id que foi atribuido no html)
    //     this.elemento = document.querySelector(seletor); //Dizemos que a classe elemento deve procurar onde, no html, está escrito a string recebida pelo selector
    // }

    @escapar
    protected template(informacoesNegociacao: Negociacoes): string { //Aqui temos o templeta da tabela que deve aparecer no html e que recebe como parametro as informacoes da negociacao passada pelo update //Utilizamos o protected para dizer que somente o pai e as filhas podem acessar essa classe.
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                ${informacoesNegociacao.lista().map(negociacao =>{ //quebra as informacoes da lista recebida em um elemento cada utilizando o map
                    // criamos uma instancia do Intl e como não passamos nenhum parametro, ele vai utilizar o formato de data padrão do navegador, que pode mudar de país para país. e formatamos a nossa data recebida com ele
                    
                    return `
                        <tr>
                            <td> ${this.formatar(negociacao.data)} </td>
                            <td> ${negociacao.quantidade} </td>
                            <td> ${negociacao.valor} </td>
                        </tr>
                    `;
                }).join(" ")}
            </tbody>
        </table>

        `;
    }

    //Código reutilizado de view

    // update(informacoesNegociacao: Negociacoes): void { //Criamos um update que recebe como parametro as informacoes da negociacao que foi criada e que não retorna nada 
    //         const template = this.template(informacoesNegociacao)
    //         console.log(template);
    //         this.elemento.innerHTML = template; //Pegamos o elemento (com o ID) e criamos com o innerHTML o coneudo que vai para o HTML e passa para o update as informacoes da negociacao
    // }

    private formatar(data: Date): string { //Trouxemos a formatação da data para uma funcão, possibilitando assim a reutilização da mesma. //Usamos privada para evitar que a função seja chamada por quem não deve
         return new Intl.DateTimeFormat().format(data);
    }
}


