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

const sunLight = new THREE.PointLight(0xffffff, 2, 300);
sunLight.position.set(0, 0, 0);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(0x404040, 0.1);
scene.add(ambientLight);

function createStarField() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 400;
        positions[i + 1] = (Math.random() - 0.5) * 400;
        positions[i + 2] = (Math.random() - 0.5) * 400;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1,
        transparent: true,
        opacity: 0.8
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}
createStarField();

const planetData = [
    { name: 'mercury', size: 0.8, distance: 8, color: 0x8C7853, speed: 1.59, texture: null },
    { name: 'venus', size: 1.2, distance: 12, color: 0xFFC649, speed: 1.18, texture: null },
    { name: 'earth', size: 1.3, distance: 16, color: 0x6B93D6, speed: 1.0, texture: null },
    { name: 'mars', size: 1.0, distance: 20, color: 0xC1440E, speed: 0.81, texture: null },
    { name: 'jupiter', size: 3.5, distance: 28, color: 0xD8CA9D, speed: 0.44, texture: null },
    { name: 'saturn', size: 3.0, distance: 38, color: 0xFAD5A5, speed: 0.32, texture: null },
    { name: 'uranus', size: 2.2, distance: 48, color: 0x4FD0E7, speed: 0.23, texture: null },
    { name: 'neptune', size: 2.1, distance: 58, color: 0x4B70DD, speed: 0.18, texture: null }
];

function createSun() {
    const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFD700,
        transparent: true,
        opacity: 0.9
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0, 0);
    scene.add(sun);

    const glowGeometry = new THREE.SphereGeometry(4, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFD700,
        transparent: true,
        opacity: 0.3
    });
    const sunGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(sunGlow);
    return { sun, sunGlow };
}

const { sun, sunGlow } = createSun();

const planets = [];

function createPlanet(data) {
    const geometry = new THREE.SphereGeometry(data.size, 32, 32);
    const material = new THREE.MeshLambertMaterial({
        color: data.color,
        transparent: true,
        opacity: 0.9
    });
    const planet = new THREE.Mesh(geometry, material);
    planet.castShadow = true;
    planet.receiveShadow = true;

    const orbitGeometry = new THREE.RingGeometry(data.distance - 0.1, data.distance + 0.1, 64);
    const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0x444444,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3
    });
    const orbitRing = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbitRing.rotation.x = Math.PI / 2;
    scene.add(orbitRing);

    planet.position.x = data.distance;
    planet.position.y = 0;
    planet.position.z = 0;
    scene.add(planet);

    return {
        mesh: planet,
        data: data,
        angle: Math.random() * Math.PI * 2,
        speedMultiplier: 1.0,
        orbitRing: orbitRing
    };
}

planetData.forEach(data => {
    planets.push(createPlanet(data));
});

let mouseDown = false;
let mouseX = 0;
let mouseY = 0;
let cameraAngle = { x: 0, y: 0 };
let cameraDistance = 80;

camera.position.set(0, 20, cameraDistance);
camera.lookAt(0, 0, 0);

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
    cameraAngle.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, cameraAngle.x));
    mouseX = e.clientX;
    mouseY = e.clientY;
});

renderer.domElement.addEventListener('wheel', (e) => {
    cameraDistance += e.deltaY * 0.1;
    cameraDistance = Math.max(20, Math.min(150, cameraDistance));
});

function updateCamera() {
    camera.position.x = Math.cos(cameraAngle.y) * Math.cos(cameraAngle.x) * cameraDistance;
    camera.position.y = Math.sin(cameraAngle.x) * cameraDistance;
    camera.position.z = Math.sin(cameraAngle.y) * Math.cos(cameraAngle.x) * cameraDistance;
    camera.lookAt(0, 0, 0);
}

const clock = new THREE.Clock();
let isPaused = false;

function animate() {
    requestAnimationFrame(animate);
    if (!isPaused) {
        const deltaTime = clock.getDelta();
        sunGlow.rotation.y += deltaTime * 0.5;
        sun.rotation.y += deltaTime * 0.3;
        planets.forEach(planet => {
            planet.angle += deltaTime * planet.data.speed * planet.speedMultiplier * 0.5;
            planet.mesh.position.x = Math.cos(planet.angle) * planet.data.distance;
            planet.mesh.position.z = Math.sin(planet.angle) * planet.data.distance;
            planet.mesh.rotation.y += deltaTime * 2;
        });
    }
    updateCamera();
    renderer.render(scene, camera);
}

planets.forEach(planet => {
    const slider = document.getElementById(`${planet.data.name}-speed`);
    const valueDisplay = document.getElementById(`${planet.data.name}-value`);
    slider.addEventListener('input', (e) => {
        planet.speedMultiplier = parseFloat(e.target.value);
        valueDisplay.textContent = `${planet.speedMultiplier.toFixed(1)}x`;
    });
});

const pauseBtn = document.getElementById('pauseBtn');
pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    pauseBtn.className = isPaused ? 'btn' : 'btn pause';
    if (!isPaused) clock.start();
});

const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', () => {
    planets.forEach(planet => {
        planet.angle = Math.random() * Math.PI * 2;
        planet.speedMultiplier = 1.0;
        const slider = document.getElementById(`${planet.data.name}-speed`);
        const valueDisplay = document.getElementById(`${planet.data.name}-value`);
        slider.value = 1.0;
        valueDisplay.textContent = '1.0x';
    });
    cameraAngle = { x: 0, y: 0 };
    cameraDistance = 80;
    isPaused = false;
    pauseBtn.textContent = 'Pause';
    pauseBtn.className = 'btn pause';
    clock.start();
});

function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleResize);

animate();
