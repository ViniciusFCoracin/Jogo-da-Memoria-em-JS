// Uma NodeList que contém referências as 48 divs que representam as peças do jogo.
const pieces = document.querySelectorAll("div .piece");

//Um map que relaciona os nomes dos países com suas respectivas URLs das bandeiras
const flags = new Map();
flags.set("Antigua e Barbuda", "url('AntiguaEBarbuda.png')");
flags.set("Australia", "url(Australia.png)");
flags.set("Barbados", "url(Barbados.png)");
flags.set("Brazil", "url(Brazil.png)");
flags.set("Brunei", "url(Brunei.jfif)");
flags.set("Croatia", "url(Croatia.png)");
flags.set("Dominica", "url(Dominica.png)");
flags.set("Germany", "url(Germany.png)");
flags.set("Iceland", "url(Iceland.png)");
flags.set("Iran", "url(Iran.png)");
flags.set("Kazakhstan", "url(Kazakhstan.png)");
flags.set("Malawi", "url(Malawi.png)");
flags.set("Mongolia", "url(Mongolia.png)");
flags.set("Panama", "url(Panama.png)");
flags.set("Paraguai", "url(Paraguai.png)");
flags.set("Portugal", "url(Portugal.png)");
flags.set("SaintLucia", "url(SaintLucia.png)");
flags.set("San Marino", "url(SanMarino.png)");
flags.set("Slovenia", "url(Slovenia.png)");
flags.set("South Africa", "url(SouthAfrica.png)");
flags.set("Sri Lanka", "url('SriLanka.png')");
flags.set("Tunisia", "url(Tunisia.png)");
flags.set("Uganda", "url(Uganda.png)")
flags.set("Uruguai", "url(Uruguai.png)");
flags.set("Vanuatu", "url(Vanuatu.png)");
flags.set("Zimbabwe", "url(Zimbabwe.png)");

function sortear() {
      //Array contendo o nome de todos os países presentes em flags
      let countries = [];
      for (let key of flags.keys()) {
            countries.push(key);
            countries.push(key);
      }

      /*
       * Cria um Array chamado ordem, inicialmente vazio. Um elemento 
       * aleatório de countries é então sorteado e adicionado no final de 
       * ordem. Esse elemento é removido de countries. O processo se repete
       * até que 48 elementos tenham sido removidos de countries e 
       * adicionados em ordem em uma ordem aleatória. Note que esse processo,
       * além de tornar aleatória a ordenação das bandeiras, também escolhe
       * 24 delas ao acaso.
       */
      let ordem = []
      for (let i = 0; i < 48; i++) {
            let n = Math.round(Math.random() * (countries.length - 1));
            ordem.push(countries[n]);
            delete countries[n];
            countries = countries.filter(() => true);
      }

      /*
       * A ordem aleatória dos elementos de ordem é então utilizada para
       * atribuir as imagens nas <divs> que representam as peças. A informação
       * de qual país foi atribuído a cada div é feita através do atributo data-country.
       */

      for (let n = 0; n < ordem.length; n++) {
            pieces[n].dataset.country = ordem[n];
            pieces[n].addEventListener("click", virar);
      }
}

// Array que salva qual peça está momentaneamente virada.
let peçasViradas = [];

// Memoriza a quantidade de pontos que o jogador já fez (máximo de 24).
let pontos = 0;

function virar(event) {
      let viradaAgora = event.target;

      // Se o jogador clicar duas vezes seguidas na mesma peça, não faz nada.
      if (peçasViradas.indexOf(viradaAgora) !== -1) return;

      else {
            // Adiciona a imagem na div e adiciona-a em peçasViradas.
            viradaAgora.classList.add("virada");
            viradaAgora.style.backgroundImage = flags.get(viradaAgora.dataset.country);
            peçasViradas.push(viradaAgora);

            // A primeira peça clicada dispara o cronômetro
            if (peçasViradas.length === 1 && pontos === 0) {
                  ativarTemp();
            }

            // Ao acertar um par...
            else if (peçasViradas.length === 2 &&
                  peçasViradas[0].dataset.country === peçasViradas[1].dataset.country) {
                  peçasViradas[0].classList.add("acertado");
                  peçasViradas[1].classList.add("acertado");
                  peçasViradas[0].removeEventListener("click", virar);
                  peçasViradas[1].removeEventListener("click", virar);
                  peçasViradas = [];
                  pontos++;
                  if (pontos === 24){
                        window.alert("Parabéns, você venceu! Atualize a página para jogar novamente.");
                        document.querySelector("#temporizador").removeEventListener("animationend", perdeu)
                  }
            }
            // Ao errar um par e clicar na próxima peça...
            else if (peçasViradas.length === 3) {
                  peçasViradas[0].style.backgroundImage = "none";
                  peçasViradas[1].style.backgroundImage = "none";
                  peçasViradas[0].classList.remove("virada");
                  peçasViradas[1].classList.remove("virada");
                  peçasViradas = [viradaAgora];
            }
      }


}

// Ativa o cronômetro. Quando ele zerar, dispara uma função que finaliza o jogo.
function ativarTemp() {
      const temp = document.querySelector("#temporizador");
      temp.style.animationPlayState = "running";
      temp.addEventListener("animationend", perdeu);
}

// Função que finaliza o jogo
function perdeu() {
      for (let piece of pieces){
            piece.removeEventListener("onclick", virar);
      }
      window.alert("Você perdeu! Atualize a página para jogar novamente.");
}

// Ao carregar a página, ativa a função que sorteia os países.
window.addEventListener("load", sortear);