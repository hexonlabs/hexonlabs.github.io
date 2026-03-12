const launchpadGlitchStyles = `
/* Keyframes matched from Sand Box 3D */
@keyframes glitch-skew {
    0%   { transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) skewX(0deg); }
    5%   { transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) skewX(-8deg); }
    10%  { transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) skewX(4deg); }
    15%  { transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) skewX(0deg); }
    85%  { transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) skewX(0deg); }
    90%  { transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) skewX(6deg); }
    95%  { transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) skewX(-3deg); }
    100% { transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) skewX(0deg); }
}

@keyframes rgb-drift {
    0%   { text-shadow: -3px 0 #ff0000, 3px 0 #00ffff, 0 0 8px #fff; }
    25%  { text-shadow: 5px 0 #ff0000, -5px 0 #00ffff, 0 0 12px #4aa3df; }
    50%  { text-shadow: -6px 0 #ff0000, 6px 0 #00ffff, 2px -2px #fff; }
    75%  { text-shadow: 3px 2px #ff0000, -3px -2px #00ffff, 0 0 20px #4aa3df; }
    100% { text-shadow: -3px 0 #ff0000, 3px 0 #00ffff, 0 0 8px #fff; }
}

@keyframes rgb-drift-box {
    0%   { box-shadow: -3px 0 #ff0000, 3px 0 #00ffff, 0 0 8px rgba(255,255,255,0.5); }
    50%  { box-shadow: -6px 0 #ff0000, 6px 0 #00ffff, 2px -2px rgba(255,255,255,0.5); }
    100% { box-shadow: -3px 0 #ff0000, 3px 0 #00ffff, 0 0 8px rgba(255,255,255,0.5); }
}

@keyframes scanlines-roll {
    0%   { background-position: 0 0; }
    100% { background-position: 0 100px; }
}

@keyframes flicker {
    0%, 100% { opacity: 1; }
    3% { opacity: 0.8; }
    6% { opacity: 1; }
    30% { opacity: 0.95; }
    32% { opacity: 0.7; }
    34% { opacity: 1; }
}

@keyframes hbar-sweep {
    0%   { top: -10%; opacity: 0.8; }
    100% { top: 110%;  opacity: 0; }
}

/* 3D Container Styling */
.launchpad-3d-container {
    animation: glitch-skew 0.4s infinite steps(1), flicker 1.2s infinite !important;
    border: 1px solid rgba(0, 255, 255, 0.3) !important;
    background: rgba(15, 15, 18, 0.7) !important;
    backdrop-filter: blur(4px);
}

.launchpad-3d-container::before {
    content: '';
    position: absolute;
    inset: -2px;
    z-index: -1;
    border-radius: 32px;
    background: transparent;
    animation: rgb-drift-box 0.3s infinite !important;
    pointer-events: none;
}

/* Text and Icon RGB Drift Targeting */
.launchpad-rgb-text {
    animation: rgb-drift 0.3s infinite !important;
    color: #fff !important;
}

.launchpad-rgb-icon {
    animation: rgb-drift 0.3s infinite !important;
}

/* Background Hexagon Overload */
.bg-shape-container .hexagon-spinner {
    color: #00ffff !important;
    opacity: 0.15 !important;
    animation: spin 3s linear infinite, flicker 0.5s infinite !important;
    filter: drop-shadow(0 0 15px #ff0000) drop-shadow(0 0 15px #00ffff);
}

/* Overlays */
.sb3d-scanlines {
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
        0deg,
        rgba(0,0,0,0) 0px,
        rgba(0,0,0,0) 2px,
        rgba(0,255,255,0.03) 2px,
        rgba(0,255,255,0.03) 4px
    );
    pointer-events: none;
    z-index: 9998;
    animation: scanlines-roll 0.6s linear infinite;
}

.sb3d-glitch-bar {
    position: fixed;
    left: 0; right: 0;
    height: 4px;
    background: rgba(0, 255, 255, 0.25);
    animation: hbar-sweep 0.9s linear infinite;
    z-index: 9999;
    pointer-events: none;
}

.sb3d-glitch-bar-red {
    position: fixed;
    left: 0; right: 0;
    height: 3px;
    background: rgba(255, 0, 80, 0.4);
    animation: hbar-sweep 0.6s linear infinite;
    animation-delay: 0.3s;
    z-index: 9999;
    pointer-events: none;
}
`;

// Inject Stylesheet
const styleEl = document.createElement('style');
styleEl.innerHTML = launchpadGlitchStyles;
document.head.appendChild(styleEl);

document.addEventListener('DOMContentLoaded', () => {
    // 1. Target the main container and apply 3D/Glitch wrapper
    const mainContainer = document.querySelector('.container');
    if (mainContainer) {
        mainContainer.classList.add('launchpad-3d-container');
    }

    // 2. Target typography and icons for RGB Drift
    const textElements = document.querySelectorAll('h1, h2, .fab-title, .loading-text');
    textElements.forEach(el => el.classList.add('launchpad-rgb-text'));

    const iconElements = document.querySelectorAll('.material-icons-round, .loader-hexagon');
    iconElements.forEach(el => el.classList.add('launchpad-rgb-icon'));

    // 3. Append Screen Overlays (Scanlines & Sweeping Bars)
    const scanlines = document.createElement('div');
    scanlines.className = 'sb3d-scanlines';
    document.body.appendChild(scanlines);

    const glitchBarCyan = document.createElement('div');
    glitchBarCyan.className = 'sb3d-glitch-bar';
    document.body.appendChild(glitchBarCyan);

    const glitchBarRed = document.createElement('div');
    glitchBarRed.className = 'sb3d-glitch-bar-red';
    document.body.appendChild(glitchBarRed);

    // 4. Random Aggressive Screen Shake (Position displacement)
    setInterval(() => {
        if (Math.random() > 0.7) {
            // Target the container instead of body to prevent breaking fixed overlays
            if (mainContainer) {
                const x = (Math.random() - 0.5) * 14;
                const y = (Math.random() - 0.5) * 8;
                
                // Add the translation on top of the existing 3D perspective
                mainContainer.style.transform = `perspective(1000px) rotateX(2deg) rotateY(-2deg) translate(${x}px, ${y}px)`;
                
                // Reset it back to the standard 3D pose quickly
                setTimeout(() => {
                    mainContainer.style.transform = 'perspective(1000px) rotateX(2deg) rotateY(-2deg)';
                }, 60);
            }
        }
    }, 300);
});