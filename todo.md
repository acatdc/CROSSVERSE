# CROSSVERSE - TODO & Progress Tracker

> **Last updated**: 2026-01-08
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
- [ ] Setup analytics (Google Analytics or Umami)
- [ ] Submit to Google Search Console
- [ ] Submit sitemap to search engines

### Wiki (`wiki.crossverse.tech`)
- [ ] Decide on tech for using to implement onsite wiki.
- [ ] Migrate content from `tmp/wiki/` (Notion export)
- [ ] Configure project structure & navigation
- [ ] Deploy to Vercel (separate project or monorepo)
- [ ] Configure DNS for subdomain `wiki.crossverse.tech`
- [ ] Verify wiki is live
- [ ] Submit wiki to Google Search Console

---

## Phase 2: Enhancement 🚀

**Goal**: Improve content quality and user experience

### Landing Page Improvements
- [ ] Review and optimize content
- [ ] Improve mobile responsiveness (if needed)
- [ ] Add OG image (`og-image.jpg` referenced in meta tags)

### Wiki Improvements
- [ ] Review all migrated content for formatting issues

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
- [x] Create onboarding.md
- [x] Create onboarding_tech_assumptions.md
- [x] Create todo.md (this file)
- [ ] Document deployment process
- [ ] Create snapshot v002 (after wiki deployment)

### Repository Structure
- [ ] Decide: monorepo vs separate repos for wiki
- [ ] Setup proper folder structure if monorepo
- [ ] Configure shared configs (ESLint, Prettier if needed)

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
| 2026-01-07 | Docusaurus for wiki | Best Notion markdown support | 🔄 In progress |
| 2026-01-08 | Created todo.md | Maintain context between sessions | ✅ Done |

---

## 🚨 Blockers & Issues

*None currently*

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
- ✅ GitHub repo connected
- ✅ Auto-deployment configured

**Next Priority**:
- 🎯 Deploy wiki to `wiki.crossverse.tech`

**Estimated Progress**: ~40% of Phase 1 complete

---

## 🔄 Session Notes

### Session 2026-01-08
- Created todo.md for progress tracking
- Confirmed landing page is live
- Ready to start wiki deployment

### Session 2026-01-07 (previous chat)
- Created landing page
- Setup Vercel deployment
- Configured DNS
- Site went live successfully
