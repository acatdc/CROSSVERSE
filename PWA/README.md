# Crossverse PWA - Project04

Progressive Web Application with dynamic splash screen presets system, animated loading bar, and PixiJS effects.

## Features

- **🎨 Dynamic Preset System**: Random splash screen animation on each load
- **📦 Preset Library**: Easily expandable animation presets
- **⏳ Animated Loading Bar**: Segmented progress bar with 5-second animation
- **🎯 PWA Support**: Full Progressive Web App functionality (online-only)
- **📱 Responsive**: Optimized for mobile, tablet, and desktop
- **💾 Installable**: Can be installed on home screen

## What's New in Project04

### New Presets
- **Vector Field** - 250 частиц через вращающееся векторное поле с trail accumulation
- **CMYK Grid** - 11×11 grid RGB триад с GSAP stagger анимацией и multiply blend mode

### Адаптация CodePen пресетов
Успешно адаптированы 2 пресета с codepen.io под PixiJS v8.5.2:
- Сохранена оригинальная логика и визуальный стиль
- Адаптированы под паттерн `window.PresetXxx` с методами `init()`, `animate()`, `cleanup()`
- Интегрированы GSAP анимации (PixiPlugin)
- Оптимизированы для работы с общей системой пресетов

### Available Presets
1. **Geometric Shapes** - анимированные геометрические фигуры (круги, треугольники, прямоугольники)
2. **Particle Flow** - система частиц с fade эффектом
3. **Wave Motion** - волновые sine паттерны
4. **Vector Field** - particle flow через rotating vector field с RenderTexture trails
5. **CMYK Grid** - RGB circle triads с GSAP stagger + multiply blend mode

### Architecture Changes
- Убран Service Worker (online-only приложение)
- Относительные пути для file:// совместимости
- Динамическая загрузка JS модулей

## Quick Start

**Требуется HTTP сервер** (из-за fetch API):

```bash
cd project04
python -m http.server 8000
```

Открой: http://localhost:8000

1. Наблюдай случайную splash screen анимацию
2. Жди 5 секунд (loading bar)
3. Нажми ENTER
4. Попадаешь в main app

## Adding New Preset

### 1. Создай preset файл

`presets/preset-stars.js`:
```javascript
window.PresetStars = {
    stars: [],

    init(app) {
        this.app = app;
        this.stars = [];
        // Create your objects
        // Add to app.stage
    },

    animate(delta) {
        // Animation logic
    },

    cleanup() {
        // Remove objects from stage
        // Destroy resources
    }
};
```

### 2. Добавь в манифест

`presets/presets.json`:
```json
{
  "id": "stars",
  "name": "Starfield",
  "file": "preset-stars.js",
  "description": "Animated starfield background"
}
```

### 3. Готово!
Пресет автоматически попадёт в ротацию.

## Project Structure

```
project04/
├── index.html              # Main application
├── manifest.json           # PWA manifest
├── presets/
│   ├── presets.json       # Preset manifest
│   ├── preset-geometric.js
│   ├── preset-particles.js
│   ├── preset-waves.js
│   ├── preset-vectorfield.js  # NEW: Vector field preset
│   └── preset-cmyk-grid.js    # NEW: CMYK grid preset
├── presers_inspiration/
│   ├── MWKLjdg.js         # Original CodePen: Vector Field
│   └── ZEYXrBK.js         # Original CodePen: CMYK Grid
├── icons/                  # PWA icons (8 sizes)
├── generate-icons.js       # Node.js icon generator
├── auto-generate-icons.html # Browser icon generator
├── CHANGES.md
└── README.md
```

## Customization

### Loading Duration
`index.html` line ~304:
```javascript
const LOADING_DURATION = 5000; // milliseconds
```

### Loading Bar Style
CSS в `index.html`:
- `#loading-bar-outer` - размер, border
- `#loading-bar-inner` - gradient, цвет
- `#loading-text` - стиль текста

### Preset Selection
Модифицируй `loadRandomPreset()` в `index.html` для:
- Выбора конкретного пресета
- Weighted random выбора
- Sequential rotation

## Technical Stack

- **PixiJS v8.5.2**: WebGL rendering
- **GSAP 3.12.5**: Animation library (для CMYK Grid preset)
- **PixiPlugin**: GSAP plugin для PixiJS объектов
- **Vanilla JavaScript**: No build tools
- **CSS3**: Responsive design
- **Fetch API**: Dynamic module loading
- **Web App Manifest**: PWA config

## Key Configuration

| Parameter | Location | Default | Purpose |
|-----------|----------|---------|---------|
| `LOADING_DURATION` | index.html:304 | 5000ms | Loading time |
| `LOADING_INTERVAL` | index.html:305 | 100ms | Update frequency |

## Browser Support

- Chrome 90+
- Edge 90+
- Safari 15+
- Firefox 90+

## Important Notes

- **Требуется HTTP сервер** для работы (fetch API + CORS)
- **Online-only**: нет Service Worker, нет offline режима
- **Относительные пути**: работает и на localhost, и на production

## Deployment

**Netlify:**
```bash
netlify deploy --prod --dir=project04
```

**Vercel:**
```bash
cd project04 && vercel --prod
```

**GitHub Pages:**
Push в gh-pages branch

## License

Free to use and modify.
