const palavras = [
  ["Animal", "Macaco", "Cachorro", "Orangotango", "Rinoceronte"],
  ["Fruta", "Abacate", "Tomate", "Graviola", "Cupuacu"],
];

let categoriaSorteada;
let palavraSorteada;

function sorteiaPalavra() {
  const indiceCategoriaSorteada = Math.floor(Math.random() * palavras.length);
  categoriaSorteada = palavras[indiceCategoriaSorteada][0];

  const indicePalavraSorteada =
    Math.floor(Math.random() * (palavras[indiceCategoriaSorteada].length - 1)) +
    1;
  palavraSorteada = palavras[indiceCategoriaSorteada][indicePalavraSorteada];
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
escreveDica(categoriaSorteada);
escreveSublinhados();
