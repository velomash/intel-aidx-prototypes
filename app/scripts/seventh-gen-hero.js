import Projector from 'three/examples/js/renderers/Projector.js';
import CanvasRenderer from 'three/examples/js/renderers/CanvasRenderer.js';
import TWEEN from 'tween.js';

class chipParticleSystem {
    constructor(containerDiv) {
        this.container = containerDiv;
        this.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 4000);
        this.camera.position.z = 500;
        this.scene = new THREE.Scene();
        this.scene.add(this.camera);
        this.renderer = new THREE.CanvasRenderer({
            alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);
        this.particles = this.makeParticles();
        this.particles.forEach(particle => this.initParticleTween(particle));
        this.animate();
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
        const material = new THREE.SpriteMaterial({
            map: new THREE.CanvasTexture(canvas),
            blending: THREE.AdditiveBlending,
            opacity: 0,
        });
        const particles = [];
        for (var i = 0; i < 1000; i++) {
            const particle = new THREE.Sprite(material);
            const vector = new THREE.Vector3();
            vector.setX(randomNumberInRange(-2000, 2000));
            vector.setY(randomNumberInRange(-1000, 1000));
            vector.setZ(randomNumberInRange(-2000, 2000));
            particle.start = vector.clone().setLength(randomNumberInRange(500, 1000));
            particle.end = vector.clone().setLength(randomNumberInRange(1500, 2000));
            particle.position.fromArray(particle.start.toArray());
            particle.scale.x = particle.scale.y = Math.random() * 12 + 5;
            this.scene.add(particle);
            particles.push(particle);
        }

        function randomNumberInRange(startRange, endRange) {
            return Math.random() * (endRange - startRange - 1) + startRange;
        }
        return particles;
    }


    initParticleTween(particle) {
        const tween = new TWEEN.Tween(particle.position)
            .to(particle.end, 10000)
            .start();
        new TWEEN.Tween(particle.material)
            .to({
                opacity: 1,
            }, 500)
            .start();
    }

    // the animate funciton runs 60fps and renders
    // the objects as they move & interact
    animate(time) {
        requestAnimationFrame(this.animate.bind(this));
        TWEEN.update();
        this.renderer.render(this.scene, this.camera);
    }
}

export default new chipParticleSystem(document.getElementById('particle-system'))
