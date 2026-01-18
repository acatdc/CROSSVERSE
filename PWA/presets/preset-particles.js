// Particle Flow Preset
// Flowing particle system with trails

window.PresetParticles = {
    particles: [],

    init(app) {
        this.app = app;
        this.particles = [];
        this.createParticles();
    },

    createParticles() {
        const numParticles = window.innerWidth < 768 ? 30 : 50;

        for (let i = 0; i < numParticles; i++) {
            const particle = new PIXI.Graphics();
            const size = Math.random() * 6 + 2;

            particle.circle(0, 0, size);
            particle.fill({ color: this.getRandomColor(), alpha: 0.8 });

            particle.x = Math.random() * this.app.screen.width;
            particle.y = Math.random() * this.app.screen.height;

            particle.vx = (Math.random() - 0.5) * 3;
            particle.vy = (Math.random() - 0.5) * 3;
            particle.life = Math.random() * 200 + 100;
            particle.maxLife = particle.life;
            particle.originalAlpha = 0.8;

            this.app.stage.addChild(particle);
            this.particles.push(particle);
        }
    },

    getRandomColor() {
        const colors = [0x667eea, 0x764ba2, 0x48c6ef, 0x6f86d6, 0xa8edea, 0xfed6e3];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    animate(delta) {
        this.particles.forEach((particle, index) => {
            // Move particles
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.app.screen.width;
            if (particle.x > this.app.screen.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.app.screen.height;
            if (particle.y > this.app.screen.height) particle.y = 0;

            // Fade effect
            particle.life--;
            particle.alpha = particle.originalAlpha * (particle.life / particle.maxLife);

            // Respawn particle
            if (particle.life <= 0) {
                particle.x = Math.random() * this.app.screen.width;
                particle.y = Math.random() * this.app.screen.height;
                particle.vx = (Math.random() - 0.5) * 3;
                particle.vy = (Math.random() - 0.5) * 3;
                particle.life = particle.maxLife;
                particle.alpha = particle.originalAlpha;
            }
        });
    },

    cleanup() {
        this.particles.forEach(particle => {
            this.app.stage.removeChild(particle);
            particle.destroy();
        });
        this.particles = [];
    }
};
