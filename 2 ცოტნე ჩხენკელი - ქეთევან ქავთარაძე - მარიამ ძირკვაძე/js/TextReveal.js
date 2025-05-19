import {hglight,highlighttxt} from "./highlightCode.js";


const text = `\n
1 const stripe = require('stripe')('sk_test_BQokikJOvBi2Hl4olfQ2'\n
2 await stripe.paymentIntents.create({\n
3       amount: 2000,\n
4       currency: 'usd'\n
5 });`;
const animatedTextElement = document.querySelector(".animation-target");

function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    
    return (
        rect.top >= (window.innerHeight - 1537) &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || html.clientHeight) &&
        rect.right <= (window.innerWidth || html.clientWidth)
    );
}

let index = 0;
function revealText() {
    if(isInViewport(animatedTextElement)){
        if (index < text.length) {
            animatedTextElement.textContent += text[index];
            index++;
            setTimeout(revealText, 15); // Adjust speed by changing timeout value
        }
    }

    hglight();
}

const codeBlock = document.querySelector(".animation-target");

document.addEventListener("scroll" ,()=>{
    if(!codeBlock.classList.contains("played")){

        revealText();
        codeBlock.classList.add("played")
    }
});

highlighttxt();

