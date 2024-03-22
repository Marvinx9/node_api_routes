// padronizar o tipo de mensagem que vai aparecer quando eu tiver algum tipo de excessão
// o fato de criar essas duas variáveis no topo da minha classe, faz com que toda a minha clase tome conhecimento delas
class AppError {
    message;
    statusCode;

    // chamando o método construtores da minha classe, método que é carregado automaticamento quando a classe é instanciada
    constructor(message, statusCode = 400){
        // passando a message do constructor para o message da class
        this.message = message
        this.statusCode = statusCode
    }
}

module.exports = AppError;
