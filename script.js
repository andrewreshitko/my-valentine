const contentArea = document.getElementById('content-area');

const recipientName = "Irina";

/* 
  CHAOS LEVEL: 4 
  - Slight rotations
  - Random floating hearts
  - Button evasions
*/

// Steps Data
const steps = [
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
    {
        id: 2,
        render: () => `
            <div class="fade-in">
                <p>Are you ready for something cute, silly, and slightly chaotic?</p>
                <div class="buttons-container">
                    <button onclick="nextStep()">Yes</button>
                    <button onclick="handleNo(this, 'Too late. Chaos has already noticed you 😌', true)">No</button>
                </div>
                <p id="message-area" class="message-text"></p>
            </div>
        `
    },
    {
        id: 3,
        render: () => `
            <div class="fade-in">
                <p>${recipientName}, do you know how amazing you are?</p>
                <div class="buttons-container">
                    <button onclick="nextStep()">Yes</button>
                    <button onclick="handleNo(this, 'That answer seems incorrect 💖', false)">No</button>
                </div>
                <p id="message-area" class="message-text"></p>
            </div>
        `
    },
    {
        id: 4,
        render: () => `
            <div class="fade-in">
                <p>Do you enjoy spending time with me?</p>
                <div class="buttons-container">
                    <button onclick="nextStep()">Yes</button>
                    <button onclick="handleNo(this, 'Hmm. That button felt suspicious 🤨', false)">No</button>
                </div>
                <p id="message-area" class="message-text"></p>
            </div>
        `
    },
    {
        id: 5,
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
        logic: () => {
            initMovingButton();
        }
    },
    {
        id: 6,
        render: () => `
            <div class="fade-in">
                <p>Pick the correct answer:</p>
                <div class="buttons-container">
                    <button onclick="nextStep()">Absolutely yes 💕</button>
                    <button onclick="nextStep()">Definitely yes 😍</button>
                </div>
            </div>
        `
    },
    {
        id: 7,
        render: () => `
             <div class="fade-in">
                <p>Do you feel loved?</p>
                <div class="buttons-container">
                    <button onclick="nextStep()">Yes</button>
                    <button onclick="createHeartBurst(); handleNo(this, 'Error 404: Love level too high 💞', false)">No</button>
                </div>
                <p id="message-area" class="message-text"></p>
            </div>
        `
    },
    {
        id: 8, // Fake suspense
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
    {
        id: 9, // Final Question
        render: () => `
            <div class="fade-in">
                <p>${recipientName}, will you be my Valentine?</p>
                <div class="buttons-container">
                    <button onclick="finishQuest()">Yes ❤️</button>
                    <button onclick="finishQuest()">Of course 💘</button>
                </div>
            </div>
        `
    },
    {
        id: 10, // Final Screen
        render: () => `
            <div class="fade-in">
                <h1>Quest completed 🎉</h1>
                <p>Congratulations, ${recipientName}.<br>You are officially<br>my favorite person, today and always.</p>
                <h1>Happy Valentine’s Day ❤️</h1>
            </div>
        `,
        logic: () => {
            setInterval(createHeart, 300); // More hearts
        }
    }
];

let currentStepIndex = 0;

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

// Handle "No" button clicks for specific steps
function handleNo(btn, message, proceed) {
    const msgArea = document.getElementById('message-area');
    if (msgArea) msgArea.innerText = message;

    // Shake animation
    const card = document.querySelector('.card');
    card.classList.remove('shake');
    void card.offsetWidth; // trigger reflow
    card.classList.add('shake');

    if (proceed) {
        setTimeout(() => {
            nextStep();
        }, 1500);
    }
}

// Moving Button Logic (Step 5)
function initMovingButton() {
    const btn = document.getElementById('no-btn-move');
    if (!btn) return;

    const moveBtn = () => {
        // Get container dimensions to keep it somewhat local if possible, or viewport
        // For chaos, let's keep it within the viewport but safe distance from edges
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const btnWidth = btn.offsetWidth;
        const btnHeight = btn.offsetHeight;

        // Random position within 10% to 90% of viewport to act as "safe area"
        const x = Math.random() * (viewportWidth - btnWidth - 40) + 20;
        const y = Math.random() * (viewportHeight - btnHeight - 40) + 20;

        btn.style.position = 'fixed'; // Break out of flow
        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
    };

    btn.addEventListener('mouseenter', moveBtn);
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click
        moveBtn();
    });
    // Fallback click prevention
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        moveBtn();
    });
}

function finishQuest() {
    createHeartBurst();
    currentStepIndex++;
    renderStep(currentStepIndex);
}

// Visual Effects
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-bg');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 5 + 5 + 's'; // 5-10s
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
