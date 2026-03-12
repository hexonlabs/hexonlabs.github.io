const sb3dGlitchStyles = `
@keyframes glitch-skew {
    0%   { transform: skewX(0deg); }
    5%   { transform: skewX(-8deg); }
    10%  { transform: skewX(4deg); }
    15%  { transform: skewX(0deg); }
    85%  { transform: skewX(0deg); }
    90%  { transform: skewX(6deg); }
    95%  { transform: skewX(-3deg); }
    100% { transform: skewX(0deg); }
}
@keyframes rgb-drift {
    0%   { text-shadow: -3px 0 #ff0000, 3px 0 #00ffff, 0 0 8px #fff; }
    25%  { text-shadow: 5px 0 #ff0000, -5px 0 #00ffff, 0 0 12px #4aa3df; }
    50%  { text-shadow: -6px 0 #ff0000, 6px 0 #00ffff, 2px -2px #fff; }
    75%  { text-shadow: 3px 2px #ff0000, -3px -2px #00ffff, 0 0 20px #4aa3df; }
    100% { text-shadow: -3px 0 #ff0000, 3px 0 #00ffff, 0 0 8px #fff; }
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
.sb3d-theme-injected {
    animation: glitch-skew 0.4s infinite steps(1), flicker 1.2s infinite !important;
}
.sb3d-theme-injected h1, 
.sb3d-theme-injected h2, 
.sb3d-theme-injected .item-title, 
.sb3d-theme-injected .category-title {
    animation: rgb-drift 0.3s infinite !important;
    color: #fff !important;
}
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

const styleEl = document.createElement('style');
styleEl.innerHTML = sb3dGlitchStyles;
document.head.appendChild(styleEl);

document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('.container');
    if (mainContainer) {
        mainContainer.classList.add('sb3d-theme-injected');
    } else {
        document.body.classList.add('sb3d-theme-injected');
    }

    const scanlines = document.createElement('div');
    scanlines.className = 'sb3d-scanlines';
    document.body.appendChild(scanlines);

    const glitchBarCyan = document.createElement('div');
    glitchBarCyan.className = 'sb3d-glitch-bar';
    document.body.appendChild(glitchBarCyan);

    const glitchBarRed = document.createElement('div');
    glitchBarRed.className = 'sb3d-glitch-bar-red';
    document.body.appendChild(glitchBarRed);

    setInterval(() => {
        if (Math.random() > 0.7) {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 4;
            document.body.style.transform = `translate(${x}px, ${y}px)`;
            setTimeout(() => document.body.style.transform = '', 60);
        }
    }, 300);
});