// Everybody Is Watching You Game

// Core game engine
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.context = this.canvas.getContext('2d');
        this.isRunning = false;
        this.particles = [];
    }

    start() {
        this.isRunning = true;
        this.loop();
    }

    stop() {
        this.isRunning = false;
    }

    loop() {
        if (this.isRunning) {
            this.update();
            this.render();
            requestAnimationFrame(() => this.loop());
        }
    }

    update() {
        // Update game state
        this.updateParticles();
    }

    render() {
        // Clear canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderParticles();
        this.renderEyes();
    }

    // Particle system
    addParticle(x, y) {
        const particle = new Particle(x, y);
        this.particles.push(particle);
    }

    updateParticles() {
        this.particles.forEach((particle, index) => {
            particle.update();
            if (particle.isDead()) {
                this.particles.splice(index, 1);
            }
        });
    }

    renderParticles() {
        this.particles.forEach(particle => particle.render(this.context));
    }

    // Eye rendering
    renderEyes() {
        // Assume we have a list of eyes to render
        // This is simplified for demonstration
        const eyes = [{ x: 100, y: 100 }, { x: 200, y: 200 }];
        eyes.forEach(eye => {
            this.context.beginPath();
            this.context.arc(eye.x, eye.y, 20, 0, Math.PI * 2);
            this.context.fillStyle = 'rgba(0,0,0, 0.5)';
            this.context.fill();
            this.context.closePath();
        });
    }
}

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alpha = 1;
        this.size = Math.random() * 5 + 5;
    }

    update() {
        this.alpha -= 0.02;
    }

    isDead() {
        return this.alpha <= 0;
    }

    render(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        context.fill();
    }
}

// Player behavior detection
class Player {
    constructor() {
        this.position = { x: 50, y: 50 };
        this.size = 20;
    }

    update() {
        // Logic for player movement
    }

    detectBehavior(eyePosition) {
        const distance = Math.sqrt(
            (this.position.x - eyePosition.x) ** 2 + 
            (this.position.y - eyePosition.y) ** 2
        );
        return distance < this.size + 20; // 20 is the eye radius
    }
}

// Initialize game
const game = new Game();
game.start();
