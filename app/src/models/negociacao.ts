
import { Modelo } from "../interfaces/Modelo.js";


export class Negociacao implements Modelo<Negociacao>{ //Exporta e implementa o imprimivel e comparavel com o modelo

    //Forma classica de se fazer
    // private _data: Date; //Cria os objetos privados
    // private _quantidade: number;
    // private _valor: number;

    // constructor(data: Date, quantidade: number, valor: number) { //Constroi eles e especifica os seus tipos
    //     this._data = data;
    //     this._quantidade = quantidade;
    //     this._valor = valor;
    // }

    //Como se faz com o typescript
    constructor(
        private _data: Date,
        readonly quantidade: number,
        readonly valor: number
    ){
        //super(); //Chama o constructor da classe absrata imprimivel. //Não necessario com interface
    }


    // get data(): Date { //Retorna o valor de forma acessivel para fora desse poo
    //     return this._data;
    // }

    // get quantidade(): number {
    //     return this._quantidade;
    // }

    // get valor(): number {
    //     return this._valor;
    // }

    get data(): Date{ //Cria uma nova instancia para data, impedindo que o valor original seja alterado
        const data = new Date(this._data.getTime());
        return data;
    }


    get volume(): number {
        return this.quantidade * this.valor;
    }
    
    public paraTexto(): string { //Transforma os dados da negociacao para texto
        return `
            Data: ${this.data},
            Quantidade: ${this.quantidade},
            valor: ${this.valor}
        `;
         
    }

    public eIgual(negociacao: Negociacao): boolean { //Esse metodo verifica se a data mes e ano da negociacao é igual ao informado 
        return this.data.getDate() === negociacao.data.getDate()
        && this.data.getMonth() === negociacao.data.getMonth()
        && this.data.getFullYear() === negociacao.data.getFullYear();
    }

    public static criaDe(dataString: string, quantidadeString: string, valorString:string): Negociacao { //Transferimos a lógica para ca e a colocamos como static para ser mais facil de ser chamada, sem ter que declarar cons ... = new ...

        const exp = /-/g; //Cria uma expressão regular para pegar todo - passada pela data
        const date = new Date(dataString.replace(exp, "/")); //transofrma a - em /

        const quantidade = parseInt(quantidadeString); //Pega o value recebido e transforma em int

        const valor = parseFloat(valorString); //Transforma em float

        return new Negociacao(date, quantidade, valor); //cria um negociacao informando os dados passados pelo negociacao controller
    }
}