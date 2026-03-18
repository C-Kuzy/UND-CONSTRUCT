// Date and Time Display
function updateDateTime() {
    const now = new Date();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const month = months[now.getMonth()];
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const dateTimeString = `${month} : ${day} : ${year}  |  TOD ⟿ ${hours} : ${minutes} : ${seconds}`;

    const datetimeDisplay = document.getElementById('datetime-display');
    if (datetimeDisplay) {
        datetimeDisplay.textContent = dateTimeString;
    }
}

// Update date/time immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);

// Add random glitch intensity changes
const glitchElement = document.querySelector('.glitch');

function randomGlitch() {
    const intensity = Math.random() * 25;
    glitchElement.style.textShadow = `
        ${intensity}px 0 #ff0000,
        ${-intensity}px 0 #00ffff,
        0 ${intensity}px #2bff00
    `;

    // Reset after a short time
    setTimeout(() => {
        glitchElement.style.textShadow = '';
    }, 50);
}

// Trigger random glitches
setInterval(() => {
    if (Math.random() > 0.75) {
        randomGlitch();
    }
}, 200);

// Add occasional screen shake effect (disabled on mobile devices)
function screenShake() {
    // Only apply screen shake on desktop (viewport width > 768px)
    if (window.innerWidth <= 768) {
        return;
    }

    const container = document.querySelector('.glitch-container');
    const shakeAmount = Math.random() * 20 - 2;
    container.style.transform = `translate(${shakeAmount}px, ${shakeAmount}px)`;

    setTimeout(() => {
        container.style.transform = '';
    }, 500);
}

setInterval(() => {
    if (Math.random() > 0.75) {
        screenShake();
    }
}, 300);
