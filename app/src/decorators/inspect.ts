//export function inspect() { //Podemos cortar essa parte em decorators que não vão receber parametros. Na hora de chaar o decorator precisamos fazer @inspect sem ().

    export function inspect( //Decorator criado para dizer o metodo, parametro e retorno da classe que o utilizar
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    )  {
        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[]){

            console.log(`--- Método: ${propertyKey}`);
            console.log(`------ Parâmetros: ${JSON.stringify(args)}`);

            const retorno = metodoOriginal.apply(this, args);

            console.log(`------ Retorno: ${JSON.stringify(retorno)}`);

            return retorno;
        }
        return descriptor;
    }
    
//}