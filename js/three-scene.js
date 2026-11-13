/**
 * R1ZZZ Elite Portfolio - Three.js WebGL Particle / Geometric Background Field
 */

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("webgl-container");
    if (!container || typeof THREE === 'undefined') return;

    // Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Geometry: Partikel Kuantum Geometris Berjaring
    const particlesCount = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 120;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material Titik Cahaya
    const material = new THREE.PointsMaterial({
        size: 0.7,
        color: 0xc86d51,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Interaksi Mouse Parallax pada WebGL Space
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
    });

    // Render Loop Berkualitas Tinggi (60 FPS)
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Rotasi perlahan sistem partikel
        particleSystem.rotation.y = elapsedTime * 0.03;
        particleSystem.rotation.x = elapsedTime * 0.015;

        // Kejar posisi mouse secara halus (lerp)
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        particleSystem.rotation.y += targetX;
        particleSystem.rotation.x += targetY;

        renderer.render(scene, camera);
    }

    animate();

    // Penyesuaian Responsif Ukuran Layar
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});