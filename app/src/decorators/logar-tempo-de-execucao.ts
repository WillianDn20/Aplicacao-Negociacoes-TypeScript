export function logarTempoDeExecucao(emSegundos: boolean = false) {
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        // target: O protótipo da classe onde o método decorado está definido.
        // propertyKey: O nome do método que está sendo decorado.
        // descriptor: O descritor da propriedade do método, que contém informações como o valor (a função), se é gravável, enumerável, etc.

        const metodoOriginal = descriptor.value; 
        // Armazena uma referência para o método original que está sendo decorado. Isso é crucial porque você vai sobrescrever o método original com uma nova função.

        descriptor.value = function(...args: Array<any>) { //Altera o metodo original
            // Sobrescreve o valor do descritor (ou seja, o método original) com uma nova função. Esta nova função é que será executada quando o método decorado for chamado.
            // ...args: Array<any>: Utiliza o rest parameter para receber um número variável de argumentos, que são armazenados em um array chamado args. O tipo any[] indica que o array pode conter valores de qualquer tipo.
            let divisor = 1;
            let unidade = "milisegundos";

            if (emSegundos) {
                divisor = 1000;
                unidade = "segundos";
            }
            const t1 = performance.now();
            // Registra o tempo de início da execução do método, utilizando a função performance.now() para obter uma medida de alta precisão do tempo atual.
            
            const retorno = metodoOriginal.apply(this, args);//chama o metodo original
            // Chama o método original (que foi armazenado em metodoOriginal) dentro do novo contexto.
            // .apply(this, args): O método apply é usado para chamar uma função com um determinado valor this e argumentos fornecidos como um array.
                // this: Garante que o contexto this dentro do método original seja o mesmo contexto de quando o método decorado é chamado. Isso é importante para que o método original possa acessar as propriedades e métodos da classe corretamente.
                // args: Passa todos os argumentos recebidos pela nova função para o método original.

            const t2 = performance.now();
            // Registra o tempo de fim da execução do método.

            console.log(`${propertyKey}, tempo de execução: ${(t2 - t1)/divisor} ${unidade}`)
            // Calcula o tempo de execução em segundos (dividindo a diferença por 1000) e exibe no console uma mensagem formatada com o nome do método (propertyKey) e o tempo de execução.

            return retorno;
            // Retorna o valor retornado pelo método original. Isso é importante para garantir que o comportamento do método decorado seja o mesmo do método original, além de adicionar a funcionalidade de logar o tempo de execução.
        };

        return descriptor;
        // Retorna o descritor modificado. Isso é necessário para que as alterações feitas no descritor (ou seja, a substituição do método original pela nova função) sejam aplicadas à classe.
    }
}