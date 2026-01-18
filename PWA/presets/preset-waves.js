// Wave Motion Preset
// Animated sine wave patterns

window.PresetWaves = {
    waves: [],
    time: 0,

    init(app) {
        this.app = app;
        this.waves = [];
        this.time = 0;
        this.createWaves();
    },

    createWaves() {
        const numWaves = window.innerWidth < 768 ? 3 : 5;

        for (let i = 0; i < numWaves; i++) {
            const wave = new PIXI.Graphics();

            wave.amplitude = Math.random() * 80 + 30;
            wave.frequency = Math.random() * 0.1 + 0.01;
            wave.speed = Math.random() * 0.2 + 0.01;
            wave.yOffset = (this.app.screen.height / (numWaves + 1)) * (i + 1);
            wave.color = this.getRandomColor();
            wave.phase = Math.random() * Math.PI * 2;

            this.app.stage.addChild(wave);
            this.waves.push(wave);
        }
    },

    getRandomColor() {
        const colors = [0xe478a1, 0xe2eaa4, 0x95ecdd, 0x388d76, 0x1a274d, 0xfed6e3];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    animate(delta) {
        this.time += 0.2;

        this.waves.forEach(wave => {
            wave.clear();

            // Draw wave line
            const points = [];
            const steps = 200;

            for (let i = 0; i <= steps; i++) {
                const x = (this.app.screen.width / steps) * i;
                const y = wave.yOffset +
                         Math.sin(x * wave.frequency + this.time * wave.speed + wave.phase) *
                         wave.amplitude;
                points.push(x, y);
            }

            // Draw the wave
            wave.moveTo(points[0], points[1]);
            for (let i = 2; i < points.length; i += 2) {
                wave.lineTo(points[i], points[i + 1]);
            }
            wave.stroke({ color: wave.color, width: 3, alpha: 0.6 });

            // Add glow effect with second line
            wave.moveTo(points[0], points[1]);
            for (let i = 2; i < points.length; i += 2) {
                wave.lineTo(points[i], points[i + 1]);
            }
            wave.stroke({ color: wave.color, width: 6, alpha: 0.2 });
        });
    },

    cleanup() {
        this.waves.forEach(wave => {
            this.app.stage.removeChild(wave);
            wave.destroy();
        });
        this.waves = [];
    }
};
