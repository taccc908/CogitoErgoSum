let tapLocked = false;

const modal = document.getElementById('videoModal');

// --- GIF LIST (in order) ---
const gifList = [
    "Video/Neuron1.gif",
    "Video/Neuron2.gif",
    "Video/Neuron3.gif",
    "Video/Neuron4.gif",
    "Video/Neuron5.gif",
    "Video/Neuron6.gif",
    "Video/Neuron7.gif",
    "Video/Neuron8.gif",
    "Video/Neuron9.gif",
    "Video/Neuron10.gif",
    "Video/Neuron11.gif",
    "Video/Neuron12.gif",
    "Video/Neuron13.gif",
    "Video/Neuron14.gif"
];

const textList = [
    "What would my life look like if anyone could read my mind?",
    "Would I still be free to think?",
    "Free to feel",
    "Free to imagine",
    "Free to love",
    "If someone could control my mind what would become of me, of my identity?",
    "Who am I if not my thoughts?",
    "I am what I feel",
    "I am what I think",
    "I am what I remember",
    "I am BECAUSE I think",
    "Please, let me think",
    "Let me live",
    "Just let me be"
];

// --- DURATIONS ---
const gifDurations = {
    "Video/Neuron1.gif": 3400,
    "Video/Neuron2.gif": 2420,
    "Video/Neuron3.gif": 1440,
    "Video/Neuron4.gif": 1440,
    "Video/Neuron5.gif": 1440,
    "Video/Neuron6.gif": 4380,
    "Video/Neuron7.gif": 2420,
    "Video/Neuron8.gif": 1440,
    "Video/Neuron9.gif": 1440,
    "Video/Neuron10.gif": 2420,
    "Video/Neuron11.gif": 2420,
    "Video/Neuron12.gif": 2420,
    "Video/Neuron13.gif": 1440,
    "Video/Neuron14.gif": 2420
};

// Index to track which GIF plays next
let gifIndex = 0;

// Listen for taps on desktop and iPad/iPhone
document.addEventListener('click', handleTap);
document.addEventListener('touchstart', handleTap, { passive: false });

// Force GIF to reset to frame 1
function freshGif(src) {
    return src + "?t=" + Date.now();
}

function handleTap(event) {

    // --- Prevent double triggering (iPad & fast double-tap) ---
    if (tapLocked) return;
    tapLocked = true;
    setTimeout(() => tapLocked = false, 250);

    if (event.type === 'touchstart') event.preventDefault();

    // --- Get tap coordinates ---
    const x = (event.clientX !== undefined) ? event.clientX :
        (event.touches && event.touches[0] && event.touches[0].clientX) || window.innerWidth / 2;

    const y = (event.clientY !== undefined) ? event.clientY :
        (event.touches && event.touches[0] && event.touches[0].clientY) || window.innerHeight / 2;

    // Pick next GIF in sequence
const rawSrc = gifList[gifIndex];

// Pick text that matches the GIF
const caption = textList[gifIndex];

// Advance index
gifIndex = (gifIndex + 1) % gifList.length;

// Update caption display
const captionBox = document.getElementById('gifCaption');
captionBox.style.opacity = 0;
setTimeout(() => {
    captionBox.textContent = caption;
    captionBox.style.opacity = 1;
}, 50);
    
    // --- Create GIF element ---
    const newGif = document.createElement('img');
    newGif.src = freshGif(rawSrc);
    newGif.style.position = 'absolute';
    newGif.style.left = `${x}px`;
    newGif.style.top = `${y}px`;
    newGif.style.transform = 'translate(-50%, -50%)';
    newGif.style.pointerEvents = 'none';
    newGif.style.maxWidth = '80vw';
    newGif.style.height = 'auto';

    // --- Add to modal ---
    modal.appendChild(newGif);
    modal.style.display = 'block';

    // --- Remove after its unique duration ---
    const duration = gifDurations[rawSrc] || 2000;
   setTimeout(() => {
    newGif.classList.add('fade-out');

    setTimeout(() => {
        newGif.remove();

        if (modal.querySelectorAll('img').length === 0) {
            modal.style.display = 'none';
        }
    }, 600);
}, duration);
}
