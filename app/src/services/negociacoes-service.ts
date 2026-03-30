import { NegociacoesDoDia } from "../interfaces/negociacao-do-dia.js";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService {

    public obterNegociacoes(): Promise<Negociacao[]>{
    // Inicia uma operação de busca (fetch) para obter dados de uma API.
        return fetch(`http://localhost:8080/dados`)
        // Quando a resposta da API é recebida, converte o corpo da resposta para o formato JSON.
        .then(res => res.json())
        // Após a conversão para JSON, manipula os dados recebidos como um array de tipo 'any'.
        .then((dados: NegociacoesDoDia[]) => {
            // Mapeia cada elemento do array 'dados' para criar um novo array de objetos 'Negociacao'.
            return dados.map(dadosDeHoje => {
                // Para cada 'dadosDeHoje', cria um novo objeto 'Negociacao' com a data atual,
                // o número de vezes e o montante extraídos de 'dadosDeHoje'.
                return new Negociacao(
                    new Date(), 
                    dadosDeHoje.vezes, 
                    dadosDeHoje.montante
                )
            })
        });
    }
}