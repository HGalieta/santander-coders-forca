const palavras = [
  ["Animal", "Macaco", "Cachorro", "Orangotango", "Rinoceronte"],
  ["Fruta", "Abacate", "Tomate", "Graviola", "Cupuacu"],
];

let categoriaSorteada;
let palavraSorteada = '';
let resposta = '';
let maxErros = 6;
let erros = 0;
let chute = [];
let statusDaPalavra = null;

function sorteiaPalavra() {
  const indiceCategoriaSorteada = Math.floor(Math.random() * palavras.length);
  categoriaSorteada = palavras[indiceCategoriaSorteada][0];

  const indicePalavraSorteada =
    Math.floor(Math.random() * (palavras[indiceCategoriaSorteada].length - 1)) +
    1;
  palavraSorteada = palavras[indiceCategoriaSorteada][indicePalavraSorteada];
}

function gerarBotoes() {
  let botoesHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letra =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letra + `'
        onClick="verificaChute('` + letra + `')"
      >
       ` + letra + `
      </button>
    `).join('');

  document.getElementById('teclado').innerHTML = botoesHTML
};

document.getElementById('maxErros').innerHTML = maxErros

function advinhaPalavra() {
  statusDaPalavra = resposta.split('').map(letra => (chute.indexOf(letra) >= 0 ? letra : '_')).join('');

  document.getElementById('palavraDestacada').innerHTML = statusDaPalavra
}

function escreveDica(dica) {
  let paragrafoDica = document.getElementById("dica");
  paragrafoDica.innerText = `A dica é: ${dica}`;
}

function escreveSublinhados() {
  for (let i = 0; i < palavraSorteada.length; i++) {
    let spanSublinhados = document.getElementById("sublinhados");
    spanSublinhados.innerHTML += "<span> _ </span>";
  }
}

sorteiaPalavra();
gerarBotoes();
advinhaPalavra();
escreveDica(categoriaSorteada);
escreveSublinhados();
