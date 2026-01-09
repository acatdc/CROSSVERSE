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
- [x] Setup analytics (Umami Cloud)
- [x] Submit to Google Search Console
- [x] Submit sitemap to search engines

### Wiki (`wiki.crossverse.tech`)
- [x] Decide on tech: **Docusaurus** selected
- [x] Setup Docusaurus project structure
- [x] Create MVP intro page
- [x] Build successful (npm run build)
- [x] Local dev server working (localhost:3000)
- [ ] **Migrate all Notion content to Docusaurus** (fix formatting issues)
- [ ] Verify wiki looks good locally (match Notion structure)
- [ ] Git initialized & commit content
- [ ] Create GitHub repository for wiki
- [ ] Push code to GitHub
- [ ] Deploy to Vercel (separate project)
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
- [ ] Gradually migrate Notion content (fix HTML issues in markdown)
- [ ] Add more documentation pages manually
- [ ] Add images/screenshots

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
| 2026-01-07 | Docusaurus for wiki | Best Notion markdown support | ✅ Done |
| 2026-01-08 | Created todo.md | Maintain context between sessions | ✅ Done |
| 2026-01-08 | Umami for analytics | Free, privacy-focused | ✅ Done |
| 2026-01-09 | Wiki MVP approach | Notion export has HTML issues, start with clean intro page | ✅ Done |
| 2026-01-09 | HTML export + turndown | HTML export cleaner than markdown, use turndown converter | ✅ Done |
| 2026-01-09 | Manual wiki content | Owner will manually create wiki pages tomorrow | 🔄 Pending |

---

## 🚨 Blockers & Issues

**Notion Export Issues** (non-critical):
- HTML tags in markdown (`<?>`, `<O>`) break MDX parser
- Image paths reference non-existent Notion hashes
- Internal links use Notion URL encoding
- **Solution**: Start with clean MVP, migrate content manually over time

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
- 🎯 Migrate Notion content to Docusaurus (fix HTML/formatting issues)
- 🎯 Verify wiki locally before deploying

**Estimated Progress**: ~50% of Phase 1 complete (wiki content migration needed)

---

## 🔄 Session Notes

### Session 2026-01-09
- Researched wiki engines (Docusaurus vs VitePress vs Nextra vs MkDocs)
- Selected **Docusaurus** (best Notion support, large community)
- Setup Docusaurus wiki project
- Tested HTML export from Notion (better than markdown export)
- Created HTML→markdown converter using `turndown`
- Successfully converted General overview page
- Fixed MDX compilation issues (style attributes, HTML tags)
- Wiki working locally at localhost:3000
- **Next session**: Manually create all wiki pages in markdown format

### Session 2026-01-08
- Added Umami analytics to landing
- Configured Google Search Console (DNS verification)
- Submitted sitemap
- Created todo.md for progress tracking

### Session 2026-01-07 (previous chat)
- Created landing page
- Setup Vercel deployment
- Configured DNS
- Site went live successfully
