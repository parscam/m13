# PARS M13 Araç Kamerası — Vercel Safe Package

This package is structured to avoid Vercel's **“No Output Directory named public found after the Build completed”** error.

## Correct Vercel settings

Use the folder that contains these files as the project root:

```text
public/
src/
assets/
index.html
build.cjs
package.json
vercel.json
README.md
```

Recommended Vercel settings:

```text
Framework Preset: Other
Root Directory: leave empty, or choose the folder containing vercel.json
Build Command: npm run build
Output Directory: public
Install Command: default
```

The included `vercel.json` also sets:

```json
{
  "framework": null,
  "buildCommand": "npm run build",
  "outputDirectory": "public"
}
```

## Important

Do **not** set Root Directory to `public`. If Root Directory is set to `public`, Vercel will look for `public/public`, which causes the missing output directory error.

Do **not** upload a ZIP that contains one extra parent folder unless you set Root Directory to that parent folder. For easiest deployment, use the flat ZIP where `public`, `package.json`, and `vercel.json` are at the first level.

## Local test

```bash
npm run build
python3 -m http.server 3000 -d public
```

Then open:

```text
http://localhost:3000
```
