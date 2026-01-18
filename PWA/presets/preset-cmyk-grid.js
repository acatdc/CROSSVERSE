// CMYK Grid Preset - Adapted for PixiJS v8.5.2
// Original: https://codepen.io/osublake/pen/ZEYXrBK
// Grid of RGB circle triads with GSAP animation

window.PresetCmykgrid = {
    gridContainer: null,
    timeline: null,
    tickerFunc: null,

    gridSize: 11,
    circD: 63,
    circOffsetX: 0.11111,
    circOffsetY: 0.15873,
    color1: 0x01AFF6, // blue
    color2: 0xF20085, // pink
    color3: 0xFFD036, // yellow
    animDuration: 0.8,

    init(app) {
        this.app = app;

        // Register GSAP PixiPlugin
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(PixiPlugin);
            PixiPlugin.registerPIXI(PIXI);
        }

        // Create main container for the grid
        this.gridContainer = new PIXI.Container();
        this.app.stage.addChild(this.gridContainer);

        this.createGrid();
        this.startAnimation();
    },

    createGrid() {
        // Add background rectangle with original color
        const gridWidth = this.gridSize * this.circD + (this.gridSize - 1) * 2;
        const gridHeight = this.gridSize * this.circD + (this.gridSize - 1) * 2;

        const background = new PIXI.Graphics();
        background.rect(0, 0, gridWidth, gridHeight);
        background.fill({ color: 0xDAE0D2, alpha: 1 });
        this.gridContainer.addChild(background);

        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const container = new PIXI.Container();

                // Create 3 circle containers
                const circContainer1 = new PIXI.Container();
                const circContainer2 = new PIXI.Container();
                const circContainer3 = new PIXI.Container();

                // Circle 1 (Blue)
                const circle1 = new PIXI.Graphics();
                circle1.circle(0, 0, this.circD / 2);
                circle1.fill({ color: this.color1, alpha: 1 });
                circle1.blendMode = 'multiply';
                circContainer1.addChild(circle1);
                circContainer1.x = 0;
                circContainer1.y = 0;
                container.addChild(circContainer1);

                // Circle 2 (Pink)
                const circle2 = new PIXI.Graphics();
                circle2.circle(0, 0, this.circD / 2);
                circle2.fill({ color: this.color2, alpha: 1 });
                circle2.blendMode = 'multiply';
                circContainer2.addChild(circle2);
                circContainer2.x = -this.circOffsetX * this.circD;
                circContainer2.y = this.circOffsetY * this.circD;
                container.addChild(circContainer2);

                // Circle 3 (Yellow)
                const circle3 = new PIXI.Graphics();
                circle3.circle(0, 0, this.circD / 2);
                circle3.fill({ color: this.color3, alpha: 1 });
                circle3.blendMode = 'multiply';
                circContainer3.addChild(circle3);
                circContainer3.x = this.circOffsetX * this.circD;
                circContainer3.y = this.circOffsetY * this.circD;
                container.addChild(circContainer3);

                this.gridContainer.addChild(container);

                // Position the container in grid
                container.x = i * this.circD + this.circD / 2 + i * 2;
                container.y = j * this.circD + this.circD / 2 + j * 2;
            }
        }

        // Center the grid (gridWidth and gridHeight already calculated above)
        this.gridContainer.x = (this.app.screen.width - gridWidth) / 2;
        this.gridContainer.y = (this.app.screen.height - gridHeight) / 2;
    },

    startAnimation() {
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded, skipping animations');
            return;
        }

        // Get only circle containers (skip first child which is background)
        const circleContainers = Array.from(this.gridContainer.children).slice(1);

        this.timeline = gsap.timeline({ delay: 0.2 })
            // Initial appearance animation
            .from(circleContainers, {
                pixi: { scale: 0, rotation: 360 },
                duration: 2,
                ease: 'power4',
                stagger: {
                    each: 0.1,
                    grid: [this.gridSize, this.gridSize],
                    from: [0, 1]
                }
            })
            // Pulsating animation
            .to(circleContainers, {
                duration: this.animDuration,
                ease: 'sine.inOut',
                stagger: {
                    each: 0.1,
                    repeat: -1,
                    yoyo: true,
                    grid: [this.gridSize, this.gridSize],
                    from: [0, 1],
                    onStart: function() {
                        gsap.to(this.targets()[0].children, {
                            pixi: { scale: 0.15 },
                            duration: window.PresetCmykgrid.animDuration,
                            ease: 'sine.inOut',
                            repeat: -1,
                            yoyo: true
                        });
                    }
                }
            }, 0.1);
    },

    animate(delta) {
        // GSAP handles all animations via its own ticker
        // This method exists for compatibility with the preset pattern
    },

    cleanup() {
        // Kill GSAP timeline
        if (this.timeline) {
            this.timeline.kill();
            this.timeline = null;
        }

        // Remove grid container
        if (this.gridContainer) {
            this.app.stage.removeChild(this.gridContainer);
            this.gridContainer.destroy({ children: true });
            this.gridContainer = null;
        }
    }
};
