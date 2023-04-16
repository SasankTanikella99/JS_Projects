const number1 = Math.ceil(Math.random() *100)
const number2 = Math.ceil(Math.random() *100)

const question_element = document.getElementById("question"); 

const form_element = document.getElementById("form");

const input_element = document.getElementById("input");

const score_element = document.getElementById("score");




let score = JSON.parse(localStorage.getItem("score"));

if(!score){
    score = 0;
}
score_element.innerText = `score: ${score} `;

question_element.innerText = `What is ${number1} multiplied by ${number2} ? `;

const correct_answer = number1 * number2;

form_element.addEventListener("submit", () => {
    const user_answer = +input_element.value; 
    if(user_answer === correct_answer){
        score++;
        updatelocal_storage()
    } else{
        score--;
        updatelocal_storage()
    } 
});

function updatelocal_storage(){
    localStorage.setItem("score", JSON.stringify(score))
}



