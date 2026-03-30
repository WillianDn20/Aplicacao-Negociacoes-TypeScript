// import { inspect } from "../decorators/inspect.js";
// import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";

export abstract class View<T> { //Utilizamos essa classe para reutilizar códigos que estavam se repetindo nos outros scripts. //Utilizamos o abstract para dizer que não é possível criar uma instancia dessa classe. Apenas de suas filhas.
//Utilizamos o <T> aqui para dizer que a classe é do tipo  generica, ou seja, a classe filha que vai informar qual o tipo da classe. Isso permite que utilizemos esse view tanto para mensagem-view que é do tipo string, quanto para o negociacoes-views que é do tipo Negociacoes
    
    protected elemento: HTMLElement; //Criamos uma classe privada chamada elemento e dizemos que o tipo dela vai ser um elemento HTML
    //Utilizamos protected, pois somente o view tem acesso ao elemento, mas quem herda também tem acesso
    
    //private escapar = false; //funcao removida para utilizar atraves do decorator escape

    constructor(seletor: string) { //escapar?: boolean) {
    //Criamos o construc tor que recebe como parametro um seletor do tipo string (o id que foi atribuido no html) //Utilizamos o ? no escapar para dizer que o parametro é opcional, então o usuário pode passar ou não //Caso o parametro nao seja passava ele vai seguir o valor definido acima de false
        
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento as HTMLElement; //Dizemos que a classe elemento deve procurar onde, no html, está escrito a string recebida pelo selector
        }else {
            throw Error(`Seletor ${seletor} inválido`)
        }
        
        //if (escapar) {
            //this.escapar = escapar; //Se passarmos o parametro, definimos ele em escapar 
        //}
    }

    // O decorator @inspect() é aplicado primeiro ao método, seguido pelo @logarTempoDeExecucao.
    // Na execução, @logarTempoDeExecução(true) é o primeiro a rodar, iniciando a medição do tempo e, antesd de chamar o return, chama o decorator @inspect().
    // @inspect() então executa, inspeciona e chama o método original. Após a execução completa do método original, @inspect() da o returnr e chama @logarTempoDeExecucao.
    // Finalmente, @logarTempoDeExecucao(true) completa sua execução, calcula e exibe o tempo decorrido.

    //Comentado para não poluir o console
    //@logarTempoDeExecucao(true)
    //@inspect
    public update(model: T): void{ //inicia o update rebendo como informacao a string informada pelo negociacao-controller
        let template = this.template(model);
        // if (this.escapar){
        //     template = template.replace(/<script>[\s\S]*?<\/script>/, "");
        // }
        this.elemento .innerHTML = template;
    }

    protected abstract template(model: T): string; //{ //Inves de utilizar o throwErro, que funciona, mas somente após a compilação, transformamos em abstract, assim, caso a filha nao defina template, o erro será informado em tempo real //Utilizamos o protected para dizer que somente o pai e as filhas podem acessar essa classe.

        // throw Error("Classe filha preecisa implementar o metodo template"); //Medida de proteção, caso a classe filha não defina o template. retornando o erro no console.

    //}

}