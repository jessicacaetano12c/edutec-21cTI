const body = document.querySelector("body")

function inserirResultado() {
    const sectionPontuacao = document.querySelector(".pontuacao")
    const pontos = localStorage.getItem("pontos")

    sectionPontuacao.innerHTML = `
    <div class="acertos">
 
                <div class="variavel">
                    <strong class="potuacao">${pontos}</strong>
                <h1>acertos de</h1>
                </div>
                <h1> 10 questões</h1>

               </div>
    `
}

inserirResultado()