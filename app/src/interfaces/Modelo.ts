import { Imprimivel } from "../utils/imprimivel.js";
import { Comparavel } from "./comparavel.js";

//Aqui criamos uma interface modelo que recebe todas as outras interfaces, então nos classes que forem utrilizar essas interfaces, precisamos apenas implementar modelo
export interface Modelo<T> extends Imprimivel, Comparavel<T>{//Uma interface pode extender quantas outras interfaces quiser

}