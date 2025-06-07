const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.getElementById('canvas-container').appendChild(renderer.domElement);


const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

function createStarField() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);

    // Generate random star positions
    for (let i = 0; i < starCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 2000; // x
        positions[i + 1] = (Math.random() - 0.5) * 2000; // y
        positions[i + 2] = (Math.random() - 0.5) * 2000; // z
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2,
        transparent: true,
        opacity: 0.8
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    return stars;
}

const stars = createStarField();

// Creating Sun here
function createSun() {
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFD700,
        transparent: true,
        opacity: 0.9
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);

    // glow effect
    const glowGeometry = new THREE.SphereGeometry(6, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFD700,
        transparent: true,
        opacity: 0.3
    });
    const sunGlow = new THREE.Mesh(glowGeometry, glowMaterial);

    const sunLight = new THREE.PointLight(0xFFD700, 1.5, 100);
    sunLight.position.set(0, 0, 0);

    scene.add(sun);
    scene.add(sunGlow);
    scene.add(sunLight);

    return { sun, sunGlow, sunLight };
}

const { sun, sunGlow, sunLight } = createSun();

let mouseDown = false;
let mouseX = 0;
let mouseY = 0;
let cameraAngle = { x: 0, y: 0 };
let cameraDistance = 100;

// Set initial camera position
camera.position.set(0, 0, cameraDistance);
camera.lookAt(0, 0, 0);

// Mouse event handlers for camera control
renderer.domElement.addEventListener('mousedown', (e) => {
    mouseDown = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
});

renderer.domElement.addEventListener('mouseup', () => {
    mouseDown = false;
});

renderer.domElement.addEventListener('mousemove', (e) => {
    if (!mouseDown) return;

    const deltaX = e.clientX - mouseX;
    const deltaY = e.clientY - mouseY;

    cameraAngle.y += deltaX * 0.01;
    cameraAngle.x += deltaY * 0.01;

    cameraAngle.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cameraAngle.x));

    mouseX = e.clientX;
    mouseY = e.clientY;
});

renderer.domElement.addEventListener('wheel', (e) => {
    cameraDistance += e.deltaY * 0.1;
    cameraDistance = Math.max(50, Math.min(500, cameraDistance));
});

function updateCamera() {
    camera.position.x = Math.cos(cameraAngle.y) * Math.cos(cameraAngle.x) * cameraDistance;
    camera.position.y = Math.sin(cameraAngle.x) * cameraDistance;
    camera.position.z = Math.sin(cameraAngle.y) * Math.cos(cameraAngle.x) * cameraDistance;
    camera.lookAt(0, 0, 0);
}

function animate() {
    requestAnimationFrame(animate);

    stars.rotation.x += 0.0001;
    stars.rotation.y += 0.0002;

    updateCamera();

    renderer.render(scene, camera);
}


function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleResize);

animate();