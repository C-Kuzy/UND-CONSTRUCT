const datetimeDisplay = document.getElementById('datetime-display');
const canvas = document.getElementById('dino-canvas');
const colorButtons = Array.from(document.querySelectorAll('.color-option'));
const modeButtons = Array.from(document.querySelectorAll('.mode-option'));

if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error('Dino canvas not found.');
}

const ctx = canvas.getContext('2d');
if (!ctx) {
    throw new Error('2D context could not be created.');
}

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const MODE_CONFIG = {
    casual: {
        velocityScale: 1,
        spawnRange: [1700, 2550],
        offsetRange: [150, 280],
        minGap: 280
    },
    regular: {
        velocityScale: 1.72,
        spawnRange: [1500, 2280],
        offsetRange: [170, 320],
        minGap: 300
    },
    fast: {
        velocityScale: 2.25,
        spawnRange: [1350, 2100],
        offsetRange: [180, 340],
        minGap: 320
    }
};

function updateDateTime() {
    if (!datetimeDisplay) {
        return;
    }

    const now = new Date();
    const month = months[now.getMonth()];
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    datetimeDisplay.textContent = `${month} : ${day} : ${year}  |  TOD ⟿ ${hours} : ${minutes} : ${seconds}`;
}

function hexToRgba(hex, alpha) {
    const clean = hex.replace('#', '');
    if (clean.length !== 6) {
        return `rgba(74, 74, 74, ${alpha})`;
    }
    const r = Number.parseInt(clean.slice(0, 2), 16);
    const g = Number.parseInt(clean.slice(2, 4), 16);
    const b = Number.parseInt(clean.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const state = {
    width: 960,
    height: 360,
    groundY: 300,
    strokeColor: '#4a4a4a',
    speedMode: 'fast',
    speedMultiplier: 3,
    modeVelocityScale: MODE_CONFIG.fast.velocityScale,
    speed: 2.4,
    baseSpeed: 2.4,
    elapsedMs: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    flashTimerMs: 0,
    obstacleSpawnMs: 1300,
    distance: 0,
    lastFrameTime: 0,
    dino: {
        x: 90,
        y: 260,
        width: 44,
        height: 46,
        velocityY: 0,
        onGround: true,
        legPhase: 0
    },
    clouds: [],
    stars: [],
    obstacles: [],
    orbitals: []
};

function randomInRange(min, max) {
    return min + (Math.random() * (max - min));
}

function setupSkyElements() {
    state.clouds = Array.from({ length: 5 }, (_, index) => ({
        x: index * (state.width / 4.2) + randomInRange(0, 90),
        y: randomInRange(40, 130),
        width: randomInRange(48, 96),
        speedFactor: randomInRange(0.25, 0.45)
    }));

    state.stars = Array.from({ length: 24 }, () => ({
        x: randomInRange(0, state.width),
        y: randomInRange(10, state.height * 0.58),
        size: randomInRange(1.5, 3.2),
        speedFactor: randomInRange(0.35, 0.7),
        twinkle: randomInRange(0.4, 1.1)
    }));

    state.orbitals = [
        { type: 'sun', x: state.width + 140, y: 64, radius: 20, speedFactor: 0.22 },
        { type: 'moon', x: state.width + 560, y: 92, radius: 16, speedFactor: 0.18 }
    ];
}

function setCanvasSize() {
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    const width = Math.max(320, Math.floor(rect.width));
    const responsiveHeight = Math.floor(width * 0.37);
    const viewportCap = Math.max(180, Math.floor(window.innerHeight * 0.5));
    const layoutHeight = Math.floor(rect.height);
    const height = Math.max(
        180,
        Math.min(
            viewportCap,
            layoutHeight > 0 ? layoutHeight : responsiveHeight
        )
    );

    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    state.width = width;
    state.height = height;
    state.groundY = height - 54;
    state.dino.y = Math.min(state.dino.y, state.groundY - state.dino.height);
}

function setColor(color) {
    state.strokeColor = color;
    document.documentElement.style.setProperty('--accent-color', color);
    document.documentElement.style.setProperty('--accent-glow', hexToRgba(color, 0.45));

    colorButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.color === color);
    });
}

function setMode(mode, multiplier) {
    const config = MODE_CONFIG[mode] ?? MODE_CONFIG.fast;
    state.speedMode = mode;
    state.speedMultiplier = multiplier;
    state.modeVelocityScale = config.velocityScale;

    modeButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.mode === mode);
    });
}

function getModeConfig() {
    return MODE_CONFIG[state.speedMode] ?? MODE_CONFIG.fast;
}

function getStreakDifficultyFactor() {
    return Math.min(0.42, state.streak * 0.012);
}

function getNextObstacleDelay() {
    const mode = getModeConfig();
    const streakFactor = getStreakDifficultyFactor();
    const low = mode.spawnRange[0] * (1 - (streakFactor * 0.45));
    const high = mode.spawnRange[1] * (1 - (streakFactor * 0.45));
    return randomInRange(low, high);
}

function resetRun(fromHit = false) {
    state.elapsedMs = 0;
    state.score = 0;
    state.streak = 0;
    state.speed = state.baseSpeed;
    state.distance = 0;
    state.obstacles = [];
    state.obstacleSpawnMs = getNextObstacleDelay();
    state.dino.velocityY = 0;
    state.dino.onGround = true;
    state.dino.y = state.groundY - state.dino.height;
    state.dino.legPhase = 0;

    if (fromHit) {
        state.flashTimerMs = 220;
    }
}

function onJump() {
    if (!state.dino.onGround) {
        return;
    }

    state.dino.velocityY = -11.5;
    state.dino.onGround = false;
}

function spawnObstacle() {
    const type = Math.random() < 0.5 ? 'cactus' : 'box';
    const baseHeight = type === 'cactus' ? randomInRange(34, 58) : randomInRange(26, 48);
    const width = type === 'cactus' ? randomInRange(18, 27) : randomInRange(22, 36);
    const mode = getModeConfig();
    const streakFactor = getStreakDifficultyFactor();

    let spawnX = state.width + randomInRange(
        mode.offsetRange[0] * (1 - (streakFactor * 0.25)),
        mode.offsetRange[1] * (1 - (streakFactor * 0.2))
    );

    const lastObstacle = state.obstacles[state.obstacles.length - 1];
    if (lastObstacle) {
        const minGap = (mode.minGap * (1 - (streakFactor * 0.35))) + (state.speed * 24);
        spawnX = Math.max(spawnX, lastObstacle.x + lastObstacle.width + minGap);
    }

    state.obstacles.push({
        type,
        x: spawnX,
        width,
        height: baseHeight,
        passed: false
    });
}

function intersects(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function updateGame(deltaMs) {
    const step = deltaMs / 16.67;
    const streakFactor = getStreakDifficultyFactor();

    state.elapsedMs += deltaMs;
    state.score += deltaMs * 0.01;
    state.speed = Math.min(6.15, state.baseSpeed + (state.elapsedMs * 0.00008) + (streakFactor * 1.1));
    state.flashTimerMs = Math.max(0, state.flashTimerMs - deltaMs);

    state.dino.legPhase += step * (0.32 + (streakFactor * 0.35));
    state.dino.velocityY += 0.62 * step;
    state.dino.y += state.dino.velocityY * step;

    if (state.dino.y >= state.groundY - state.dino.height) {
        state.dino.y = state.groundY - state.dino.height;
        state.dino.velocityY = 0;
        state.dino.onGround = true;
    }

    const laneSpeed = state.speed * state.modeVelocityScale * (1 + (streakFactor * 0.35)) * step;
    state.distance += laneSpeed;

    state.clouds.forEach((cloud) => {
        cloud.x -= laneSpeed * cloud.speedFactor;
        if (cloud.x + cloud.width < -20) {
            cloud.x = state.width + randomInRange(20, 180);
            cloud.y = randomInRange(36, 128);
        }
    });

    state.stars.forEach((star) => {
        star.x -= laneSpeed * star.speedFactor;
        if (star.x < -8) {
            star.x = state.width + randomInRange(8, 180);
            star.y = randomInRange(12, state.height * 0.62);
        }
        star.twinkle += 0.015 * step;
    });

    state.orbitals.forEach((orbital) => {
        orbital.x -= laneSpeed * orbital.speedFactor;
        if (orbital.x + orbital.radius * 2 < -24) {
            orbital.x = state.width + randomInRange(280, 560);
            orbital.y = orbital.type === 'sun' ? randomInRange(46, 92) : randomInRange(72, 118);
        }
    });

    state.obstacleSpawnMs -= deltaMs;
    if (state.obstacleSpawnMs <= 0) {
        spawnObstacle();
        state.obstacleSpawnMs = getNextObstacleDelay();
    }

    state.obstacles.forEach((obstacle) => {
        obstacle.x -= laneSpeed;
    });

    const dinoHitbox = {
        x: state.dino.x + 5,
        y: state.dino.y + 3,
        width: state.dino.width - 9,
        height: state.dino.height - 4
    };

    for (const obstacle of state.obstacles) {
        const hitbox = {
            x: obstacle.x + 2,
            y: state.groundY - obstacle.height,
            width: obstacle.width - 3,
            height: obstacle.height
        };

        if (intersects(dinoHitbox, hitbox)) {
            state.bestStreak = Math.max(state.bestStreak, state.streak);
            resetRun(true);
            return;
        }

        if (!obstacle.passed && obstacle.x + obstacle.width < state.dino.x - 4) {
            obstacle.passed = true;
            state.streak += 1;
            state.bestStreak = Math.max(state.bestStreak, state.streak);
            state.score += 24 + (state.streak * 4.5);
        }
    }

    state.obstacles = state.obstacles.filter((obstacle) => obstacle.x + obstacle.width > -24);
}

function drawStar(star) {
    const shimmer = Math.abs(Math.sin(star.twinkle));
    const size = star.size + shimmer * 1.2;
    const x = star.x;
    const y = star.y;

    ctx.beginPath();
    ctx.moveTo(x - size, y);
    ctx.lineTo(x + size, y);
    ctx.moveTo(x, y - size);
    ctx.lineTo(x, y + size);
    ctx.stroke();
}

function drawCloud(cloud) {
    const h = cloud.width * 0.36;
    ctx.beginPath();
    ctx.arc(cloud.x, cloud.y, h * 0.55, Math.PI, Math.PI * 2);
    ctx.arc(cloud.x + h * 0.7, cloud.y - h * 0.2, h * 0.65, Math.PI, Math.PI * 2);
    ctx.arc(cloud.x + h * 1.45, cloud.y, h * 0.5, Math.PI, Math.PI * 2);
    ctx.stroke();
}

function drawSunOrMoon(orbital) {
    ctx.beginPath();
    ctx.arc(orbital.x, orbital.y, orbital.radius, 0, Math.PI * 2);
    ctx.stroke();

    if (orbital.type === 'sun') {
        for (let i = 0; i < 8; i += 1) {
            const angle = (Math.PI / 4) * i;
            const inner = orbital.radius + 3;
            const outer = orbital.radius + 10;
            const x1 = orbital.x + Math.cos(angle) * inner;
            const y1 = orbital.y + Math.sin(angle) * inner;
            const x2 = orbital.x + Math.cos(angle) * outer;
            const y2 = orbital.y + Math.sin(angle) * outer;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
        return;
    }

    ctx.beginPath();
    ctx.arc(orbital.x + 7, orbital.y - 3, orbital.radius * 0.75, 0, Math.PI * 2);
    ctx.stroke();
}

function drawGround(stepOffset) {
    ctx.beginPath();
    ctx.moveTo(0, state.groundY + 0.5);
    ctx.lineTo(state.width, state.groundY + 0.5);
    ctx.stroke();

    const spacing = 28;
    const offset = stepOffset % spacing;
    for (let x = -offset; x < state.width + spacing; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, state.groundY + 1);
        ctx.lineTo(x + 8, state.groundY + 9);
        ctx.stroke();
    }
}

function drawDino() {
    const runOffset = Math.sin(state.dino.legPhase) * 4;
    const x = state.dino.x;
    const y = state.dino.y;

    ctx.beginPath();
    ctx.rect(x + 10, y + 2, 26, 20);
    ctx.rect(x + 18, y - 10, 18, 12);
    ctx.rect(x + 2, y + 22, 34, 10);
    ctx.moveTo(x + 10, y + 32);
    ctx.lineTo(x + 8, y + 44);
    ctx.moveTo(x + 30, y + 32);
    ctx.lineTo(x + 30 + runOffset, y + 44);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x + 29, y - 4, 1.7, 0, Math.PI * 2);
    ctx.fillStyle = state.strokeColor;
    ctx.fill();
}

function drawObstacle(obstacle) {
    const x = obstacle.x;
    const y = state.groundY - obstacle.height;

    ctx.beginPath();
    if (obstacle.type === 'cactus') {
        ctx.rect(x + obstacle.width * 0.35, y, obstacle.width * 0.3, obstacle.height);
        ctx.rect(x, y + obstacle.height * 0.4, obstacle.width * 0.25, obstacle.height * 0.18);
        ctx.rect(x + obstacle.width * 0.74, y + obstacle.height * 0.3, obstacle.width * 0.2, obstacle.height * 0.2);
    } else {
        ctx.rect(x, y, obstacle.width, obstacle.height);
        ctx.moveTo(x, y);
        ctx.lineTo(x + obstacle.width, y + obstacle.height);
        ctx.moveTo(x + obstacle.width, y);
        ctx.lineTo(x, y + obstacle.height);
    }
    ctx.stroke();
}

function drawHud() {
    const chaosMultiplier = 1 + (state.streak * 0.08);
    ctx.save();
    ctx.fillStyle = state.strokeColor;
    ctx.font = 'bold 16px "Courier New", monospace';
    ctx.fillText(`RUN TIME: ${Math.floor(state.elapsedMs / 1000)}s`, 18, 28);
    ctx.fillText(`SCORE: ${Math.floor(state.score)}`, 18, 50);
    ctx.fillText(`MODE: ${state.speedMode.toUpperCase()} ${state.speedMultiplier}X`, 18, 72);
    ctx.fillText(`STREAK: ${state.streak} (BEST ${state.bestStreak})`, 18, 94);
    ctx.fillText(`CHAOS: x${chaosMultiplier.toFixed(2)}`, 18, 116);
    ctx.restore();
}

function render() {
    ctx.clearRect(0, 0, state.width, state.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = state.strokeColor;

    if (state.flashTimerMs > 0) {
        const alpha = state.flashTimerMs / 220;
        ctx.save();
        ctx.fillStyle = `rgba(255, 255, 255, ${0.2 * alpha})`;
        ctx.fillRect(0, 0, state.width, state.height);
        ctx.restore();
    }

    state.stars.forEach(drawStar);
    state.orbitals.forEach(drawSunOrMoon);
    state.clouds.forEach(drawCloud);
    drawGround(state.distance * 3.2);
    state.obstacles.forEach(drawObstacle);
    drawDino();
    drawHud();
}

function gameLoop(timestamp) {
    if (state.lastFrameTime === 0) {
        state.lastFrameTime = timestamp;
    }

    const deltaMs = Math.min(34, timestamp - state.lastFrameTime);
    state.lastFrameTime = timestamp;

    updateGame(deltaMs);
    render();
    window.requestAnimationFrame(gameLoop);
}

function attachInput() {
    canvas.addEventListener('pointerdown', () => {
        onJump();
    });

    window.addEventListener('keydown', (event) => {
        if (event.code === 'Space' || event.code === 'ArrowUp') {
            event.preventDefault();
            onJump();
        }
    });

    colorButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const selected = button.dataset.color;
            if (selected) {
                setColor(selected);
            }
        });
    });

    modeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const mode = button.dataset.mode;
            const multiplier = Number(button.dataset.multiplier);
            if (mode && Number.isFinite(multiplier)) {
                setMode(mode, multiplier);
            }
        });
    });
}

setupSkyElements();
setCanvasSize();
attachInput();
setColor('#4a4a4a');
setMode('fast', 3);
resetRun(false);
updateDateTime();
window.setInterval(updateDateTime, 1000);
window.requestAnimationFrame(gameLoop);
window.addEventListener('resize', setCanvasSize);
