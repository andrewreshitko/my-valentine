const contentArea = document.getElementById('content-area');
const recipientName = "Irina";

/* 
  CHAOS LEVEL: 4 
  - Slight rotations
  - Random floating hearts
*/

// Configuration & State
let currentStepIndex = 0;

// Helper to generate standard steps
const createStep = (id, renderFn, logicFn) => ({ id, render: renderFn, logic: logicFn });

// --- STEP GENERATION HELPER ---
// Simplifies creating quiz/math questions
function createQuestionStep(id, question, options, correctIndex, wrongMessage) {
    return {
        id: id,
        render: () => {
            let buttonsHtml = '';
            options.forEach((opt, idx) => {
                const isCorrect = idx === correctIndex;
                const onClick = isCorrect ? 'nextStep()' : `handleWrongAnswer(this, '${wrongMessage}')`;
                buttonsHtml += `<button onclick="${onClick}">${opt}</button>`;
            });

            return `
                <div class="fade-in">
                    <p>${question}</p>
                    <div class="buttons-grid">
                        ${buttonsHtml}
                    </div>
                    <p id="message-area-${id}" class="message-text"></p>
                </div>
            `;
        }
    };
}

// --- STEPS DATA ---
const steps = [
    // 1. Welcome
    {
        id: 1,
        render: () => `
            <div class="fade-in">
                <h1>Happy Valentine’s Day ❤️</h1>
                <p>Welcome, ${recipientName}.<br>This is a very serious Chaotic Cute Love Quest.</p>
                <div class="buttons-container">
                    <button onclick="nextStep()">Start</button>
                </div>
            </div>
        `
    },
    // 2. Emotional Intro
    {
        id: 2,
        render: () => `
            <div class="fade-in">
                <p>Before we begin…</p>
                <p>This little project exists for one simple reason.</p>
                <p>It was inspired by my feelings for you, ${recipientName}.<br>By how much you mean to me.</p>
                <p>And by how happy you make my world. ❤️</p>
                <div class="buttons-container">
                    <button onclick="nextStep()">Continue 🥺</button>
                </div>
            </div>
        `
    },
    // 3. Readiness
    {
        id: 3,
        render: () => `
            <div class="fade-in">
                <p>Are you ready for something cute, silly, and slightly chaotic?</p>
                <div class="buttons-container">
                    <button onclick="nextStep()">Yes</button>
                    <button onclick="handleNo(this, 'Too late. Chaos has already noticed you 😌', true)">No</button>
                </div>
                <p id="message-area-3" class="message-text"></p>
            </div>
        `
    },
    // --- MATH SECTION ---
    createQuestionStep(4, "First, a serious math test.<br>What is 7 + 5?", ["10", "12", "11", "Potato"], 1, "Check your calculator 🧮"),
    createQuestionStep(5, "If we have 2 hearts and add 3 more, how many hearts is that? ❤️", ["4", "5 (and lots of love)", "Too many", "Not enough"], 1, "Count the emojis! ❤️"),
    createQuestionStep(6, "What is 10 × 2?", ["20", "12", "100", "22"], 0, "Math is hard, isn't it?"),
    createQuestionStep(7, "Advanced Calculus: 1 + 1 = ?", ["2", "11", "Window", "Us 👩‍❤️‍💋‍👨"], 3, "While technically 2 is correct, 'Us' is the cuter answer! Try again!"),

    // --- LOGIC SECTION ---
    createQuestionStep(8, "Which of these is clearly NOT like the others?", ["Love", "Happiness", "Pizza", "Anxiety"], 3, "Try again... (Hint: It's the bad one)"),
    createQuestionStep(9, "What improves any bad day?", ["Coffee", "Sleep", "A hug", "All of the above"], 3, "I mean... yes, but ALL of them is better!"),
    createQuestionStep(10, "Who makes Andrew the happiest?", ["Pizza", "Coding", "You", "Sleep"], 2, "I love pizza/coding/sleep, but NOPE!"),

    // --- QUIZ SECTION ---
    createQuestionStep(11, "Be honest. Who is beautiful?", ["You", "You", "You", "You"], 0, "Correct! (There was no wrong answer)"),
    createQuestionStep(12, "What is the secret ingredient?", ["Salt", "Sugar", "Love", "Chaos"], 2, "It's always Love (and maybe a little Chaos)"),
    createQuestionStep(13, "Where is my heart?", ["In my chest", "In your hands", "Lost", "At the gym"], 1, "Technically in my chest, but metaphorically?"),
    createQuestionStep(14, "Who is the boss?", ["Me", "You", "The Cat", "Equal Partnership"], 1, "Let's be real... 😉"),
    createQuestionStep(15, "Favorite color?", ["Red", "Pink", "Blue", "Your Eyes"], 3, "Smooth, right?"),
    createQuestionStep(16, "Best date idea?", ["Dinner", "Movie", "Walk", "Doing nothing together"], 3, "Just being with you is the best."),
    createQuestionStep(17, "How much do I love you?", ["A little", "A lot", "To the moon", "Infinitely"], 3, "It's never-ending!"),
    createQuestionStep(18, "Who is the kindest soul?", ["Santa", "You", "Me", "A puppy"], 1, "You win, hands down."),
    createQuestionStep(19, "Are we a good team?", ["Yes", "Maybe", "No", "The Best"], 3, "We are the absolute best."),
    createQuestionStep(20, "Will you keep me?", ["Yes", "No", "Maybe", "Forever"], 3, "Forever sounds good."),

    // --- SPECIAL MECHANICS ---
    {
        id: 21,
        render: () => `
            <div class="fade-in">
                <p>Would you choose me over pizza?</p>
                <p class="hint-text">That "No" button looks nervous…</p>
                <div class="buttons-container" style="height: 150px; position: relative;">
                    <button onclick="nextStep()" style="z-index: 10;">Yes</button>
                    <button id="no-btn-move" class="moving-btn">No</button>
                </div>
            </div>
        `,
        logic: () => { initMovingButton(); }
    },

    // --- CHECK IN ---
    {
        id: 22,
        render: () => `
            <div class="fade-in">
                <p>Are you having fun?</p>
                <div class="buttons-container">
                    <button onclick="nextStep()">Yes! 💕</button>
                    <button onclick="nextStep()">Absolutely! 😍</button>
                </div>
            </div>
        `
    },
    {
        id: 23,
        render: () => `
            <div class="fade-in">
                <p>Do you feel loved?</p>
                <div class="buttons-container">
                    <button onclick="nextStep()">Yes</button>
                    <button onclick="createHeartBurst(); handleNo(this, 'Error 404: Love level too high 💞', false)">No</button>
                </div>
                <p id="message-area-23" class="message-text"></p>
            </div>
        `
    },

    // --- LEAD UP TO END ---
    {
        id: 24, // Fake suspense
        render: () => `
            <div class="fade-in">
                <p id="suspense-text">Analyzing answers...</p>
                <div class="spinner"></div>
            </div>
        `,
        logic: () => {
            setTimeout(() => {
                const suspenseText = document.getElementById('suspense-text');
                if (suspenseText) suspenseText.innerText = "Consulting the universe...";
                setTimeout(() => {
                    nextStep();
                }, 2000);
            }, 2000);
        }
    },

    // --- FINAL ASK ---
    {
        id: 25,
        render: () => `
            <div class="fade-in">
                <p>${recipientName}, will you be my Valentine?</p>
                <div class="buttons-container">
                    <button onclick="nextStep()">Yes ❤️</button>
                    <button onclick="nextStep()">Of course 💘</button>
                </div>
            </div>
        `
    },

    // --- QUEST COMPLETED + LETTER REVEAL ---
    {
        id: 26,
        render: () => `
            <div class="fade-in">
                <h1>Quest completed 🎉</h1>
                <p>Congratulations, ${recipientName}.</p>
                <p>You have unlocked a special message.</p>
                <div class="buttons-container">
                    <button onclick="revealLetter()">Read Letter 💌</button>
                </div>
            </div>
        `
    },

    // --- LETTER CONTENT (Hidden step effectively, handled by revealLetter) ---
    {
        id: 27,
        render: () => `
             <div class="fade-in letter-content">
                <h2>My Dearest Irina</h2>
                <p>I want you to know something important.</p>
                <p>I love you deeply.</p>
                <p>I love the life we are building together.</p>
                <p>I love the future that is waiting for us.</p>
                <p><strong>Very soon, our daughter will be born.</strong></p>
                <p>And I already know this:<br>
                You will be the best mother in the world.</p>
                <p>I admire your kindness, your strength, and your heart.</p>
                <p>I am endlessly grateful for you.</p>
                <p>And I love you more than words (or code) can express. ❤️</p>
                <br>
                <h2>Happy Valentine’s Day!</h2>
            </div>
        `,
        logic: () => {
            setInterval(createHeart, 300); // More hearts
        }
    }
];

// --- LOGIC FUNCTIONS ---

function renderStep(index) {
    if (index >= steps.length) return;

    const step = steps[index];
    contentArea.innerHTML = step.render();

    // Add gentle rotation to card for chaos
    const randomRot = (Math.random() * 2 - 1).toFixed(1); // -1 to 1 deg
    document.documentElement.style.setProperty('--chaos-rotation', `${randomRot}deg`);

    if (step.logic) {
        step.logic();
    }
}

function nextStep() {
    createHeartBurst();
    currentStepIndex++;
    renderStep(currentStepIndex);
}

function revealLetter() {
    nextStep();
}

function handleWrongAnswer(btn, message) {
    // Find local message area
    const stepId = steps[currentStepIndex].id;
    const msgArea = document.getElementById(`message-area-${stepId}`);
    if (msgArea) msgArea.innerText = message;

    // Shake animation
    const card = document.querySelector('.card');
    card.classList.remove('shake');
    void card.offsetWidth; // trigger reflow
    card.classList.add('shake');
}

function handleNo(btn, message, proceed) {
    // Legacy handleNo for "Yes/No" specific steps
    const stepId = steps[currentStepIndex].id;
    const msgArea = document.getElementById(`message-area-${stepId}`) || document.getElementById('message-area');
    // Fallback ID for manually created steps (2, 3 etc) if I didn't update their render strings properly...
    // Let's fix the render strings in the main array to have dynamic IDs or just look for ANY message-area in current step.

    // Better way: query selector inside contentArea
    const currentMsgArea = contentArea.querySelector('.message-text');
    if (currentMsgArea) currentMsgArea.innerText = message;

    const card = document.querySelector('.card');
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');

    if (proceed) {
        setTimeout(() => {
            nextStep();
        }, 1500);
    }
}

// Moving Button Logic
function initMovingButton() {
    const btn = document.getElementById('no-btn-move');
    if (!btn) return;

    const moveBtn = () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const btnWidth = btn.offsetWidth;
        const btnHeight = btn.offsetHeight;

        const x = Math.random() * (viewportWidth - btnWidth - 40) + 20;
        const y = Math.random() * (viewportHeight - btnHeight - 40) + 20;

        btn.style.position = 'fixed';
        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
    };

    btn.addEventListener('mouseenter', moveBtn);
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveBtn();
    });
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        moveBtn();
    });
}

// Visual Effects
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-bg');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 5 + 5 + 's';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);
}

function createHeartBurst() {
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, i * 100);
    }
}

// Global style for spinner
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
.spinner {
    margin: 20px auto; 
    width: 40px; 
    height: 40px; 
    border: 4px solid #ffb3c1; 
    border-top: 4px solid #ff4d6d; 
    border-radius: 50%; 
    animation: spin 1s linear infinite;
}
.message-text {
    min-height: 20px; 
    margin-top: 10px; 
    font-size: 0.9rem; 
    color: var(--accent-color);
}
.hint-text {
    font-size: 0.9rem; 
    opacity: 0.7;
    margin-bottom: 20px;
}
`;
document.head.appendChild(styleSheet);

// Initialize
setInterval(createHeart, 2000);
renderStep(0);
