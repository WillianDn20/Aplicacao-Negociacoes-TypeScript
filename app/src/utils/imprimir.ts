import { Imprimivel } from "./imprimivel.js";

export function imprimir(...objetos: Array<Imprimivel>){ //Garante que so aceite classes que implementem o imprimivel 

    for (let objeto of objetos) {
        console.log(objeto.paraTexto());
    }

}