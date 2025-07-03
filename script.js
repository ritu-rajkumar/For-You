const countdown = () => {
    const countDate = new Date("January 1, 2026 00:00:00").getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    document.getElementById('days').innerText = textDay;
    document.getElementById('hours').innerText = textHour;
    document.getElementById('minutes').innerText = textMinute;
    document.getElementById('seconds').innerText = textSecond;
};

setInterval(countdown, 1000);

// --- Interactive Heartfall ---
const heartsContainer = document.getElementById('hearts-container');
let fallDuration = 10; // Default fall duration
let pumpDuration = 1; // Default pump duration

// Function to create a single heart
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animation = `fall ${fallDuration}s linear infinite, pump ${pumpDuration}s ease-in-out infinite`;
    heart.innerText = '❤️';
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, fallDuration * 1000);
}

// Set an interval to create hearts (increased density)
setInterval(createHeart, 150);

// Listen for mouse movement to adjust heart speed
let lastX = 0;
let lastTime = Date.now();

document.addEventListener('mousemove', (e) => {
    const time = Date.now();
    const deltaT = time - lastTime;

    if (deltaT > 0) {
        const deltaX = e.clientX - lastX;
        const speed = Math.abs(deltaX) / deltaT;

        const clampedSpeed = Math.min(speed, 10);
        
        // Adjust fall duration (faster fall)
        fallDuration = 10 - clampedSpeed * 0.8;
        fallDuration = Math.max(2, fallDuration);

        // Adjust pump duration (faster pump)
        pumpDuration = 1 - clampedSpeed * 0.08;
        pumpDuration = Math.max(0.2, pumpDuration);
    }

    lastX = e.clientX;
    lastTime = time;
});

// Secret Message
const secretHeart = document.getElementById('secret-heart');
const secretMessage = document.getElementById('secret-message');

secretHeart.addEventListener('click', () => {
    secretMessage.classList.toggle('hidden');
});

// --- Sparkle Effect and Click Messages ---
const romanticMessages = [
    "Tumhari Bhaut Yaad Aati Hai",
    "Par Koi Na, Mai Wait Kar Raha Hu",
    "Aasa Hai Aapko Bhai Yaad Aate Honge",
    "Yaad Rakhna 1 Jan"
];
let messageIndex = 0;

document.addEventListener('click', (e) => {
    // Sparkle Effect
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.left = e.clientX + 'px';

        const randomX = (Math.random() - 0.5) * 200;
        const randomY = (Math.random() - 0.5) * 200;

        sparkle.style.setProperty('--x', randomX + 'px');
        sparkle.style.setProperty('--y', randomY + 'px');

        sparkle.innerText = '❤️';
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }

    // Click Message
    const clickMessage = document.createElement('div');
    clickMessage.classList.add('click-message');
    clickMessage.style.top = (e.clientY - 30) + 'px'; // Position above click
    clickMessage.style.left = e.clientX + 'px';
    clickMessage.innerText = romanticMessages[messageIndex];
    document.body.appendChild(clickMessage);

    messageIndex = (messageIndex + 1) % romanticMessages.length; // Loop through messages

    setTimeout(() => {
        clickMessage.style.opacity = '0';
        clickMessage.addEventListener('transitionend', () => clickMessage.remove());
    }, 1500); // Message stays for 1.5 seconds before fading
});

// --- Chat Conversation ---
const whatsappIcon = document.getElementById('whatsapp-icon'); // Get the new WhatsApp icon
const chatContainer = document.getElementById('chat-container');
const chatMessagesDiv = document.getElementById('chat-messages');
const closeChatButton = document.getElementById('close-chat');

let chatInterval = null;
let currentMessageIndex = 0;

const chatConversation = [
    { sender: "Ritu", message: "Hii" },
    { sender: "Aayushi", message: "Hii" },
    { sender: "Ritu", message: "Khana Kha li" },
    { sender: "Aayushi", message: "Nahi Khane to Khila Denge" },
    { sender: "Ritu", message: "😂" },
    { sender: "Aayushi", message: "Pagal wagal hai kya" },
    { sender: "Ritu", message: "Haa" },
    { sender: "Aayushi", message: "Pata hai Vikas Mad**** kya bola aaj" },
    { sender: "Ritu", message: "Nahi batiye kya bola" },
    { sender: "Aayushi", message: "Wo na hamko aaj data" },
    { sender: "Ritu", message: "Kyu" },
    { sender: "System", message: "Baki baate 1 Jan Ko", bold: true, delay: 3000 } // System message with delay and bold
];

function displayMessage(messageObj) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', messageObj.sender.toLowerCase());
    if (messageObj.bold) {
        messageElement.classList.add('bold');
    }
    messageElement.innerText = messageObj.message;
    chatMessagesDiv.appendChild(messageElement);
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight; // Scroll to bottom
}

function startChat() {
    chatMessagesDiv.innerHTML = ''; // Clear previous messages
    currentMessageIndex = 0;
    chatContainer.style.display = 'flex'; // Explicitly set display to flex
    chatContainer.classList.remove('hidden');

    function sendNextMessage() {
        if (currentMessageIndex < chatConversation.length) {
            const message = chatConversation[currentMessageIndex];
            const delay = message.delay || 1500; // Default delay

            setTimeout(() => {
                displayMessage(message);
                currentMessageIndex++;
                sendNextMessage(); // Call next message after delay
            }, delay);
        } else {
            // Chat finished, optionally do something here
        }
    }
    sendNextMessage();
}

function stopChat() {
    chatContainer.classList.add('hidden');
    chatContainer.style.display = 'none'; // Explicitly set display to none
    // Clear any pending timeouts if necessary
}

whatsappIcon.addEventListener('click', () => {
    if (chatContainer.classList.contains('hidden')) {
        startChat();
    } else {
        stopChat();
    }
});

closeChatButton.addEventListener('click', stopChat);