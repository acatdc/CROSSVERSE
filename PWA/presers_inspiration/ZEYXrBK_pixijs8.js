// CMYK Grid Preset - Adapted for PixiJS v8.5.2
// Original: https://codepen.io/osublake/pen/ZEYXrBK
// Grid of RGB circle triads with GSAP animation

// Register GSAP PixiPlugin
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

let app, stage;
const gridSize = 11;
const circD = 63; // circle diameter
const circOffsetX = 0.11111; // circle2/3 x offset
const circOffsetY = 0.15873; // circle2/3 y offset
const color1 = 0x01AFF6; // blue
const color2 = 0xF20085; // pink
const color3 = 0xFFD036; // yellow
const animDuration = 0.8;

async function setup() {
    // Create a Pixi Application (v8 API)
    app = new PIXI.Application();

    await app.init({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0xDAE0D2,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
    });

    document.body.appendChild(app.canvas);

    // Stop Pixi ticker, use GSAP ticker instead
    app.ticker.stop();
    gsap.ticker.add(() => {
        app.ticker.update();
    });

    createGrid();
    animate();
}

function createGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const container = new PIXI.Container();

            // Create 3 circle containers
            const circContainer1 = new PIXI.Container();
            const circContainer2 = new PIXI.Container();
            const circContainer3 = new PIXI.Container();

            // Circle 1 (Blue)
            const circle1 = new PIXI.Graphics();
            circle1.circle(0, 0, circD / 2);
            circle1.fill({ color: color1, alpha: 1 });
            circle1.blendMode = 'multiply';
            circContainer1.addChild(circle1);
            circContainer1.x = 0;
            circContainer1.y = 0;
            container.addChild(circContainer1);

            // Circle 2 (Pink)
            const circle2 = new PIXI.Graphics();
            circle2.circle(0, 0, circD / 2);
            circle2.fill({ color: color2, alpha: 1 });
            circle2.blendMode = 'multiply';
            circContainer2.addChild(circle2);
            circContainer2.x = -circOffsetX * circD;
            circContainer2.y = circOffsetY * circD;
            container.addChild(circContainer2);

            // Circle 3 (Yellow)
            const circle3 = new PIXI.Graphics();
            circle3.circle(0, 0, circD / 2);
            circle3.fill({ color: color3, alpha: 1 });
            circle3.blendMode = 'multiply';
            circContainer3.addChild(circle3);
            circContainer3.x = circOffsetX * circD;
            circContainer3.y = circOffsetY * circD;
            container.addChild(circContainer3);

            app.stage.addChild(container);

            // Position the container in grid
            container.x = i * circD + circD / 2 + i * 2;
            container.y = j * circD + circD / 2 + j * 2;
        }
    }

    // Center the grid
    const gridWidth = gridSize * circD + (gridSize - 1) * 2;
    const gridHeight = gridSize * circD + (gridSize - 1) * 2;
    app.stage.x = (app.screen.width - gridWidth) / 2;
    app.stage.y = (app.screen.height - gridHeight) / 2;
}

function animate() {
    gsap.timeline({ delay: 0.2 })
        // Initial appearance animation
        .from(app.stage.children, {
            pixi: { scale: 0, rotation: 360 },
            duration: 2,
            ease: 'power4',
            stagger: {
                each: 0.1,
                grid: [gridSize, gridSize],
                from: [0, 1]
            }
        })
        // Pulsating animation
        .to(app.stage.children, {
            duration: animDuration,
            ease: 'sine.inOut',
            stagger: {
                each: 0.1,
                repeat: -1,
                yoyo: true,
                grid: [gridSize, gridSize],
                from: [0, 1],
                onStart: function() {
                    gsap.to(this.targets()[0].children, {
                        pixi: { scale: 0.15 },
                        duration: animDuration,
                        ease: 'sine.inOut',
                        repeat: -1,
                        yoyo: true
                    });
                }
            }
        }, 0.1);
}

// Start
(async () => {
    await setup();
})();
