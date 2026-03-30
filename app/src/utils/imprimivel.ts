//Metodo utilizando polimorfismo, o que pode ser ruim, já que uma classe só pode herdar de uma (extends)
//Logo, utilizar polimorfismo aqui, pode prejudicar outras clases, ja que não possuí nenhum código pronto e está sendo utilizado apenas para obrigar a declaração de Paratexto

// export abstract class Imprimivel { //Garante que quem extenda essa classe abstrate,s eja obrigado a declarar o para texto

//     public abstract paraTexto(): string;

// }  

//Por isso utilizamos a interface. A interface não possuí limite de uso numa classew, podendo uma classe ter várias interfaces.

export interface Imprimivel { //Essa interface garanta que classes que possuem o imprimivel declarem o paraTexto.
    paraTexto(): string; //Toda interface é abstrata e public por padrão
}  