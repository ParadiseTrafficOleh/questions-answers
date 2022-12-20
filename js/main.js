import data from '../data.js';

const questions = data.questions
const questionsElement = document.querySelector('.questions')

const answersData = {
    answers: [],
    formData: {}
}

// Generating elements
// questions.forEach((element, index) => {
//     let questionsBlock = document.createElement('div')
//     questionsBlock.classList.add('questions__block')
//     questionsBlock.innerHTML = `
//     <h2 class="questions__question">${element.question}</h2>
//     <div class="questions__answers_container">
//         <p class="questions__answer" ${element.answers[0].correct ? 'questions___correct_answer' : ''}>${element.answers[0].text}</p>
//         <p class="questions__answer" ${element.answers[0].correct ? 'questions___correct_answer' : ''}>${element.answers[1].text}</p>
//         <p class="questions__answer" ${element.answers[0].correct ? 'questions___correct_answer' : ''}>${element.answers[2].text}</p>
//     </div>
//     <p class="questions__number">${index + 1} / ${questions.length}</p>
//     `
//     questionsContainer.appendChild(questionsBlock)
// })

questions.forEach((element, index) => {
    let questionsContainer = document.createElement('div')
    questionsContainer.classList.add('questions__cointainer')
    if(element.form) {
        questionsContainer.innerHTML = `
        <form action="#" class="questions__form">
            <div class="questions__form_group">
                <label for="first-name" class="questions__form_label">First Name</label>
                <input id="first-name" type="text" class="questions__form_input">
            </div>
            <div class="questions__form_group">
                <label for="first-name" class="questions__form_label">Last Name</label>
                <input id="last-name" type="text" class="questions__form_input">
            </div>
            <div class="questions__form_group">
                <button id="submit" type="submit" class="questions__form_submit">Submit</button>
            </div>
        </form>
        <div class="questions__navigation_container">
            <p class="questions__prev">Prev</p>
            <p class="questions__number">${index + 1} / ${questions.length}</p>
            <p class="questions__next questions___inactive_nav">Next</p>
        </div>
        `
    } else {
        questionsContainer.innerHTML = `
    <div class="questions__block">
        <h2 class="questions__question">${element.question}</h2>
        <div class="questions__answers_container">
            <p class="questions__answer ${element.answers[0].correct ? 'questions___correct_answer' : ''}">${element.answers[0].text}</p>
            <p class="questions__answer ${element.answers[1].correct ? 'questions___correct_answer' : ''}">${element.answers[1].text}</p>
            <p class="questions__answer ${element.answers[2].correct ? 'questions___correct_answer' : ''}">${element.answers[2].text}</p>
        </div>
    </div>
    <div class="questions__navigation_container">
            <p class="questions__prev">Prev</p>
            <p class="questions__number">${index + 1} / ${questions.length}</p>
            <p class="questions__next questions___inactive_nav">Next</p>
    </div>
    `
    }
    
    questionsElement.appendChild(questionsContainer)
})
// Generating elements end


//  Slider
let slideIndex = 1;

function plusQuestion (n) {
    showQuestions(slideIndex += n);
}

const showQuestions = (n) => {
    let i
    let questions = document.getElementsByClassName("questions__cointainer")
    if (n > questions.length) {slideIndex = 1}
    if (n < 1) {slideIndex = 1}
    for (i = 0; i < questions.length; i++) {
        questions[i].style.display = "none"
    }
    questions[slideIndex-1].style.display = "flex"
}

showQuestions(slideIndex);

document.querySelectorAll('.questions__prev').forEach(item => {
    item.addEventListener('click', e => plusQuestion(-1))
})
document.querySelectorAll('.questions__next').forEach(item => {
    item.addEventListener('click', e => plusQuestion(1))
})
//  Slider end


// Answer
document.querySelectorAll('.questions__answer').forEach(item => {
    item.addEventListener('click', e => {
        e.target.closest('.questions__cointainer').classList.add('questions___answered')
        e.target.classList.add('questions___selected_answer')
        let question = e.target.closest('.questions__block').querySelector('.questions__question').textContent
        let selectedAnswer = e.target.textContent
        let correctAnswer = e.target.closest('.questions__answers_container').querySelector('.questions___correct_answer').textContent
        let corretclyAnswerd = selectedAnswer === correctAnswer
        let data = {
            question,
            selectedAnswer,
            correctAnswer,
            corretclyAnswerd
        }

        answersData.answers.push(data)
        setTimeout(() => {
            plusQuestion(1)
        }, 1000)
    })
})
// Answer end


// Form submit
const firstName = document.getElementById('first-name')
const lastName = document.getElementById('last-name')

document.getElementById('submit').addEventListener('click', e => {
    e.preventDefault()

    if(firstName.value && lastName.value) {
        answersData.formData.firstName = firstName.value
        answersData.formData.lastName = lastName.value

        console.log('answersData:', answersData)
        alert(`${firstName.value} ${lastName.value} your data was submitted`)
    } else {
        alert('Please fill in all fields')
    }
})
// Form submit end



