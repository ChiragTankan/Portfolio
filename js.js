// --- 1. THE ADVANCED 3D BACKGROUND (Plexus Effect) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
    canvas: document.querySelector('#bg-canvas'), 
    antialias: true,
    alpha: true 
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 50;

// Particle & Line Variables
const particlesCount = 150; // Balanced for performance
const positions = new Float32Array(particlesCount * 3);
const velocity = new Float32Array(particlesCount * 3);
const particlesGeometry = new THREE.BufferGeometry();

for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100;
    velocity[i] = (Math.random() - 0.5) * 0.1; // Speed of movement
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Points Appearance
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.4,
    color: '#58a6ff',
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Connection Lines
const linesGeometry = new THREE.BufferGeometry();
const linesMaterial = new THREE.LineBasicMaterial({ color: '#58a6ff', transparent: true, opacity: 0.2 });
const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
scene.add(linesMesh);

// Mouse Interaction Positioning
let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
});

function animate() {
    requestAnimationFrame(animate);

    const posArray = particlesGeometry.attributes.position.array;
    const linePositions = [];

    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;

        // Move particles
        posArray[i3] += velocity[i3];
        posArray[i3 + 1] += velocity[i3 + 1];
        posArray[i3 + 2] += velocity[i3 + 2];

        // Bounce off invisible walls
        if (Math.abs(posArray[i3]) > 60) velocity[i3] *= -1;
        if (Math.abs(posArray[i3 + 1]) > 60) velocity[i3 + 1] *= -1;
        if (Math.abs(posArray[i3 + 2]) > 60) velocity[i3 + 2] *= -1;

        // Draw lines between close particles
        for (let j = i + 1; j < particlesCount; j++) {
            const j3 = j * 3;
            const dx = posArray[i3] - posArray[j3];
            const dy = posArray[i3 + 1] - posArray[j3 + 1];
            const dz = posArray[i3 + 2] - posArray[j3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < 15) { // Connection distance
                linePositions.push(posArray[i3], posArray[i3 + 1], posArray[i3 + 2]);
                linePositions.push(posArray[j3], posArray[j3 + 1], posArray[j3 + 2]);
            }
        }
    }

    particlesGeometry.attributes.position.needsUpdate = true;
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));

    // Smooth Parallax movement based on mouse
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
animate();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- 2. TYPEWRITER EFFECT (Keep your original) ---
const textElement = document.getElementById('typewriter');
const phrases = ["Founder @ Meerut Coders", "Full Stack Developer", "DSA Enthusiast", "Microsoft Learn Student Ambassador"];
let i = 0, j = 0, isDeleting = false;

function type() {
    const currentPhrase = phrases[i];
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, j - 1);
        j--;
    } else {
        textElement.textContent = currentPhrase.substring(0, j + 1);
        j++;
    }

    if (!isDeleting && j === currentPhrase.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % phrases.length;
    }
    setTimeout(type, isDeleting ? 100 : 200);
}
type();

// --- 3. REVEAL ON SCROLL (Keep your original) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Standard positioning
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with a slight delay for a smooth feel
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Add hover effects for all interactive elements
const interactives = document.querySelectorAll('a, .btn, .skill-item, .project-card, .cert-img');

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('cursor-hover-dot');
        cursorOutline.classList.add('cursor-hover-outline');
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('cursor-hover-dot');
        cursorOutline.classList.remove('cursor-hover-outline');
    });
});
