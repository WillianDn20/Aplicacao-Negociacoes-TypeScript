export function domInjector(seletor: string) {
    // Esta é a fábrica de decorators. Ela recebe o seletor CSS como argumento.
    // O seletor é usado para buscar o elemento no DOM.

    return function( target: any, propertyKey: string){
        // Esta é a função decorator que será executada quando o decorator for aplicado a uma propriedade.
        // `target` é o prototype da classe que está sendo decorada.
        // `propertyKey` é o nome da propriedade que está sendo decorada.

        console.log(`Modificando prototype ${target.constructor.name} e adicionando getter para a propriedade ${propertyKey}`);
        // Imprime uma mensagem no console indicando que o prototype da classe está sendo modificado.
        // Isso acontece no momento em que a classe é definida, não durante a execução do programa.

        let elemento: HTMLElement | null = null;
        const getter = function() {
            // Esta é a função getter que será executada quando a propriedade decorada for acessada.

            if (!elemento) {
                
                elemento = <HTMLElement> document.querySelector(seletor);
                // Busca o elemento no DOM usando o seletor CSS fornecido.
                console.log(`buscando elemento do DOM com o seletor ${seletor} para injetar em ${propertyKey}`);
                // Imprime uma mensagem no console indicando que o elemento está sendo buscado no DOM.
                // Isso acontece toda vez que a propriedade decorada é acessada.
            }

            return elemento;
            // Retorna o elemento encontrado no DOM.
            
        }

        Object.defineProperty(
            target, 
            propertyKey, 
            {   get: getter }
        );
        // Define um novo getter para a propriedade no prototype da classe.
        // O getter é a função que busca o elemento no DOM e o retorna.
        // Isso significa que, quando a propriedade decorada for acessada, o getter será executado
        // e o elemento do DOM será retornado.
    }
}