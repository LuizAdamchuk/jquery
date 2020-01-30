$("#botao-placar").on("click", mostraPlacar)

function mostraPlacar() {
    // A função .stop() serve para interromper uma animação antes de começar a próxima. 
    // evintando assim multiplos cliques fiquem sendo executados, o que impede que várias 
    //animações fiquem encadeadas uma nas outras e crie um menu que fica subindo e descendo
    // constantemente
    // O toggle faz com que ativa/desativa algo, no caso o display:none, fazendo com que
    // o placar aprece e desapareca, se escolheu o slideToggle, para que ele apareca com 
    // uma transicao mais suave, escolhemos 600millisg
    //Assim como a função toggleClass, que vimos no último módulo, que adiciona ou remove uma 
    //classe. A função toggle adiciona ou esconde um elemento
    $(".placar").stop().slideToggle(600)
    //Conseguimos configurar a duração das funções de animação do jQuery passando para elas 
    //velocidade, em formato de número, para a função. Então se desejamos que um fade dure 2 
    //segundos, devemos informar 2000 milissegundos
};


function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Luiz";
    var numPalavras = $("#contador-palavras").text();
    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").on("click", removeLinha);
    // append adiciona depois e prepend antes, serve para adicionar html no codigo por meio
    // de js
    //O comando que adiciona um novo elemento como primeiro filho é o prepend(). Ele recebe um 
    //elemento HTML ou uma string e adiciona-o como um filho, antes dos filhos que ele já possuía.            
    corpoTabela.prepend(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
};

function scrollPlacar() {
    // o termo offSet serve para pegar a posicao da variavel q se esta procurando, 
    // recebe apenas o número
    var posicaoPlacar = $(".placar").offSet().top;
    // o animate consegue fazer varias coisas dentre elas scrollar pra posicao q se passa
    // no caso como recebe apenas o numero precisa passar o px, e depois o tempo.
    $("body").animate({
        scrollTop: posicaoPlacar+"px"
    }, 1000);
};

function novaLinha(usuario, palavras) {
    //Para criarmos elementos do DOM com jQuery, devemos utilizar a própria função jQuery ($) ,
    // mas em vez de passarmos um id, classe, ou nome de um elemento para ela buscar, devemos 
     //passar uma tag HTML completa( com os sinais < e >)
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    //A função que adiciona um novo elemento como último filho é a append. Ela recebe um elemento
    //HTML ou uma string e adiciona-o como um filho, depois dos filhos que ele já possuía.
    //Depois de criado um elemento na memória do navegador, podemos adicioná-lo a página com 
    //algumas das várias funções do jQuery, por exemplo com a append()
    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;

};
function removeLinha() {
        event.preventDefault();
        //Temos que lembrar que dentro de um evento do Javascript e do jQuery, a palavra reservada 
        //this sempre se refere ao elemento que sofreu o evento, neste caso ao elemento clicado. 
        //Como o elemento clicado é um elemento do HTML, ele se torna um objeto tradicional do 
        //Javascript dentro de nosso código. E como já sabemos, a função .text() é exclusiva de 
        //objetos jQuery, logo temos de convertê-lo antes.

        //Para converter um objeto tradicional do Javascript em um objeto jQuery, devemos fazer uso
        //da função jQuery, passando o this para ela, deste modo:

        //A função .parent() tem como objetivo navegar pela árvore de elementos do HTML. Ela por
        //padrão retorna o pai do elemento em que foi chamada
        // Podemos encadear várias chamadas a .parent() para buscar elementos mais acima
        // no caso do fadeOut funcinona para que a linha seja deletada aos poucos, sumindo,
        // porem ela apenas fica como display: none, para que ocorra a remocao precisa o remove()
        // porem se colocar logo em seguida ele vai cortar a animacao, entao poderia usar 
        // o setTimeOut, porem se colocar dessa maneira colocando a funcao como parametro
        // do fadeOut ela vai esperar a execaucao da animacao e só depois remover.
        $(this).parent().parent().fadeOut(function() {
            $(this).remove();
        });
        
        //A função .remove() , serve pare remover um elemento do HTML, como o próprio nome indica. 
        //Tome cuidado ao usá-la , pois o elemento é realmente removido e não apenas escondido, que
        //é o caso quando usamos a função .hide().
}