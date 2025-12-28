
        // 1. THREE.JS BACKGROUND
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg-canvas'), antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.setZ(30);
        // Custome Cursor
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
        // Add 3D Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 5000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const material = new THREE.PointsMaterial({ size: 0.005, color: '#58a6ff' });
        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;
            renderer.render(scene, camera);
        }
        animate();

        // Handle Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // 2. TYPEWRITER EFFECT
        const textElement = document.getElementById('typewriter');
        const phrases = ["Founder @ Meerut Coders", "Full Stack Developer", "DSA Enthusiast", "Microsoft Learn Student Ambassadors Volunteer"];
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

        // 3. REVEAL ON SCROLL
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

