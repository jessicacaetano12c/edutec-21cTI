const body = document.querySelector("body")
const biologia = "biologia"

let quiz = {}
let pontos = 0
let pergunta = 1
let resposta = ""
let idInputResposta = ""
let respostaCorretaId = ""

async function buscarPerguntas() {
    const urlDados = "./data.json"
    await fetch(urlDados).then(resposta => resposta.json()).then(dados => {
        dados.quiz.forEach(dado => {
            if (dado.title = biologia) {
                quiz = dado
            }
        }
        )
    })

    console.log(quiz)
}


function montarPergunta() {
    const main = document.querySelector("main")

    main.innerHTML = `
       <section class="pergunta">
                        <h2 class="quiz-pergunta" id="pergunta">${quiz.questions[pergunta-1].question}</h2>
                    </section>

                   <div class="botoes">
                    <section class="respostas" id="respostas">

                        <form action="">
                            <label for="resposta1" class="btn">
                                <input type="radio" id="resposta1" name="resposta" value="${quiz.questions[pergunta-1].options[0]}">
                                <div>
                                    ${quiz.questions[pergunta-1].options[0]}
                                </div>
                            </label>
                            <label for="resposta2" class="btn">
                                <input type="radio" id="resposta2" name="resposta" value="${quiz.questions[pergunta-1].options[1]}">
                                <div>
                                ${quiz.questions[pergunta-1].options[1]}
                                </div>
                            </label>
                            <label for="resposta3" class="btn">
                                <input type="radio" id="resposta3" name="resposta" value="${quiz.questions[pergunta-1].options[2]}">
                                <div>
                                ${quiz.questions[pergunta-1].options[2]}
                                </div>
                            </label>
                            <label for="resposta4" class="btn">
                                <input type="radio" id="resposta4" name="resposta" value="${quiz.questions[pergunta-1].options[3]}">
                                <div>
                                ${quiz.questions[pergunta-1].options[3]}
                                </div>
                            </label>

                        </form>
                        <button class="proxima" id="proxima">Responder</button>
                    </section>
    `
}

function guardarResposta(evento) {
    resposta = evento.target.value
    idInputResposta = evento.target.id

    const botaoEnviar = document.querySelector(".respostas button")
    botaoEnviar.addEventListener("click", validarResposta)
    
}

function validarResposta() {
    const botaoEnviar = document.querySelector(".respostas button")
    botaoEnviar.innerText = "Próxima"
    botaoEnviar.removeEventListener("click", validarResposta)
    

    if (pergunta === 10) {
        botaoEnviar.innerText = "Finalizar"
       botaoEnviar.addEventListener("click", finalizar)
    } else {
        botaoEnviar.addEventListener("click", proximaPergunta)
    }

    if (resposta === quiz.questions[pergunta-1].answer) {
        document.querySelector (`label[for='${idInputResposta}']`).setAttribute("id", "correta")
        pontos = pontos + 1;
    } else {
        document.querySelector (`label[for='${idInputResposta}']`).setAttribute("id", "errada")
        document.querySelector (`label[for='${respostaCorretaId}']`).setAttribute("id", "corrige")
    }

    pergunta = pergunta + 1
}

function finalizar() {
    localStorage.setItem("pontos", pontos)

    window.location.href = "./resultado.html"
}

function proximaPergunta() {
    montarPergunta()
    adicionarEventoInputs()
}

function adicionarEventoInputs() {
    const inputsRespostas = document.querySelectorAll(".respostas input") 
        inputsRespostas.forEach(input => {
            input.addEventListener("click", guardarResposta)

            if (input.value === quiz.questions[pergunta-1].answer) {
                    respostaCorretaId = input.id
            }
        })
}

async function iniciar() {
    await buscarPerguntas()
    montarPergunta()
    adicionarEventoInputs()
} 

iniciar()
