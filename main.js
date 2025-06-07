const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight,
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



// Plnet Data

const planetData = [
    {
        name: 'mercury',
        size: 0.8,
        distance: 8,
        color: 0x8C7853,
        speed: 1.59,
        texture: null
    },
    {
        name: 'venus',
        size: 1.2,
        distance: 12,
        color: 0xFFC649,
        speed: 1.18,
        texture: null
    },
    {

        name: 'earth',
        size: 1.3,
        distance: 16,
        color: 0x6B93D6,
        speed: 1.0, // Earth is our baseline
        texture: null
    }, {
        name: 'mars',
        size: 1.0,
        distance: 20,
        color: 0xC1440E,
        speed: 0.81,
        texture: null
    }, {
        name: 'jupiter',
        size: 3.5,
        distance: 28,
        color: 0xD8CA9D,
        speed: 0.44,
        texture: null
    },
    {
        name: 'saturn',
        size: 3.0,
        distance: 38,
        color: 0xFAD5A5,
        speed: 0.32,
        texture: null
    },
    {
        name: 'uranus',
        size: 2.2,
        distance: 48,
        color: 0x4FD0E7,
        speed: 0.23,
        texture: null
    },
    {
        name: 'neptune',
        size: 2.1,
        distance: 58,
        color: 0x4B70DD,
        speed: 0.18,
        texture: null
    }
]



