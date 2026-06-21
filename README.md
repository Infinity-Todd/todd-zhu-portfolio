# Todd Zhu Academic Portfolio

Academic website for Todd Zhu, an undergraduate studying Data Science and
Applied Mathematics at UC San Diego.

Live site: https://infinity-todd.github.io/todd-zhu-portfolio/

## Content maintenance

The site is configuration-driven:

- `content/config.toml` — identity, contact details, navigation, and features
- `content/bio.md` — homepage biography
- `content/research.toml` — research cards
- `content/projects.toml` — project cards
- `content/experience.toml` — research, teaching, and education
- `content/cv.md` — web CV
- `content/publications.bib` — future BibTeX publication records
- `public/bio.jpg` — profile image
- `public/resume.pdf` — downloadable résumé

## Local development

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

Because this repository deploys as a GitHub project page, the local route is:

`http://localhost:3000/todd-zhu-portfolio/`

Production validation:

```bash
npm run build
```

## Deployment

Pushing `main` triggers `.github/workflows/deploy.yml`, which builds the
static Next.js export and deploys it to GitHub Pages.

## Credits and license

Built from [PRISM](https://github.com/xyjoey/PRISM), an academic homepage
template by xyjoey. The upstream MIT license is preserved in `LICENSE`.
