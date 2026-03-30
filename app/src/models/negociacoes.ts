
import { Modelo } from "../interfaces/Modelo.js";
import { Negociacao } from "./negociacao.js";

export class Negociacoes implements Modelo<Negociacoes>{ //Exporta e implementa o imprimivel e comparavel utilizando o modelo

    //Forma comum
    // private negociacoes: Array<Negociacao> = []; //Cria um array privado do tipo Negociacao

    //Forma typescript 
    private negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao){ //Cria um metodo para que seja possivel adicionar algo no array por fora dessa classe
        this.negociacoes.push(negociacao);
    }

    lista(): ReadonlyArray<Negociacao> { //Metodo typescript readonlyarray cria um array que permite apenas a leitura ou alterações em novos arrays(ex splice) 
        return this.negociacoes;
    }

    public paraTexto(): string {
       return JSON.stringify(this.negociacoes, null, 2);
    }

    public eIgual(negociacoes: Negociacoes): boolean{
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista);
    }
}

// const negociacoes = new Negociacoes();
// negociacoes.adiciona(new Negociacao());