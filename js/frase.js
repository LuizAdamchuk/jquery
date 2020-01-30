$("#botao-frase").on("click", fraseAleatoria)


function fraseAleatoria() {
    // Quando usamos $.get precisamos passar como primeiro parâmetro o endereço do que desejamos
     //consumir via Ajax. O segundo parâmetro é aquela função que será chamada automaticamente por
     // $.get assim que os dados retornarem do servidor. Esse retorno pode demorar um ou mais 
     // segundos, nunca sabemos quando ela será terminada, por isso dizemos que $.get executa um 
     //código assíncrono.
    $.get("http://localhost:3000/frases", trocaFraseAleatoria);
}
//Quando a função $.get vai retornar dados para que sejam utilizados pelo usuário, é preciso 
//colocar nos argumentos da função que é chamada ao sucesso da requisição uma variável que irá 
//conter os dados recebidos. No caso usamos o termo data, pode ser qualquer termo.
function trocaFraseAleatoria(data) {
    var frase =  $(".frase");
    //A função Math.random() gera um número aleatório 0.XXXXXXXXXXX. 
    // Multiplicando este valor por o length
    //Math.floor que arredonda o número para baixo
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamnhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}