const listaPalavras = [
  {
    dica: "Animal",
    palavras: ["Macaco", "Cachorro", "Orangotango", "Rinoceronte"],
  },
  { dica: "Fruta", palavras: ["Abacate", "Tomate", "Graviola", "Cupuacu"] },
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
  console.log(dica);

  const indicePalavra = Math.floor(
    Math.random() * listaPalavras[indiceObjeto].palavras.length
  );
  palavraSorteada = listaPalavras[indiceObjeto].palavras[indicePalavra];
  console.log(palavraSorteada);
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
  statusDaPalavra = palavraSorteada
    .split("")
    .map((letra) => (chute.indexOf(letra) >= 0 ? letra : "_"))
    .join("");

  document.getElementById("palavraDestacada").innerHTML = statusDaPalavra;
}

function escreveDica(dica) {
  let paragrafoDica = document.getElementById("dica");
  paragrafoDica.innerText = `A dica é: ${dica}`;
}

function escreveSublinhados() {
  let spanSublinhados = document.getElementById("sublinhados");
  for (let i = 0; i < palavraSorteada.length; i++) {
    spanSublinhados.innerHTML += `<span id=${letras[i]}> _ </span>`;
  }
}

sorteiaPalavra();
let palavraMaiuscula = palavraSorteada.toUpperCase();
let letras = palavraMaiuscula.split("");
gerarBotoes();
advinhaPalavra();
escreveDica(dica);
escreveSublinhados();
