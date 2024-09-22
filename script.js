let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const result = document.getElementById('result');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = `${option.key}. ${option.value}`;
        button.addEventListener('click', () => selectOption(button));
        optionsContainer.appendChild(button);
    });

    submitBtn.style.display = 'block';
    nextBtn.style.display = 'none';
    result.textContent = '';
}

function selectOption(selectedButton) {
    document.querySelectorAll('.option').forEach(button => {
        button.classList.remove('selected');
    });
    selectedButton.classList.add('selected');
}

function submitAnswer() {
    const selectedOption = document.querySelector('.option.selected');
    if (!selectedOption) {
        alert('请选择一个答案！');
        return;
    }

    const userAnswer = selectedOption.textContent.charAt(0);
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
        result.textContent = '回答正确！';
        score++;
    } else {
        result.textContent = `回答错误。正确答案是：${correctAnswer}`;
    }

    submitBtn.style.display = 'none';
    nextBtn.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    questionText.textContent = '答题结束！';
    optionsContainer.innerHTML = '';
    result.textContent = `您的得分是：${score} / ${questions.length}`;
    submitBtn.style.display = 'none';
    nextBtn.style.display = 'none';
}

submitBtn.addEventListener('click', submitAnswer);
nextBtn.addEventListener('click', nextQuestion);

// 确保在DOM加载完成后再执行loadQuestion
document.addEventListener('DOMContentLoaded', loadQuestion);
