// ========================================
// CODEPEN TEST CODE - Copy everything below
// ========================================
// Add to CodePen JS Settings: https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.js

// Bumped Sinusoidal Warp - adapted from Shadertoy
// Original: https://www.shadertoy.com/view/4l2XWK
// CodePen test version - PixiJS v8.5.2

window.PresetSinusoidalwarp = {
    filter: null,
    container: null,
    sprite: null,
    startTime: null,

    init(app) {
        this.app = app;
        this.startTime = Date.now();

        // Fragment shader - adapted from Shadertoy
        const fragmentShader = `
precision highp float;

varying vec2 vTextureCoord;
uniform vec2 uResolution;
uniform float uTime;
uniform sampler2D uSampler;

// Simple 2D noise function for rust/plasma texture
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Multi-octave noise for rust texture
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 2.0;

    for(int i = 0; i < 5; i++) {
        value += amplitude * noise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }

    return value;
}

// Procedural rust/plasma texture
vec3 rustTexture(vec2 uv) {
    // Масштабируем координаты
    vec2 p = uv * 4.0;
    
    // 1. Генерация "нитей" через шум
    // Используем FBM с высокой частотой для создания тонких прожилок
    float n1 = fbm(p);
    float n2 = fbm(p + 12.0); // Смещение для второго слоя
    
    // Складываем шумы и обрезаем порог, чтобы получить линии вместо пятен
    float lines = smoothstep(0.45, 0.65, n1 + n2 * 0.5);
    
    
    // Инвертируем, чтобы линии были светлыми, а фон темным
    lines = 1.0 - lines*0.1;
    
    // Добавляем вариативности толщины (добавляем еще один слой шума)
    float thickness = fbm(p * 0.3);
    lines *= smoothstep(0.2, 0.8, thickness);
    
    // 2. Расчет цвета
    vec3 col = vec3(0.0);
    
    // Цвет линий (Электрический голубой)
    vec3 lineColor = vec3(1.0, 1.0, 1.0);
    
    // Добавляем яркость в центре линий (имитация неона)
    col += lineColor * lines;
    //col += vec3(0.8, 0.9, 1.0) * pow(lines, 3.0) * 2.0;

    return col;
}

// Warp function - from original shader
vec2 W(vec2 p) {
    p = (p + 3.0) * 4.0;
    float t = uTime / 2.0;

    // Layered, sinusoidal feedback, with time component
    for(int i = 0; i < 3; i++) {
        p += cos(p.yx * 3.0 + vec2(t, 1.57)) / 3.0;
        p += sin(p.yx + t + vec2(1.57, 0.0)) / 2.0;
        p *= 1.3;
    }

    // Jitter
    p += fract(sin(p + vec2(13.0, 7.0)) * 5e5) * 0.03 - 0.015;

    return mod(p, 2.0) - 1.0;
}

// Bump function
float bumpFunc(vec2 p) {
    return length(W(p)) * 0.7071;
}

vec3 smoothFract(vec3 x) {
    x = fract(x);
    return min(x, x * (1.0 - x) * 12.0);
}

void main() {
    // Screen coordinates (centered)
    vec2 uv = (vTextureCoord * uResolution - uResolution * 0.5) / uResolution.y;

    // Surface position, ray direction, light position, normal
    vec3 sp = vec3(uv, 0.0);
    vec3 rd = normalize(vec3(uv, 1.0));
    vec3 lp = vec3(cos(uTime) * 0.5, sin(uTime) * 0.2, -1.0);
    vec3 sn = vec3(0.0, 0.0, -1.0);

    // Bump mapping
    vec2 eps = vec2(4.0 / uResolution.y, 0.0);

    float f = bumpFunc(sp.xy);
    float fx = bumpFunc(sp.xy - eps.xy);
    float fy = bumpFunc(sp.xy - eps.yx);

    const float bumpFactor = 0.05;

    fx = (fx - f) / eps.x;
    fy = (fy - f) / eps.x;
    sn = normalize(sn + vec3(fx, fy, 0.0) * bumpFactor);

    // Lighting
    vec3 ld = lp - sp;
    float lDist = max(length(ld), 0.0001);
    ld /= lDist;

    float atten = 1.0 / (1.0 + lDist * lDist * 0.15);
    atten *= f * 0.9 + 0.1;

    float diff = max(dot(sn, ld), 0.0);
    diff = pow(diff, 4.0) * 0.66 + pow(diff, 8.0) * 0.34;
    float spec = pow(max(dot(reflect(-ld, sn), -rd), 0.0), 12.0);

    // Texture color - using procedural rust texture instead of iChannel0
    vec3 texCol = rustTexture(sp.xy + W(sp.xy) / 8.0) ;
    texCol *= texCol; // sRGB to linear
    texCol = smoothstep(0.05, 0.75, pow(texCol, vec3(0.75, 0.8, 0.85)));

    // Final color
    vec3 col = (texCol * (diff * vec3(1.0, 0.97, 0.92) * 2.0 + 0.5) + vec3(1.0, 0.6, 0.2) * spec * 2.0) * atten;

    // Faux environment mapping
    float ref = max(dot(reflect(rd, sn), vec3(1.0)), 0.0);
    col += col * pow(ref, 4.0) * vec3(0.25, 0.5, 1.0) * 3.0;

    // Gamma correction
    gl_FragColor = vec4(sqrt(clamp(col, 0.0, 1.0)), 1.0); 
    //gl_FragColor = vec4(rustTexture(uv), 1.0); // this for debugging
}
`;

        // Create filter with shader
        this.filter = new PIXI.Filter({
            glProgram: PIXI.GlProgram.from({
                vertex: `
                    in vec2 aPosition;
                    out vec2 vTextureCoord;

                    uniform vec4 uInputSize;
                    uniform vec4 uOutputFrame;
                    uniform vec4 uOutputTexture;

                    vec4 filterVertexPosition() {
                        vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
                        position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
                        position.y = position.y * (2.0 * uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;
                        return vec4(position, 0.0, 1.0);
                    }

                    vec2 filterTextureCoord() {
                        return aPosition * (uOutputFrame.zw * uInputSize.zw);
                    }

                    void main() {
                        gl_Position = filterVertexPosition();
                        vTextureCoord = filterTextureCoord();
                    }
                `,
                fragment: fragmentShader,
            }),
            resources: {
                uniforms: {
                    uTime: { value: 0.0, type: 'f32' },
                    uResolution: { value: [window.innerWidth, window.innerHeight], type: 'vec2<f32>' }
                }
            }
        });

        // Create container and sprite for fullscreen effect
        this.container = new PIXI.Container();

        // Create a simple rectangle to apply filter
        const graphics = new PIXI.Graphics();
        graphics.rect(0, 0, this.app.screen.width, this.app.screen.height);
        graphics.fill(0x000000);

        this.sprite = graphics;
        this.sprite.filters = [this.filter];

        this.container.addChild(this.sprite);
        this.app.stage.addChild(this.container);
    },

    animate(delta) {
        if (!this.filter) return;

        // Update time uniform
        const elapsed = (Date.now() - this.startTime) / 1000;
        this.filter.resources.uniforms.uniforms.uTime = elapsed;
    },

    cleanup() {
        if (this.container) {
            this.app.stage.removeChild(this.container);
            this.container.destroy({ children: true });
        }
        if (this.filter) {
            this.filter.destroy();
        }
        this.filter = null;
        this.container = null;
        this.sprite = null;
    }
};

// ========================================
// INITIALIZATION CODE FOR CODEPEN
// ========================================
(async () => {
    // Create PixiJS app
    const app = new PIXI.Application();

    // Initialize
    await app.init({
        resizeTo: window,
        backgroundColor: 0x000000,
        antialias: true,
        resolution: window.devicePixelRatio || 1
    });

    // Add canvas to page
    document.body.appendChild(app.canvas);

    // Initialize preset
    window.PresetSinusoidalwarp.init(app);

    // Start animation
    app.ticker.add((delta) => {
        window.PresetSinusoidalwarp.animate(delta);
    });
})();
