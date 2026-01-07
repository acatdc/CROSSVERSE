# CROSSVERSE - Technical Assumptions & Implementation Plan

> **Примечание**: это техническая спецификация, основанная на текущих предположениях.
> Все решения могут меняться в процессе работы.

---

## Tech Stack

### Основной сайт: `crossverse.tech`

**Framework**: Next.js (static export) или Astro
- **Причины**: бесплатный hosting, отличный SEO, простой deploy
- **Альтернативы**: Hugo, Gatsby

**Hosting**: Vercel или Netlify (free tier)
- **Преимущества**: zero-config CDN, автоматический HTTPS, CI/CD из коробки
- **Стоимость**: $0/месяц

**Styling**: Tailwind CSS
- **Причины**: быстрая разработка, минимальный bundle size
- **Альтернативы**: vanilla CSS, CSS modules

**SEO/Analytics**:
- Google Analytics (бесплатный) или Umami (self-hosted)
- Sitemap generation (встроено в Next.js/Astro)
- robots.txt, meta tags, Open Graph

---

### Wiki: `wiki.crossverse.tech`

**Engine**: Docusaurus (рекомендация)
- **Причины**:
  - Отличная поддержка markdown из Notion
  - React-based, знакомый ecosystem
  - Бесплатный hosting (Vercel/GitHub Pages)
  - Встроенный search, versioning, i18n
- **Альтернативы**:
  - VitePress (легче, но меньше features)
  - MkDocs (Python-based, если удобнее)

**Контент**: markdown экспорт из Notion
- **Статус**: готов к deployment
- **Миграция**: минимальная обработка (Docusaurus хорошо парсит Notion markdown)

**Hosting**: Vercel или GitHub Pages
- **Стоимость**: $0

---

## Infrastructure

### DNS & Domains

**Провайдер**: Namecheap (уже куплен `crossverse.tech`)

**DNS записи** (настроить):
```
crossverse.tech        A/CNAME  → Vercel/Netlify
wiki.crossverse.tech   CNAME    → Vercel/Netlify
```

**SSL**: автоматически через hosting provider (Let's Encrypt)

---

### Deployment Strategy

**Основной сайт**:
1. Git repository (GitHub)
2. Auto-deploy на Vercel/Netlify при push в `main`
3. Preview deployments для PR

**Wiki**:
1. Отдельный repo или monorepo (решим позже)
2. Auto-deploy на поддомен
3. Возможность обновлять контент независимо от основного сайта

**CI/CD**: встроенный в Vercel/Netlify (не нужен отдельный setup)

---

## Features Roadmap

### Phase 1: MVP (срочно для индексации)
- [ ] Простейший placeholder на `crossverse.tech`
- [ ] Базовый лендинг с основной информацией
- [ ] Wiki deployment на `wiki.crossverse.tech`
- [ ] Google Search Console setup
- [ ] Базовый analytics

### Phase 2: Полноценный лендинг
- [ ] Дизайн и контент
- [ ] Адаптивная верстка
- [ ] Contact form (если нужен)
- [ ] SEO оптимизация

### Phase 3: Расширение (по мере необходимости)
- [ ] Дополнительные поддомены
- [ ] Blog (если понадобится)
- [ ] Интеграции с другими сервисами

---

## Технические ограничения владельца

**Не использовалось ранее** (но готовность изучить):
- Docker/контейнеризация
- CI/CD pipelines (ручная настройка)
- Cloud серверы (AWS/GCP/Azure прямое управление)
- Kubernetes, сложный DevOps

**Предпочтительный подход**:
- Managed solutions (Vercel, Netlify)
- Минимальная конфигурация
- "Deploy and forget"
- GUI over CLI где возможно

---

## Cost Breakdown (прогноз)

| Сервис | Стоимость | Примечание |
|--------|-----------|------------|
| Домен | ~$10-15/год | Уже оплачен |
| Hosting (Vercel/Netlify) | $0 | Free tier достаточен |
| Analytics | $0 | Google Analytics / Umami |
| SSL сертификаты | $0 | Автоматически от хостинга |
| CDN | $0 | Включен в hosting |
| **ИТОГО** | ~$15/год | Только домен |

**Риски превышения бюджета**:
- Трафик > free tier limits (маловероятно на старте)
- Необходимость дополнительных paid services

**Митигация**: мониторинг использования, переход на альтернативы при необходимости.

---

## Альтернативные сценарии

### Если Vercel/Netlify не подойдут:

**Вариант A**: GitHub Pages + Cloudflare
- Стоимость: $0
- Сложность: средняя (ручная настройка DNS)

**Вариант B**: Self-hosting на VPS
- Стоимость: ~$5/месяц (DigitalOcean, Hetzner)
- Требует: Docker, Nginx, базовый DevOps
- Риск: дороже и сложнее

**Вариант C**: Cloudflare Pages
- Стоимость: $0
- Аналог Vercel/Netlify

---

## Decision Log

Документ для отслеживания важных технических решений:

| Дата | Решение | Причина | Альтернативы |
|------|---------|---------|--------------|
| 2026-01-07 | Next.js/Astro для лендинга | Бесплатный hosting, хороший SEO | Hugo, Gatsby |
| 2026-01-07 | Docusaurus для wiki | Отличная поддержка markdown | VitePress, MkDocs |
| 2026-01-07 | Vercel/Netlify hosting | $0, простой deploy | GitHub Pages, VPS |

*(Обновлять при принятии новых решений)*

---

## Versioning Strategy

**Main branch** - всегда production-ready, auto-deploy на хостинг

**Snapshots** - архивные версии для полного rollback:
```
crossverse-site/
├── snapshots/
│   ├── v001/    # Полная копия проекта
│   ├── v002/
│   └── v003/
├── [основные файлы проекта]
└── .git/
```

**Создание snapshot**:
```bash
# Создать папку и скопировать всё
mkdir -p snapshots/v001
cp -r . snapshots/v001/ --exclude=snapshots --exclude=.git

# Закоммитить
git add snapshots/v001
git commit -m "snapshot: v001 - описание версии"
git push
```

**Полный rollback**:
```bash
# Удалить всё кроме служебных папок
# (команду дам когда понадобится, т.к. опасная)

# Восстановить из snapshot
cp -r snapshots/v001/* .

# Задеплоить
git add .
git commit -m "rollback to v001"
git push
```

---

## Git Cheatsheet (базовые команды)

> **Примечание**: владелец не работал с Git давно, всегда давать точные команды.

### Ежедневная работа

```bash
# 1. Проверить что изменилось
git status

# 2. Посмотреть изменения в файлах
git diff

# 3. Добавить все изменения
git add .

# 4. Сохранить изменения с описанием
git commit -m "описание что сделал"

# 5. Отправить на GitHub/хостинг
git push
```

### Первоначальная настройка

```bash
# Инициализировать Git в проекте (один раз)
git init

# Подключить к GitHub репозиторию
git remote add origin https://github.com/username/repo.git

# Первый push
git push -u origin main
```

### Snapshot версии

```bash
# Создать snapshot (скопировать команды выше из секции Versioning)

# Или простой git tag (без копирования файлов)
git tag v001
git push --tags
```

### Откат изменений

```bash
# Отменить изменения в конкретном файле (до commit)
git checkout -- filename.txt

# Посмотреть историю коммитов
git log --oneline

# Вернуться к конкретному коммиту (ОСТОРОЖНО!)
git reset --hard COMMIT_HASH
```

### Полезные команды

```bash
# Посмотреть список веток
git branch

# Посмотреть удаленные репозитории
git remote -v

# Скачать изменения с сервера (не применяя)
git fetch

# Скачать и применить изменения
git pull
```

### На случай проблем

```bash
# Если что-то пошло не так - сохранить текущее состояние
git stash

# Вернуть сохраненное
git stash pop

# Если push не работает (конфликт)
git pull --rebase
git push
```

---

## Quick Start Commands

```bash
# Создание Next.js проекта
npx create-next-app@latest crossverse-landing

# Создание Docusaurus wiki
npx create-docusaurus@latest wiki classic

# Создание Astro проекта (альтернатива)
npm create astro@latest crossverse-landing
```

---

## References

**Git**:
- [Git Basics - Простой гайд](https://rogerdudler.github.io/git-guide/index.ru.html)
- [GitHub Desktop](https://desktop.github.com/) - GUI альтернатива командам (если нужно)

**Frameworks**:
- [Next.js Documentation](https://nextjs.org/docs)
- [Astro Documentation](https://docs.astro.build)
- [Docusaurus Documentation](https://docusaurus.io)

**Hosting**:
- [Vercel Deployment](https://vercel.com/docs)
- [Netlify Deployment](https://docs.netlify.com)
