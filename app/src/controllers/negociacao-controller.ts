import { domInjector } from "../decorators/dom-injector.js";
import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { DiasDaSemana } from "../enums/dias-semana.js";
//import { NegociacoesDoDia } from "../interfaces/negociacao-do-dia.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";


export class negociacaoController { //Exporta 

    @domInjector(`#data`)
    private inputData: HTMLInputElement; //Cria os objetos privados e referencia que o tipo é um input do html
    @domInjector(`#quantidade`)
    private inputQuantidade: HTMLInputElement; //Diz que pode ser do tipo HTML ou Null
    @domInjector(`#valor`)
    private inputValor: HTMLInputElement;

    private negociacoes= new Negociacoes();
    private negociacoesView = new NegociacoesView("#negociacoesView"); //, true); //Criamos uma nova instância do NegociacoesView, já informando o id (que está no html) que será solicitado pelo constructor
    private mensagemView = new MensagemView("#mensagemView");

    private negociacoesService = new NegociacoesService(); //Importa o service e declara 

    constructor() { //constroi os objetos
        //Logica substituita pelo decorator dom injector
        // this.inputData = document.querySelector("#data") as HTMLInputElement; //Usamos o as para garantir ao ts que essa função vai retornar o tipo HTMLInputElement, deixando o inpout de fora
        // this.inputQuantidade =<HTMLInputElement>document.querySelector("#quantidade"); //Outra forma de usar o as
        // this.inputValor = document.querySelector("#valor") as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes); //Chama a classe update do negociacoesView (Que foi declarado acima) e passa como parametro a sinformacoes da negociação que foi adicionada

    }

    @inspect
    @logarTempoDeExecucao() //Adiciona o decorator nessa classe
    public adiciona(): void { //Adiciona no console log o resultado //Declara que o metodo retorna void, ou seja, nada

        const negociacao = Negociacao.criaDe(
        this.inputData.value,
        this.inputQuantidade.value,
        this.inputValor.value
        );
        
        
        if (!this.DiaUtil(negociacao.data)){ 
            this.mensagemView.update("Apenas negociações em dias úteis são aceitas");
            return;
        }

        imprimir(negociacao, this.negociacoes); //Imprime o console.log chamando o imprimir da classe imprimir

        this.negociacoes.adiciona(negociacao); //Chama a funcao adicviona de negociacoests, passando como parametro negociacao
        this.atualizaView();
        this.limparFomulario();
    }

     public importaDados(): void{

        this.negociacoesService 

            .obterNegociacoes() //Chama o service 
       
            .then(negociacoesDeHoje => { // Recebe o array de negociações do dia


                return negociacoesDeHoje.filter(negociacaoDeHoje => { // Filtra as negociações
                    return !this.negociacoes //Retorna op não (!) da verificação 
                    .lista() //Obtém a lista de negociações
                    .some(negociacao => negociacao.eIgual(negociacaoDeHoje)) //Verifica se alguma negociação da lista é igual à negociação do dia
                });

            })
            
            // Após o mapeamento, manipula o array de objetos 'Negociacao' resultante.
            .then(negociacoesDeHoje => {
                // Itera sobre cada objeto 'negociacao' no array 'negociacoesDeHoje'.
                for (let negociacao of negociacoesDeHoje){
                    // Para cada 'negociacao', adiciona-o à lista de negociações existente.
                    this.negociacoes.adiciona(negociacao);
                }
                // Após adicionar todas as negociações, atualiza a exibição (view) com a lista de negociações atualizada.
                this.negociacoesView.update(this.negociacoes)
            });
    }

    private DiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.Domingo && data.getDay() < DiasDaSemana.Sabado;
        //O getDay gera o valor do dia de 0 a 6, sendo 0 domingo e 6 sabado
    }
        
    
    // Movido para negociacao.ts
    // private criaNegociacao(): Negociacao { //Determina que o metodo retorna Negociacao 
        
    //     const exp = /-/g; //Cria uma expressão regular para pegar todo - passada pela data
    //     const date = new Date(this.inputData.value.replace(exp, "/")); //transofrma a - em /

    //     const quantidade = parseInt(this.inputQuantidade.value); //Pega o value recebido e transforma em int

    //     const valor = parseFloat(this.inputValor.value); //Transforma em float

    //     return new Negociacao(date, quantidade, valor); //cria um negociacao informando os dados passados pelo negociacao controller
    // }

    private limparFomulario(): void{ //Declara todos os valores como vazios por padrão
        
        if( !this.inputData || !this.inputQuantidade || !this.inputValor) {
            return
        }
        
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus(); //Joga o foco do formulario na data automaticamente
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes); //Chama o update sempre que uma negociacao é adicionada
        this.mensagemView.update("Negociação adicionada com sucesso!");
    }
    
}