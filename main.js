// Three.js Setup
let scene, camera, renderer, stars, starGeo;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Sterne erstellen
    starGeo = new THREE.BufferGeometry();
    const starCount = 10000;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const sprite = new THREE.TextureLoader().load('https://i.imgur.com/Y0jzX5D.png');
    const starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 1,
        map: sprite,
        transparent: true,
    });

    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    // Mausinteraktion
    document.addEventListener('mousemove', onMouseMove, false);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    stars.rotation.y += 0.0002;

    renderer.render(scene, camera);
}

function onMouseMove(event) {
    let mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    let mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    camera.position.x += mouseX * 0.05;
    camera.position.y += mouseY * 0.05;
    camera.lookAt(scene.position);
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
