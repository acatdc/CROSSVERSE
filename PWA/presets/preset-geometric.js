// Geometric Shapes Preset
// Animated geometric shapes: circles, triangles, rectangles

window.PresetGeometric = {
    shapes: [],

    init(app) {
        this.app = app;
        this.shapes = [];
        this.createGeometricShapes();
    },

    createGeometricShapes() {
        const numShapes = window.innerWidth < 768 ? 8 : 12;

        for (let i = 0; i < numShapes; i++) {
            const shapeType = Math.floor(Math.random() * 3);
            let shape;

            if (shapeType === 0) {
                // Circle
                shape = new PIXI.Graphics();
                const radius = Math.random() * 40 + 20;
                shape.circle(0, 0, radius);
                shape.fill({ color: this.getRandomColor(), alpha: 0.6 });
            } else if (shapeType === 1) {
                // Triangle
                shape = new PIXI.Graphics();
                const size = Math.random() * 60 + 30;
                shape.moveTo(0, -size / 2);
                shape.lineTo(size / 2, size / 2);
                shape.lineTo(-size / 2, size / 2);
                shape.lineTo(0, -size / 2);
                shape.fill({ color: this.getRandomColor(), alpha: 0.6 });
            } else {
                // Rectangle
                shape = new PIXI.Graphics();
                const width = Math.random() * 60 + 30;
                const height = Math.random() * 60 + 30;
                shape.rect(-width / 2, -height / 2, width, height);
                shape.fill({ color: this.getRandomColor(), alpha: 0.6 });
            }

            shape.x = Math.random() * this.app.screen.width;
            shape.y = Math.random() * this.app.screen.height;

            shape.vx = (Math.random() - 0.5) * 2;
            shape.vy = (Math.random() - 0.5) * 2;
            shape.rotation = Math.random() * Math.PI * 2;
            shape.rotationSpeed = (Math.random() - 0.5) * 0.05;
            shape.scale.set(Math.random() * 0.5 + 0.5);
            shape.pulseSpeed = Math.random() * 0.02 + 0.01;
            shape.pulsePhase = Math.random() * Math.PI * 2;

            this.app.stage.addChild(shape);
            this.shapes.push(shape);
        }
    },

    getRandomColor() {
        const colors = [0x667eea, 0x764ba2, 0x48c6ef, 0x6f86d6, 0xa8edea, 0xfed6e3];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    animate(delta) {
        this.shapes.forEach(shape => {
            // Move shapes
            shape.x += shape.vx;
            shape.y += shape.vy;

            // Bounce off edges
            if (shape.x < 0 || shape.x > this.app.screen.width) {
                shape.vx *= -1;
                shape.x = Math.max(0, Math.min(this.app.screen.width, shape.x));
            }
            if (shape.y < 0 || shape.y > this.app.screen.height) {
                shape.vy *= -1;
                shape.y = Math.max(0, Math.min(this.app.screen.height, shape.y));
            }

            // Rotate shapes
            shape.rotation += shape.rotationSpeed;

            // Pulse effect
            shape.pulsePhase += shape.pulseSpeed;
            const pulse = Math.sin(shape.pulsePhase) * 0.2 + 1;
            shape.scale.set(pulse * (Math.random() * 0.5 + 0.5));
        });
    },

    cleanup() {
        this.shapes.forEach(shape => {
            this.app.stage.removeChild(shape);
            shape.destroy();
        });
        this.shapes = [];
    }
};
