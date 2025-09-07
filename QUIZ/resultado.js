const body = document.querySelector("body")

function inserirResultado() {
    const sectionPontuacao = document.querySelector(".pontuacao")
    const pontos = localStorage.getItem("pontos")

    sectionPontuacao.innerHTML = `
    <div class="acertos">
 
                <div class="variavel">
                    <strong class="potuacao">${pontos}</strong>
                <h2>acertos de</h2>
                </div>
                <h2> 10 questões</h2>

               </div>
    `
}

inserirResultado()