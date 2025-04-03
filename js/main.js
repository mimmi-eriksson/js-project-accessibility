// correct answers with messages
const correctAnswers = ['c', 'b', 'b', 'a']
const correctMessages = [
  'Well done! The Web Content Accessibility Guidelines (WCAG) are a series of recommendations for making web content accessible to people with disabilities.',
  'Correct! Level AA tackles the biggest and most common barriers for disabled users. This is often the target for many websites.',
  'Exactly! ARIA landmarks are a way to classify and label sections of the HTML code that is conveyed visually through layout to be represented programmatically. ARIA landmark roles are used for example to make it easy for or assistive technology users to understand the meaning of the layout of a page.',
  'Great job! A keyboard trap occurs when a user is unable to navigate away from an element using only the keyboard, which can be frustrating for people who rely on keyboard navigation.'
]

// DOM selectors
const quiz = document.getElementById('quiz-form')
const startQuizButton = document.getElementById('start-button')
const questions = document.querySelectorAll('.question')
const submitButtons = document.querySelectorAll('.submit-btn')
const messageContainer = document.getElementById('message-container')
const resultsContainer = document.getElementById('results-container')
const progressFill = document.querySelector('.progress-fill')
const progressText = document.querySelector('.progress-text')

// initialize variables
let currentQuestionIndex = 0 // current question counter
let score = 0 // quiz score

// function to set the active question
const setActiveQuestion = (index) => {
  // show the active question - hide the others
  questions.forEach((question, i) => {
    if (i === index) {
      question.style.display = 'inline-flex'
      question.hidden = false
      // set focus on first option
      question.querySelector('input[type="radio"]').focus()
      question.scrollIntoView({ behaviour: 'smooth' })
    } else {
      question.style.display = 'none'
      question.hidden = true
    }

  });
}

// function to start Quiz
const startQuiz = () => {
  // show quiz
  quiz.hidden = false
  // set first question
  setActiveQuestion(currentQuestionIndex)
  // initialize progress bar
  updateProgress()
  // hide start button
  startQuizButton.style.display = 'none'
  startQuizButton.hidden = true
  //announce to the screen reader
  announcer.textcontent = 'Moved to first question'
}

// function to check selected answer
const checkAnswer = () => {
  // get radio group of current question
  const radioGroup = questions[currentQuestionIndex].querySelectorAll('input[type="radio"]')
  // loop through radio group to find selected answer
  let answer
  radioGroup.forEach(option => {
    option.checked ? (answer = option.value) : null
  })
  // check if selected answer is correct
  if (answer) {
    // clear error message if any
    clearError(questions[currentQuestionIndex].querySelector('.error'))
    // get correct answer
    const correctOption = correctAnswers[currentQuestionIndex]
    if (answer === correctOption) {
      // add 1 point to score
      score += 1
      // display feedback message
      displayFeedback(correctMessages[currentQuestionIndex])
    } else {
      // display feedback message
      const wrongMessage = `That's not quite right.. The correct answer is ${correctOption.toUpperCase()}.`
      displayFeedback(wrongMessage)
    }
  } else {
    // if no option is selected - show eror message to user to select an option
    showError(questions[currentQuestionIndex].querySelector('.error'), 'Please select your answer')
    // set focus to first option
    questions[currentQuestionIndex].querySelector('input[type="radio"]').focus()
  }
}

// show error message if no option is selected
const showError = (errorElement, message) => {
  errorElement.textContent = message
  errorElement.hidden = false
}

// clear error message 
const clearError = (errorElement) => {
  errorElement.textContent = ''
  errorElement.hidden = true
}

// show feedback message
const displayFeedback = (message) => {
  // display message
  messageContainer.innerHTML = `
        <p>${message}</p>
      `
  messageContainer.style.display = 'flex'
  messageContainer.hidden = false
  // continue button
  // if last question - show results
  if (currentQuestionIndex === (questions.length - 1)) {
    messageContainer.innerHTML += `
        <button class="continue-btn">Show results</button>
      `
  } else {
    // else - next question
    messageContainer.innerHTML += `
        <button class="continue-btn">Next question</button>
      `
  }
  // set focus to continue button
  const continueButton = messageContainer.querySelector('.continue-btn')
  continueButton.focus()
  // set event listener on the continue button based on the the message type
  continueButton.addEventListener('click', () => {
    // clear feedback message
    messageContainer.innerHTML = ''
    messageContainer.style.display = 'none'
    messageContainer.hidden = true
    // if last question - end quiz
    if (currentQuestionIndex === (questions.length - 1)) {
      endQuiz()
      //announce to the screen reader
      announcer.textContent = 'Moved to results section'
    } else {
      // else - go to next question
      const nextQuestionIndex = (currentQuestionIndex + 1)
      setActiveQuestion(nextQuestionIndex)
      currentQuestionIndex = nextQuestionIndex
      // update progress
      updateProgress()
      //announce to the screen reader
      announcer.textContent = 'Moved to next question'
    }
  })
}

// update progress function
const updateProgress = () => {
  const totalQuestions = (questions.length)
  const answeredQuestions = currentQuestionIndex + 1
  const percentage = (answeredQuestions / totalQuestions) * 100
  // update progress bar
  progressFill.style.width = `${percentage}%`
  // update progress text
  progressText.textContent = `Question ${answeredQuestions} of ${totalQuestions}`
  // announce to screen reader
  announcer.textContent = `Question ${answeredQuestions} of ${totalQuestions}`
}

// end quiz
const endQuiz = () => {
  // hide quiz
  quiz.hidden = true
  // show results
  resultsContainer.innerHTML = `
    <h2>🎉 Congratulations! 🎉</h2>
    <img src="./assets/celebration.gif" alt="celebration image" class="celebration-image">
    <p>Thank you for taking the quiz! i hope you learned something about web accessibility.</p>
    <p>Score: ${score}/${questions.length}</p>

    <button class="continue-btn" type="button">Take quiz again</button>
  `
  resultsContainer.style.display = 'flex'
  resultsContainer.hidden = false
  // set focus to button
  const continueButton = resultsContainer.querySelector('.continue-btn')
  continueButton.focus()
  // set event listener to take the quiz again
  continueButton.addEventListener('click', () => {
    // reset current question index
    currentQuestionIndex = 0
    // reset results
    score = 0
    // clear container
    resultsContainer.innerHTML = ''
    resultsContainer.style.display = 'none'
    // uncheck all radio options
    questions.forEach((question) => {
      const radios = question.querySelectorAll('input[type="radio"]')
      radios.forEach((option) => {
        option.checked = false
      })
    })
    // start quiz
    startQuiz()
  })


}

// start quiz when start button is selected
startQuizButton.addEventListener('click', startQuiz)

// check answer when submit button is selected
submitButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault() // prevent page reload
    checkAnswer()
  })
})

// event listener to handle keyboard input for questions
questions.forEach((question) => {
  const radioGroup = question.querySelector('.answer-options')
  const submitButton = question.querySelector('.submit-btn')
  // add event listener on the radio group
  radioGroup.addEventListener('keydown', (event) => {
    const optionInFocus = radioGroup.querySelector(":focus")
    // let the user select option by pressing a,b, or c
    // enter or space to select the option in focus
    switch (event.key) {
      case 'a':
      case 'A':
        event.preventDefault()
        question.querySelector('input[value="a"]').checked = true
        submitButton.focus()
        break
      case 'b':
      case 'B':
        event.preventDefault()
        question.querySelector('input[value="b"]').checked = true
        submitButton.focus()
        break
      case 'c':
      case 'C':
        event.preventDefault()
        question.querySelector('input[value="c"]').checked = true
        submitButton.focus()
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        optionInFocus.checked = true
        submitButton.focus()
        break
    }

  })

})

