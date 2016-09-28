import Projector from 'three/examples/js/renderers/Projector.js';
import CanvasRenderer from 'three/examples/js/renderers/CanvasRenderer.js';

class chipParticleSystem {
    constructor(containerDiv) {
        this.container = containerDiv;
        this.container.addEventListener('click', event => {
            const link = document.getElementById('main-cta');
            window.location.href = link.href;
        });
        this.init3dEnvironment();
        window.addEventListener('resize', event => {
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
            this.camera.maxDimention = Math.max(this.container.clientWidth, this.container.clientHeight);
            this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
            this.camera.updateProjectionMatrix();
        });
        this.particles = this.makeParticles();
        this.particles.forEach(particle => {
            this.initParticle(particle);
            this.scene.add(particle);
        });
        this.animate();
    }

    init3dEnvironment() {
        this.renderer = new THREE.CanvasRenderer({
            alpha: true
        });
        this.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 4000);
        this.camera.maxDimention = Math.max(this.container.clientWidth, this.container.clientHeight);
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.position.z = 500;
        this.scene = new THREE.Scene();
        this.scene.add(this.camera);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);
        this.camera.updateProjectionMatrix();
    }

    makeParticles() {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(0, 255, 255, 1)');
        gradient.addColorStop(0.4, 'rgba(0, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 0, 64, 0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        const particles = [];
        for (var i = 0; i < 512; i++) {
            const material = new THREE.SpriteMaterial({
                map: new THREE.CanvasTexture(canvas),
                blending: THREE.AdditiveBlending,
            });
            const particle = new THREE.Sprite(material);
            particles.push(particle);
        }
        return particles;
    }

    initParticle(particle) {
        particle.vector = new THREE.Vector3(
            this.getRandomNumberInRange(-2000, 2000),
            this.getRandomNumberInRange(-1000, 1000),
            this.getRandomNumberInRange(-2000, 500)
        );
        particle.start = this.getRandomNumberInRange(500, 1000);
        particle.end = this.getRandomNumberInRange(1500, 2000);
        particle.position.fromArray(particle.vector.toArray());
        particle.scale.x = particle.scale.y = this.getRandomNumberInRange(7, 21);
        particle.material.opacity = 0;
        particle.delay = this.getRandomNumberInRange(0, 10000);
        particle.progress = 0;
    }

    getRandomNumberInRange(startRange, endRange) {
        return Math.random() * (endRange - startRange - 1) + startRange;
    }

    // the animate funciton runs 60fps and renders
    // the objects as they move & interact
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.updateParticles();
        this.renderer.render(this.scene, this.camera);
    }
    updateParticles() {
        for (var i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            if (particle.delay > 0) {
                particle.delay -= 1000 / 60;
                continue;
            }
            particle.progress += 1000 / 60 / 10000;
            if (particle.progress > 1) {
                this.initParticle(particle);
                continue;
            }
            // fade in
            if (particle.progress < 0.1) {
                particle.material.opacity = particle.progress * 10;
            }
            // fade out
            if (particle.progress > 0.9) {
                particle.material.opacity = (1 - particle.progress) * 10;
            }
            const length = particle.start + (particle.end - particle.start) * particle.progress;
            const newPosition = particle.vector.clone().setLength(length);
            particle.position.fromArray(newPosition.toArray());
        }
    }
}

window.addEventListener('load', event => {
    const ps = new chipParticleSystem(document.getElementById('particle-system'));
});

export default chipParticleSystem;
