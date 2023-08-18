const listaPalavras = [
  {
    dica: "Animal",
    palavras: ["MACACO", "CACHORRO", "ORANGOTANGO", "RINOCERONTE", "AVESTRUZ"],
  },
  {
    dica: "Fruta",
    palavras: ["ABACATE", "TOMATE", "GRAVIOLA", "BANANA", "SERIGUELA"],
  },
  {
    dica: "Profissão",
    palavras: ["PROFESSOR", "MEDICO", "DESENVOLVEDOR", "MOTORISTA", "PADEIRO"],
  },
  {
    dica: "Doce",
    palavras: ["DONNUT", "TIRAMISSU", "CUPCAKE", "SORVETE", "MARSHMALLOW"],
  },
  {
    dica: "Marcas em geral",
    palavras: ["LYCRA", "GILLETTE", "XEROX", "TUPPERWARE", "BOMBRIL"],
  },
  {
    dica: "Microsoft",
    palavras: ["TYPESCRIPT", "POWERPOINT", "VISUALSTUDIO", "WINDOWS", "XBOX"],
  },
];

let dica;
let palavraSorteada = "";
let maxErros = 6;
let errosDoUsuario = 0;
let chutes = [];
let statusDaPalavra = null;
let letras = [];
document.getElementById("maxErros").innerHTML = maxErros;
inicializaJogo();

function inicializaJogo() {
  sorteiaPalavra();
  let palavraMaiuscula = palavraSorteada.toUpperCase();
  letras = palavraMaiuscula.split("");
  gerarBotoes();
  escrevePalavra();
  escreveDica(dica);
}

function sorteiaPalavra() {
  const indiceObjeto = Math.floor(Math.random() * listaPalavras.length);
  dica = listaPalavras[indiceObjeto].dica;

  const indicePalavra = Math.floor(
    Math.random() * listaPalavras[indiceObjeto].palavras.length
  );
  palavraSorteada = listaPalavras[indiceObjeto].palavras[indicePalavra];
}

function gerarBotoes() {
  let botoesHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letra) =>
        `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` +
        letra +
        `'
        onClick="verificaChute('` +
        letra +
        `')"
      >
       ` +
        letra +
        `
      </button>
    `
    )
    .join("");

  document.getElementById("teclado").innerHTML = botoesHTML;
}

function escrevePalavra() {
  statusDaPalavra = letras
    .map((letra) => (chutes.indexOf(letra) >= 0 ? letra : " _ "))
    .join("");

  document.getElementById("palavraDestacada").innerHTML = statusDaPalavra;
}

function escreveDica(dica) {
  let paragrafoDica = document.getElementById("dica");
  paragrafoDica.innerText = `A dica é: ${dica}`;
}

function verificaChute(letraChutada) {
  chutes.push(letraChutada.toUpperCase());
  document.getElementById(letraChutada).setAttribute("disabled", true);

  if (letras.includes(letraChutada.toUpperCase())) {
    escrevePalavra(letras);
    verificaSeGanhou();
  } else {
    adicionaErro();
    verificaSePerdeu();
  }
}

function verificaSeGanhou() {
  if (statusDaPalavra === palavraSorteada) {
    document.getElementById("teclado").innerHTML = "Você ganhou!";
    document.getElementById("resetar").innerText = "Jogar novamente";
  }
}

function verificaSePerdeu() {
  if (errosDoUsuario === maxErros) {
    document.getElementById(
      "palavraDestacada"
    ).innerHTML = `A resposta era: ${palavraSorteada}`;
    document.getElementById("teclado").innerHTML = "Você perdeu!";
    document.getElementById("resetar").innerText = "Jogar novamente";
  }
}

function adicionaErro() {
  errosDoUsuario++;

  document.getElementById("erros").innerText = errosDoUsuario;

  document.getElementById(
    "imagemForca"
  ).src = `imagens/forca${errosDoUsuario}.png`;
}

function limpar() {
  errosDoUsuario = 0;
  chutes = [];
  document.getElementById("imagemForca").src = "./imagens/forca0.png";
  document.getElementById("erros").innerText = errosDoUsuario;
  document.getElementById("resetar").innerText = "Resetar Jogo";

  inicializaJogo();
}
