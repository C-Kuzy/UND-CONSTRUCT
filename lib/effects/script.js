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

// Add occasional screen shake effect
function screenShake() {
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
