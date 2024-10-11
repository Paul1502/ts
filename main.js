// Three.js Szene einrichten
let scene, camera, renderer, stars, starGeo;

function init() {
    // Szene, Kamera und Renderer erstellen
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Sterne erstellen
    starGeo = new THREE.BufferGeometry();
    let positions = [];
    for (let i = 0; i < 6000; i++) {
        positions.push(
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300
        );
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    let sprite = new THREE.TextureLoader().load('https://i.imgur.com/Y0jzX5D.png');
    let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        map: sprite
    });

    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    animate();
}

function animate() {
    starGeo.attributes.position.array.forEach((value, index) => {
        if (index % 3 === 1) {
            starGeo.attributes.position.array[index] -= 0.2;
            if (starGeo.attributes.position.array[index] < -200) {
                starGeo.attributes.position.array[index] = 200;
            }
        }
    });
    starGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

// GSAP Animationen für den Text
function animateText() {
    gsap.to('.title', { duration: 2, opacity: 1, y: -20, ease: 'power2.out' });
    gsap.to('.subtitle', { duration: 2, opacity: 1, y: 20, ease: 'power2.out', delay: 0.5 });
}

// Mausinteraktion
document.addEventListener('mousemove', onDocumentMouseMove, false);
let mouseX = 0, mouseY = 0;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
}

// Fenstergröße ändern
window.addEventListener('resize', onWindowResize, false);

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialisierung
init();
animateText();
