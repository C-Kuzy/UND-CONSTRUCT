const GLITCH_TEXT_LINES = ['Website', 'Coming', 'Soon'];
const GLITCH_TEXT = GLITCH_TEXT_LINES.join('\n');
const GLITCH_PHASE_MS = 15_000;
const COUNTDOWN_PHASE_MS = 15_000;
const SHATTER_BASE_MS = 740;
const TRANSITION_OVERLAP_MS = 220;
const RELEASE_TARGET_INPUT = '01 01 2027'; // MM DD YYYY
const PREFERS_REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const glitchContainer = document.querySelector('.glitch-container');
const glitchElement = glitchContainer?.querySelector('.glitch');
const dinoLink = document.getElementById('dino-link');
const datetimeDisplay = document.getElementById('datetime-display');

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

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

function formatPart(value) {
    return String(Math.max(0, value)).padStart(2, '0');
}

function parseReleaseTargetDate(input) {
    const match = /^\s*(\d{1,2})[\s/-](\d{1,2})[\s/-](\d{4})\s*$/.exec(input);
    if (!match) {
        throw new Error('RELEASE_TARGET_INPUT must use MM DD YYYY format.');
    }

    const month = Number(match[1]);
    const day = Number(match[2]);
    const year = Number(match[3]);
    const maxDayForMonth = new Date(year, month, 0).getDate();

    if (month < 1 || month > 12 || day < 1 || day > maxDayForMonth) {
        throw new Error('RELEASE_TARGET_INPUT is not a valid calendar date.');
    }

    return new Date(year, month - 1, day, 0, 0, 0, 0);
}

const RELEASE_TARGET_DATE = parseReleaseTargetDate(RELEASE_TARGET_INPUT);

function addYears(date, amount) {
    const copy = new Date(date.getTime());
    copy.setFullYear(copy.getFullYear() + amount);
    return copy;
}

function addMonths(date, amount) {
    const copy = new Date(date.getTime());
    copy.setMonth(copy.getMonth() + amount);
    return copy;
}

function getCountdownParts(targetDate) {
    const now = new Date();
    if (now >= targetDate) {
        return {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }

    let cursor = new Date(now.getTime());
    let years = 0;
    let months = 0;

    while (addYears(cursor, 1) <= targetDate) {
        cursor = addYears(cursor, 1);
        years += 1;
    }

    while (addMonths(cursor, 1) <= targetDate) {
        cursor = addMonths(cursor, 1);
        months += 1;
    }

    let remainingMs = targetDate.getTime() - cursor.getTime();
    const days = Math.floor(remainingMs / 86_400_000);
    remainingMs -= days * 86_400_000;
    const hours = Math.floor(remainingMs / 3_600_000);
    remainingMs -= hours * 3_600_000;
    const minutes = Math.floor(remainingMs / 60_000);
    remainingMs -= minutes * 60_000;
    const seconds = Math.floor(remainingMs / 1_000);

    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds
    };
}

function buildCountdownElement(container) {
    const countdownWrapper = document.createElement('div');
    countdownWrapper.className = 'countdown-wrapper';
    countdownWrapper.innerHTML = `
        <div class="countdown-label" data-text="Release Date">Release Date</div>
        <div class="countdown-value" data-text="00 : 00 : 00 : 00 : 00 : 00">
            <span class="countdown-part">00</span><span class="countdown-separator">:</span>
            <span class="countdown-part">00</span><span class="countdown-separator">:</span>
            <span class="countdown-part">00</span><span class="countdown-separator">:</span>
            <span class="countdown-part">00</span><span class="countdown-separator">:</span>
            <span class="countdown-part">00</span><span class="countdown-separator">:</span>
            <span class="countdown-part">00</span>
        </div>
        <div class="countdown-format-hint" aria-hidden="true">
            <span class="countdown-hint-part">YY</span><span class="countdown-separator-gap"></span>
            <span class="countdown-hint-part">MM</span><span class="countdown-separator-gap"></span>
            <span class="countdown-hint-part">DD</span><span class="countdown-separator-gap"></span>
            <span class="countdown-hint-part">HH</span><span class="countdown-separator-gap"></span>
            <span class="countdown-hint-part">MM</span><span class="countdown-separator-gap"></span>
            <span class="countdown-hint-part">SS</span>
        </div>
    `;

    container.append(countdownWrapper);

    return {
        wrapper: countdownWrapper,
        label: countdownWrapper.querySelector('.countdown-label'),
        value: countdownWrapper.querySelector('.countdown-value'),
        valueParts: Array.from(countdownWrapper.querySelectorAll('.countdown-part'))
    };
}

function shatterText(sourceElement, lineConfigs) {
    if (PREFERS_REDUCED_MOTION || !glitchContainer || !sourceElement || !Array.isArray(lineConfigs) || lineConfigs.length === 0) {
        return Promise.resolve();
    }

    const layer = document.createElement('div');
    layer.className = 'shatter-layer';

    const textRoot = document.createElement('div');
    textRoot.className = 'shatter-text';
    let longest = SHATTER_BASE_MS;

    lineConfigs.forEach(({ text, source }) => {
        if (typeof text !== 'string' || !source) {
            return;
        }

        const lineElement = document.createElement('div');
        lineElement.className = 'shatter-line';
        const renderedLine = text.length > 0 ? text : ' ';
        const computed = window.getComputedStyle(source);
        lineElement.style.fontFamily = computed.fontFamily;
        lineElement.style.fontWeight = computed.fontWeight;
        lineElement.style.fontSize = computed.fontSize;
        lineElement.style.letterSpacing = computed.letterSpacing;
        lineElement.style.textTransform = computed.textTransform;
        lineElement.style.lineHeight = computed.lineHeight;
        lineElement.style.color = computed.color;
        lineElement.style.textShadow = computed.textShadow;

        Array.from(renderedLine).forEach((char) => {
            const charElement = document.createElement('span');
            const renderedChar = char === ' ' ? '\u00a0' : char;
            const angle = Math.random() * Math.PI * 2;
            const distance = (Math.max(window.innerWidth, window.innerHeight) * 0.34) + (Math.random() * 260);
            const travelX = Math.cos(angle) * distance;
            const travelY = Math.sin(angle) * distance;
            const rotation = (Math.random() * 360) - 180;
            const scale = (Math.random() * 0.45) + 0.4;
            const delay = Math.random() * 120;
            const duration = SHATTER_BASE_MS + (Math.random() * 260);

            charElement.className = 'shatter-char';
            charElement.textContent = renderedChar;
            charElement.dataset.char = renderedChar;
            charElement.style.setProperty('--tx', `${travelX.toFixed(2)}px`);
            charElement.style.setProperty('--ty', `${travelY.toFixed(2)}px`);
            charElement.style.setProperty('--rot', `${rotation.toFixed(2)}deg`);
            charElement.style.setProperty('--scale', `${scale.toFixed(2)}`);
            charElement.style.setProperty('--delay', `${delay.toFixed(0)}ms`);
            charElement.style.setProperty('--dur', `${duration.toFixed(0)}ms`);

            longest = Math.max(longest, delay + duration);
            lineElement.append(charElement);
        });

        textRoot.append(lineElement);
    });

    layer.append(textRoot);
    glitchContainer.append(layer);
    sourceElement.style.visibility = 'hidden';

    return new Promise((resolve) => {
        window.setTimeout(() => {
            layer.remove();
            sourceElement.style.visibility = '';
            resolve();
        }, longest + 40);
    });
}

function startAlignedTicker(callback) {
    let timerId = 0;
    let active = true;

    const tick = () => {
        if (!active) {
            return;
        }
        callback();
        const delay = 1000 - (Date.now() % 1000);
        timerId = window.setTimeout(tick, delay);
    };

    tick();

    return () => {
        active = false;
        window.clearTimeout(timerId);
    };
}

function startCompoundingShake(target, container, durationMs, options = {}) {
    if (!target || PREFERS_REDUCED_MOTION) {
        return () => {};
    }

    const maxIntensity = options.maxIntensity ?? 1.2;
    const containerScale = options.containerScale ?? 0;

    let rafId = null;
    const start = window.performance.now();

    const animate = (timestamp) => {
        const elapsed = timestamp - start;
        const progress = Math.min(1, elapsed / durationMs);
        const compound = progress ** 2.4;
        const pulse = 0.45 + (compound * 1.6);
        const intensity = 0.12 + (compound * maxIntensity);
        const xShift = Math.sin(timestamp * 0.006 * pulse) * intensity;
        const yShift = Math.cos(timestamp * 0.0068 * pulse) * intensity * 0.4;
        target.style.transform = `translate3d(${xShift.toFixed(2)}px, ${yShift.toFixed(2)}px, 0)`;

        if (container && window.innerWidth > 768) {
            container.style.transform = `translate3d(${(xShift * containerScale).toFixed(2)}px, ${(yShift * containerScale).toFixed(2)}px, 0)`;
        }

        if (progress < 1) {
            rafId = window.requestAnimationFrame(animate);
        }
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
        if (rafId !== null) {
            window.cancelAnimationFrame(rafId);
        }
    };
}

function startGlitchLoop() {
    if (!glitchContainer || !glitchElement) {
        return;
    }

    const countdown = buildCountdownElement(glitchContainer);
    let stopCountdownShake = () => {};
    let stopCountdownTicker = () => {};

    glitchElement.textContent = GLITCH_TEXT;
    glitchElement.setAttribute('data-text', GLITCH_TEXT);

    const resetEffects = () => {
        glitchElement.style.textShadow = '';
        glitchElement.style.transform = '';
        glitchContainer.style.transform = '';
    };

    const updateCountdown = () => {
        const parts = getCountdownParts(RELEASE_TARGET_DATE);
        const partValues = [
            formatPart(parts.years),
            formatPart(parts.months),
            formatPart(parts.days),
            formatPart(parts.hours),
            formatPart(parts.minutes),
            formatPart(parts.seconds)
        ];
        const countdownText = partValues.join(' : ');
        countdown.valueParts.forEach((partElement, index) => {
            partElement.textContent = partValues[index] ?? '00';
        });
        countdown.value.setAttribute('data-text', countdownText);
        countdown.label.setAttribute('data-text', 'Release Date');
    };

    const runGlitchPhase = () => {
        glitchContainer.classList.remove('mode-countdown');
        glitchContainer.classList.add('mode-glitch');
        glitchElement.textContent = GLITCH_TEXT;
        glitchElement.setAttribute('data-text', GLITCH_TEXT);
        resetEffects();

        window.setTimeout(() => {
            resetEffects();
            shatterText(glitchElement, [
                ...GLITCH_TEXT_LINES.map((line) => ({ text: line, source: glitchElement }))
            ]);
            window.setTimeout(runCountdownPhase, TRANSITION_OVERLAP_MS);
        }, GLITCH_PHASE_MS);
    };

    const runCountdownPhase = () => {
        glitchContainer.classList.remove('mode-glitch');
        glitchContainer.classList.add('mode-countdown');

        updateCountdown();
        stopCountdownTicker = startAlignedTicker(updateCountdown);
        stopCountdownShake = startCompoundingShake(countdown.wrapper, null, COUNTDOWN_PHASE_MS, {
            maxIntensity: 1.05,
            containerScale: 0
        });

        window.setTimeout(() => {
            stopCountdownTicker();
            stopCountdownShake();
            countdown.wrapper.style.textShadow = '';
            countdown.wrapper.style.transform = '';
            shatterText(countdown.wrapper, [
                { text: 'Release Date', source: countdown.label },
                { text: countdown.value.textContent, source: countdown.value }
            ]);
            window.setTimeout(() => {
                glitchContainer.classList.remove('mode-countdown');
                runGlitchPhase();
            }, TRANSITION_OVERLAP_MS);
        }, COUNTDOWN_PHASE_MS);
    };

    runGlitchPhase();
}

function setupDinoTransition() {
    if (!dinoLink) {
        return;
    }

    dinoLink.dataset.transitionManaged = 'true';

    dinoLink.addEventListener('click', (event) => {
        event.preventDefault();
        if (typeof window.beginPageTransition === 'function') {
            window.beginPageTransition(dinoLink.href);
            return;
        }
        window.location.assign(dinoLink.href);
    });
}

startAlignedTicker(updateDateTime);
startGlitchLoop();
setupDinoTransition();
