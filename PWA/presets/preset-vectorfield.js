// Vector Field Preset - Adapted for PixiJS v8.5.2
// Original: https://codepen.io/devamar/pen/MWKLjdg
// Particle flow through rotating vector field with trail accumulation

window.PresetVectorfield = {
    field: [],
    points: [],
    iter: 0,
    dtheta: 0.01,
    theta: 0,

    renderTexture: null,
    renderSprite: null,
    tempGraphics: null,

    hue_seed: 0,
    scl: 0,

    init(app) {
        this.app = app;
        this.field = [];
        this.points = [];
        this.theta = 0;

        this.hue_seed = Math.random();
        this.scl = Math.min(this.app.screen.width, this.app.screen.height) / 1.5;

        // Create RenderTexture for persistent trails
        this.renderTexture = PIXI.RenderTexture.create({
            width: this.app.screen.width,
            height: this.app.screen.height
        });

        this.renderSprite = new PIXI.Sprite(this.renderTexture);
        this.app.stage.addChild(this.renderSprite);

        // Temporary graphics for drawing new points each frame
        this.tempGraphics = new PIXI.Graphics();
        this.tempGraphics.blendMode = 'add';

        this.createVectorField();
        this.createPoints();
    },

    createVectorField() {
        // Create 20 force points
        for (let i = 0; i < 20; i++) {
            const theta = 2 * Math.random() * Math.PI;
            const r = Math.random() * 0.5 + 0.1;

            const location = [r * Math.cos(theta), r * Math.sin(theta)];
            const direction = [Math.random() - 0.5, Math.random() - 0.5];

            const alttheta = 2 * Math.random() * Math.PI;
            const altr = Math.random() * 0.5 + 0.1;
            const altlocation = [altr * Math.cos(alttheta), altr * Math.sin(alttheta)];

            this.field.push(
                new PointVector(
                    ...location.map((x) => this.scl * x),
                    ...altlocation.map((x) => this.scl * x),
                    ...direction
                )
            );
        }
    },

    createPoints() {
        // Create 250 particles
        const numPoints = window.innerWidth < 768 ? 150 : 250;

        for (let _ = 0; _ < numPoints; _++) {
            const location = [Math.random() - 0.5, Math.random() - 0.5];
            const pt = new Point(...location.map((x) => 1 * this.scl * x));
            this.points.push(pt);
        }
    },

    animate(delta) {
        if (this.theta > 2 * Math.PI) return;

        // Clear temp graphics
        this.tempGraphics.clear();

        const width = this.app.screen.width;
        const height = this.app.screen.height;

        // 150 iterations to draw smooth trails
        for (this.iter = 0; this.iter < 150; this.iter++) {
            for (let i = 0; i < this.points.length; i++) {
                this.points[i].update(this.field);

                // Skip if point hasn't moved
                if (
                    Math.abs(this.points[i].px - this.points[i].ipx) < 0.1 &&
                    Math.abs(this.points[i].py - this.points[i].ipy) < 0.1
                ) {
                    continue;
                }

                let d =
                    ((this.points[i].px - this.points[i].ipx) ** 2 +
                        (this.points[i].py - this.points[i].ipy) ** 2) **
                    0.5;

                d = Math.min(Math.max(d * 100, 0), 1);

                let h = ((this.hue_seed + 0.2 * (i / this.points.length)) % 1) * 360;
                let b = 0.4 * (1 - this.iter / 150) + 0.4;

                const color = this.hslToHex(h, d, b);

                // Draw point to temp graphics
                const x = this.points[i].px + width / 2;
                const y = this.points[i].py + height / 2;

                this.tempGraphics.rect(x, y, 1, 1);
                this.tempGraphics.fill({ color: color, alpha: 0.01 });
            }
        }

        // Render temp graphics to texture ONCE after all iterations
        this.app.renderer.render({
            container: this.tempGraphics,
            target: this.renderTexture,
            clear: false
        });

        // Rotate vector field
        let cdtheta = Math.cos(this.dtheta);
        let sdtheta = Math.sin(this.dtheta);

        for (const pv of this.field) {
            const dx = pv.dx * cdtheta - pv.dy * sdtheta;
            const dy = pv.dx * sdtheta + pv.dy * cdtheta;

            pv.dx = dx;
            pv.dy = dy;
        }

        this.theta += this.dtheta;

        // Reset points to initial positions
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].px = this.points[i].ipx;
            this.points[i].py = this.points[i].ipy;

            this.points[i].vx = 0;
            this.points[i].vy = 0;
        }
    },

    hslToHex(h, s, l) {
        let a = s * Math.min(l, 1 - l);
        let f = (n, k = (n + h / 30) % 12) =>
            l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

        const r = Math.floor(f(0) * 255);
        const g = Math.floor(f(8) * 255);
        const b = Math.floor(f(4) * 255);

        return (r << 16) | (g << 8) | b;
    },

    cleanup() {
        if (this.renderSprite) {
            this.app.stage.removeChild(this.renderSprite);
            this.renderSprite.destroy();
        }

        if (this.renderTexture) {
            this.renderTexture.destroy(true);
        }

        if (this.tempGraphics) {
            this.tempGraphics.destroy();
        }

        this.field = [];
        this.points = [];
        this.renderTexture = null;
        this.renderSprite = null;
        this.tempGraphics = null;
    }
};

// Helper classes
class PointVector {
    constructor(px, py, altx, alty, dx, dy) {
        this.px = px;
        this.py = py;
        this.altx = altx;
        this.alty = alty;
        this.dx = dx;
        this.dy = dy;
    }
}

class Point {
    constructor(px, py) {
        this.ipx = px;
        this.ipy = py;
        this.px = px;
        this.py = py;
        this.vx = 0;
        this.vy = 0;
    }

    update(field) {
        this.px += this.vx;
        this.py += this.vy;

        this.vx *= 0.97;
        this.vy *= 0.97;

        for (const pv of field) {
            const dist = (pv.px - this.px) ** 2 + (pv.py - this.py) ** 2;
            const mult = Math.exp(-0.0015 * dist);

            this.vx += mult * pv.dx;
            this.vy += mult * pv.dy;
        }
    }
}
