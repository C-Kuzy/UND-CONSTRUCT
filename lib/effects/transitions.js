const DEFAULT_FADE_MS = 520;
const STYLE_ID = 'global-page-transition-style';

let overlayElement = null;
let transitionLocked = false;

function injectStyles() {
    if (document.getElementById(STYLE_ID)) {
        return;
    }

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
        .page-fade-overlay {
            position: fixed;
            inset: 0;
            background: #000000;
            opacity: 1;
            transition: opacity 0.55s ease;
            pointer-events: none;
            z-index: 9999;
        }

        .page-fade-overlay.page-fade-overlay--clear {
            opacity: 0;
        }
    `;

    document.head.append(style);
}

function ensureOverlay() {
    if (overlayElement) {
        return overlayElement;
    }

    injectStyles();
    overlayElement = document.createElement('div');
    overlayElement.className = 'page-fade-overlay';
    document.body.append(overlayElement);

    window.requestAnimationFrame(() => {
        overlayElement.classList.add('page-fade-overlay--clear');
    });

    return overlayElement;
}

function shouldHandleLink(anchor, event) {
    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('#')) {
        return false;
    }

    if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
    ) {
        return false;
    }

    if (anchor.hasAttribute('download') || anchor.target === '_blank') {
        return false;
    }

    return true;
}

function beginPageTransition(href, options = {}) {
    if (!href || transitionLocked) {
        return;
    }

    transitionLocked = true;
    document.documentElement.classList.add('is-page-transitioning');
    const overlay = ensureOverlay();
    overlay.classList.remove('page-fade-overlay--clear');

    const delay = typeof options.delay === 'number' ? options.delay : DEFAULT_FADE_MS;

    window.setTimeout(() => {
        window.location.assign(href);
    }, delay);
}

window.beginPageTransition = beginPageTransition;

if (document.body) {
    ensureOverlay();
} else {
    document.addEventListener('DOMContentLoaded', ensureOverlay, { once: true });
}

document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
        return;
    }

    const anchor = target.closest('a[href]');
    if (!anchor || anchor.dataset.transitionManaged === 'true') {
        return;
    }

    if (!shouldHandleLink(anchor, event)) {
        return;
    }

    event.preventDefault();
    beginPageTransition(anchor.href);
});
