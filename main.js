// Three.js Setup
let scene, camera, renderer, stars;

function init() {
    scene = new THREE.Scene();

    // Kameraeinstellungen
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // Renderer erstellen
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Sterne erstellen
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 10000;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.7,
    });

    stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Mausinteraktion
    document.addEventListener('mousemove', onMouseMove, false);

    // Animation starten
    animate();
}

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

function animate() {
    requestAnimationFrame(animate);

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    // Sterne rotieren für dynamischen Effekt
    stars.rotation.y += 0.002;

    // Kamera reagiert sanft auf Mausbewegungen
    camera.rotation.x += 0.05 * (targetY - camera.rotation.x);
    camera.rotation.y += 0.05 * (targetX - camera.rotation.y);

    renderer.render(scene, camera);
}

// Fenstergröße anpassen
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

// GSAP-Animationen
function animateText() {
    gsap.to('.title', {
        duration: 1.5,
        opacity: 1,
        y: -20,
        ease: 'power3.out',
    });
    gsap.to('.subtitle', {
        duration: 1.5,
        opacity: 1,
        y: -20,
        ease: 'power3.out',
        delay: 0.3,
    });
    gsap.to('.discord-button', {
        duration: 1.5,
        opacity: 1,
        y: -20,
        ease: 'power3.out',
        delay: 0.6,
    });
}

// Initialisierung
init();
animateText();
