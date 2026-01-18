# CROSSVERSE - TODO & Progress Tracker

> **Last updated**: 2026-01-18
> **Purpose**: Track progress and maintain context between sessions

---

## 🎯 Main Goal

Launch full web presence for CROSSVERSE with focus on SEO indexing and minimal cost.

---

## Phase 1: MVP Launch ⚡

**Goal**: Get content online ASAP for search engine indexing

### Landing Page (`crossverse.tech`)
- [x] Create landing page with SEO meta tags
- [x] Setup GitHub repository
- [x] Deploy to Vercel
- [x] Configure DNS (Namecheap → Vercel)
- [x] Verify site is live at https://crossverse.tech
- [x] Setup analytics (Umami Cloud)
- [x] Submit to Google Search Console
- [x] Submit sitemap to search engines

### Wiki (`wiki.crossverse.tech`)
- [x] Decide on tech: **Docusaurus** selected
- [x] Setup Docusaurus project structure
- [x] Migrate all Notion content to Docusaurus
- [x] Verify wiki looks good locally
- [x] Add wiki to GitHub repository (monorepo)
- [x] Deploy to Vercel
- [x] Configure custom domain `wiki.crossverse.tech`
- [x] Verify wiki is live at https://wiki.crossverse.tech
- [ ] Submit wiki to Google Search Console

### PWA App (`app.crossverse.tech`)
- [x] Add PWA files to monorepo (PWA/ directory)
- [x] Create separate Vercel project with Root Directory = PWA
- [x] Configure manifest.json and meta tags
- [x] Fix asset paths for deployment
- [x] Deploy to Vercel
- [x] Configure custom domain `app.crossverse.tech`
- [x] Verify PWA is live at https://app.crossverse.tech
- [x] Test PWA features (splash screen, loading, presets)

---

## Phase 2: Enhancement 🚀

**Goal**: Improve content quality and user experience

### Landing Page Improvements
- [ ] Review and optimize content
- [ ] Improve mobile responsiveness (if needed)
- [ ] Add OG image (`og-image.jpg` referenced in meta tags)


### SEO & Analytics
- [ ] Setup proper analytics tracking
- [ ] Monitor indexing status
- [ ] Optimize meta descriptions based on data
- [ ] Generate structured data (schema.org)

---

## Phase 3: Expansion 🌐

**Goal**: Add additional functionality as needed


---

## 🔧 Technical Debt & Maintenance

### Documentation
- [x] Create onboarding documentation
- [x] Create todo.md for progress tracking
- [ ] Create deployment snapshot v002

### Repository Structure
- [x] Setup monorepo structure (landing/ and wiki/)
- [ ] Configure shared configs if needed

### Cost Monitoring
- [ ] Monitor Vercel usage (should be $0)
- [ ] Check domain renewal date
- [ ] Review analytics costs (should be $0)

---

## 📝 Decision Log

Key decisions made during development:

| Date | Decision | Rationale | Status |
|------|----------|-----------|--------|
| 2026-01-07 | Plain HTML for landing | Fastest deployment, no build step | ✅ Done |
| 2026-01-07 | Vercel for hosting | Free tier, auto-deploy, easy DNS | ✅ Done |
| 2026-01-07 | Docusaurus for wiki | Best Notion markdown support | ✅ Done |
| 2026-01-08 | Created todo.md | Maintain context between sessions | ✅ Done |
| 2026-01-08 | Umami for analytics | Free, privacy-focused | ✅ Done |
| 2026-01-09 | Wiki MVP approach | Notion export has HTML issues, start with clean intro page | ✅ Done |
| 2026-01-09 | Manual wiki content | Owner will manually create all wiki pages (no automated conversion) | ✅ Changed |
| 2026-01-10 | Automated Notion migration | Python script successfully converted all Notion content to Docusaurus | ✅ Done |
| 2026-01-10 | Monorepo structure | Keep landing and wiki in same repo, deploy as separate Vercel projects | ✅ Done |
| 2026-01-18 | PWA deployment strategy | Deploy PWA as separate Vercel project with Root Directory = PWA | ✅ Done |

---

## 🚨 Blockers & Issues

**No active blockers** 🎉

**Resolved Issues**:
- ✅ **404 DEPLOYMENT_NOT_FOUND on wiki.crossverse.tech** - fixed by adding custom domain in Vercel Dashboard

**Resolved Notion Export Issues**:
- ✅ HTML tags in markdown (`<?>`, `<O>`) - fixed with Python script escaping
- ✅ Image paths - handled in migration script
- ✅ Internal links - converted to relative paths
- ✅ File naming - converted to kebab-case
- ✅ Frontmatter - added slug and title to all pages

---

## 💡 Ideas & Future Considerations

- Consider migrating landing to Next.js/Astro if need dynamic features
- Evaluate self-hosted analytics (Umami) vs Google Analytics
- Consider adding blog for content marketing
- Evaluate adding waitlist/early access signup

---

## 📊 Current Status Summary

**What's Live**:
- ✅ Landing page at https://crossverse.tech
- ✅ Wiki at https://wiki.crossverse.tech
- ✅ PWA App at https://app.crossverse.tech
- ✅ GitHub repo connected
- ✅ Auto-deployment configured (all 3 projects)
- ✅ All Notion content migrated to Docusaurus

**Next Priority**:
- 🎯 Submit wiki to Google Search Console
- 🎯 Monitor indexing for all sites
- 🎯 Consider adding Service Worker to PWA (offline mode)

**Estimated Progress**: 🎉 **Phase 1 MVP - 100% COMPLETE + PWA BONUS**

---

## 🔄 Session Notes

### Session 2026-01-18 (PWA Integration)
- **COMPLETED**: Integrated PWA application at https://app.crossverse.tech
- Created separate Vercel project for PWA with Root Directory = PWA
- Fixed all asset paths from /app/ to / (root paths)
- Removed incorrect vercel.json from main repo
- Configured manifest.json with proper PWA settings
- Fixed background color issue (removed red debug background)
- **SUCCESS**: PWA fully deployed with PixiJS splash screen and presets
- **MILESTONE**: All 3 subdomains now live (landing, wiki, app)

### Session 2026-01-10 (Part 2 - Deployment Fix)
- **RESOLVED**: Fixed wiki.crossverse.tech 404 error by adding custom domain in Vercel
- Committed platform-entities.md to repository (commit 15f80b2)
- Updated onboarding.md with documentation requirements (high-level tasks only)
- **SUCCESS**: Wiki fully deployed and working at https://wiki.crossverse.tech
- **MILESTONE**: Phase 1 MVP complete - both landing and wiki are live

### Session 2026-01-10 (Part 1)
- Migrated all Notion content to Docusaurus using Python script
- Verified wiki builds successfully locally
- Added wiki to GitHub (monorepo structure)
- Created second Vercel project for wiki

### Session 2026-01-09
- Researched and selected **Docusaurus** for wiki
- Setup Docusaurus project structure
- Fixed initial MDX compilation issues
- **Decision**: Initially planned manual wiki migration, later automated with Python

### Session 2026-01-08
- Added Umami analytics to landing
- Configured Google Search Console
- Created todo.md for progress tracking

### Session 2026-01-07 (previous chat)
- Created landing page
- Setup Vercel deployment and DNS
- Site went live at crossverse.tech
