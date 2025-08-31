const slider = new Siema({
    loop: true
})

/*const buttonPrev = document.querySelector(".prev")*/
const buttonNext = document.querySelector(".next")

/*buttonPrev.addEventListener("click", () => slider.prev())*/
buttonNext.addEventListener("click", () => slider.next())

/*FAQ*/ 

const buttons = document.querySelectorAll('button');

buttons.forEach( button =>{
    button.addEventListener('click',()=>{
        const faq = button.nextElementSibling;
        const icon = button.children[1];

        faq.classList.toggle('show');
        icon.classList.toggle('rotate');
    })
} )