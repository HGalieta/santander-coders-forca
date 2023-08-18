const listaPalavras = [
  {
    dica: "Animal",
    palavras: ["MACACO", "CACHORRO", "ORANGOTANGO", "RINOCERONTE"],
  },
  { dica: "Fruta", palavras: ["ABACATE", "TOMATE", "GRAVIOLA", "BANANA"] },
];

let dica;
let palavraSorteada = "";
let maxErros = 6;
let erros = 0;
let chute = [];
let statusDaPalavra = null;

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

document.getElementById("maxErros").innerHTML = maxErros;

function advinhaPalavra() {
  statusDaPalavra = letras
    .map((letra) => (chute.indexOf(letra) >= 0 ? letra : " _ "))
    .join("");

  document.getElementById("palavraDestacada").innerHTML = statusDaPalavra;
}

function verificaChute(letraChutada) {
  chute.push(letraChutada.toUpperCase());
  document.getElementById(letraChutada).setAttribute("disabled", true);

  if (letras.includes(letraChutada.toUpperCase())) {
    advinhaPalavra();
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
  if (erros === maxErros) {
    document.getElementById(
      "palavraDestacada"
    ).innerHTML = `A resposta era: ${palavraSorteada}`;
    document.getElementById("teclado").innerHTML = "Você perdeu!";
    document.getElementById("resetar").innerText = "Jogar novamente";
  }
}

function adicionaErro() {
  erros++;

  document.getElementById("erros").innerText = erros;

  document
    .getElementById("imagemForca")
    .setAttribute("src", `imagens/forca${erros}.png`);
}

function escreveDica(dica) {
  let paragrafoDica = document.getElementById("dica");
  paragrafoDica.innerText = `A dica é: ${dica}`;
}

function limpar() {
  erros = 0;
  chute = [];
  document.getElementById("imagemForca").src = "./imagens/forca0.png";
  document.getElementById("erros").innerText = erros;

  sorteiaPalavra();
  gerarBotoes();
  advinhaPalavra();
  escreveDica(dica);
  document.getElementById("resetar").innerText = "Resetar Jogo";
}

sorteiaPalavra();
let palavraMaiuscula = palavraSorteada.toUpperCase();
let letras = palavraMaiuscula.split("");
gerarBotoes();
advinhaPalavra();
escreveDica(dica);
