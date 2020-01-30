// estamos usando a sitaxe do jQuery pq importamos no arquivo principal.html
// logo acima do arquivo main o framework do jquery

var campo = $(".campo-digitacao");
// Precisou guardar esse tempo-digitacao em outra variaval para usar essa na hora 
// q a pessoa usar o botao de reset na pag e ela passar a variavel zerada.
var tempoInicial = $("#tempo-digitacao").text();

// essa $(function() {} que puxa todas as outras function serve para quando apos o carregamento
// completo da pg ela chama todas a funcoes fazendo assim funcionar o site mesmo que isolado
// em diversas funcoes diferentes.
$(function() {
    atualizaTamnhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").on("click", reiniciaJogo);
});

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
};


function atualizaTamnhoFrase() {
    // nesse caso o $ significa jQuery
    var frase = $(".frase").text();

    // aqui usamos o split e passamos como parametro no que ele deve dividir, nesse caso espaço
    // e perguntamos o tamnho do array, isso dara o número de palavras
    var numPalavras = frase.split(" ").length;


    // a função .text() tem dois comportamentos, o primeiro , quando utilizamos-a sem 
    //nenhum parâmetro, nos é retornado o valor de texto do elemento, e o segundo, 
    //quando passamos um parâmetro para a função, ela altera o valor de texto do elemento!
    var tamanhoFrase = $("#tamanho-frase").text(numPalavras);
    //tamanhoFrase.text(numPalavras);

   
};

function inicializaContadores() {
    // aqui se mostra como no jq se escreve menos, aqui para disparar o evento, nao precissou colocar
    // o addEventLister apenas se coloca o on("EVENTO"), nesse caso o melhor é input mas tem varios
    // como o click, input, focus, dblclick depois recebe a funcao, podendo ser anonima 
    // como essa ou nomeada
    campo.on("input", function() {
    // o campo digitacao por ser um campo que recebe inputs, valores, deve se usar o .val()
    //Ambas as funções .val() e .text() podem manipular os valores de texto dos elementos, 
    //mas a .val() funciona em elementos de <input> que são campos aonde o usuário do 
    //site insere dados,
    // como os campos de <input>(todos os tipos), <textarea> e <select>.
    // Já a função .text() pega o conteúdo de texto de tags HTML que tem texto dentro, 
    //como as <h1>, <span> e <p>
        var conteudo = campo.val();
        // se deixar no splot(" ") ele ira contabilizar o espaco como letra
        // entao é necessario o uso de uma expressao regular, neste caro ira buscar todo espaco vazio
        var qntdPalavras = conteudo.split(/\S+/).length -1;
        $("#contador-palavras").text(qntdPalavras);
        
        var qntdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qntdCaracteres);
    });
};

function inicializaCronometro() {
    

    
    campo.one("focus", function(){
        var tempoRestante = $("#tempo-digitacao").text();
        // Utilizamos o evento de focus para detectar se o usuário já entrou em um campo de texto. 
        // O ato de entrar pode ser feito de vários modos,
        // como clicar com o mouse no campo, ou navegar através da tecla tab.
        // por exemplo sugerir um autocomplete de um campo assim que ele ganhar foco.

        //A função .one() funciona de modo semelhante a função .on(), 
        //ambas podem ser utilizadas em qualquer elemento,
        //recebem qualquer evento como primeiro parâmetro e 
        //uma função anônima ou uma função nomeada como segundo parâmetro.
        //A diferença entre elas é na hora de escutar os eventos, a função .one() escuta o evento apenas 
        //uma única vez, diferentemente da função on(), que como já vimos fica escutando o evento em um 
        //elemento do HTML por tempo ilimitado.
        $("#botao-reiniciar").attr("disabled", true);
        var cronometroID = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante == 0) {
                // o clearInterval funciona como se fosse o break no python
                // vc coloca a funcao em uma variavel essa variave retorna o id
                // que é usado no clearInt para pausar
                clearInterval(cronometroID);
                finalizaJogo();
            };
        },1000);
    });

};

function finalizaJogo() {
        // no jquery ao invest de usar o classList.add ou classList.remove
    // usamos o attr, no primeiro atributo pega a classe, no segundo
    // caso seja uma classe do proprio js como disable é necessario colocar
    // true pra por e false pra tirar
    // se colocar o nome de outra classe ela tira a q pegou e coloca a nova.
    //  .attr(), como o próprio nome sugere é para alterar os atributos de elemento
    //.removeAttr(), tem como objetivo remover atributos de elementos.
    campo.attr("disabled", true);
    $("#botao-reiniciar").attr("disabled", false);
    campo.toggleClass("campo-desativado");
    inserePlacar();
};

function inicializaMarcadores() {
    
    campo.on("input", function(){
        var frase = $(".frase").text();
        //Usamos a função substr para pegar o uma parte da frase, aqui do início (índice 0) até o 
        //tamanho da string digitado. 
        // Baseado nessa substring comparavel testamos se o conteúdo digitado bate com a frase

        //A função startsWith devolve true ou false, se a frase começa com o valor digitado ou não.
        //if( frase.startsWith(digitado)) {
        //    campo.addClass("borda-verde");
        //   } else {
         //   campo.addClass("borda-vermelha");
         //  }
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        }else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });

};

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
};