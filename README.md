# Ivy Rose & Cris Jan — Wedding Invitation

A responsive, animated wedding invitation built with React, Vite, Framer Motion, and CSS. It includes an envelope-opening intro, countdown, wedding details, Google Calendar link, venue directions, story section, and photo gallery placeholders.

## 1. Edit your wedding details

Open:

`src/config/weddingConfig.js`

Edit the names, date, venue, address, ceremony time, map link, invitation message, hashtag, and optional sections. This is the main file you will customize.

Current details:
- Bride: Ivy Rose Sicar
- Groom: Cris Jan Angcaco
- Date: December 30, 2026
- Venue: Emilyo's Restaurant (update spelling/address if needed)

The current venue map link searches Google Maps for "EMILYO'S RESTAURANT". Replace `mapsUrl` with the exact Google Maps share link when you have it.

## 2. Add your own photos

Put image files inside `public/images/`. Then edit `gallery` in `weddingConfig.js`, for example:

```js
gallery: [
  { src: "/images/prewedding-1.jpg", alt: "Our engagement photo" },
  { src: "/images/prewedding-2.jpg", alt: "A favorite memory" },
  { src: "/images/prewedding-3.jpg", alt: "A moment together" }
]
```

You can also set `heroImage` for future customization. The current hero uses the violet luxury design background.

## 3. Optional background music

Only use music you have permission to share. Put the audio file in `public/music/`, then set:

```js
musicFile: "/music/our-song.mp3"
```

Guests must tap the music control to start playback.

## 4. Run it on your computer

Install Node.js 20 or later, then open a terminal in this project folder:

```bash
npm install
npm run dev
```

Open the local address Vite prints (usually `http://localhost:5173`).

To test a production build:

```bash
npm run build
npm run preview
```

## 5. Publish with GitHub Pages

1. Create a GitHub repository named exactly `ivy-rose-cris-jan-wedding` (or change the `base` path in `vite.config.js` to match your repository name).
2. Upload all project files and folders to the repository. Make sure `.github/workflows/deploy.yml` is included.
3. Commit the files to the `main` branch.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment → Source**, select **GitHub Actions**.
6. Open the **Actions** tab and wait for the “Deploy wedding invitation to GitHub Pages” workflow to finish.
7. Your public URL will be:

   `https://YOUR-GITHUB-USERNAME.github.io/ivy-rose-cris-jan-wedding/`

Share that link with your guests. The site is public; do not put private information in the configuration.

### If you use a different repository name

Edit `vite.config.js` and replace:

```js
base: process.env.GITHUB_PAGES === "true" ? "/ivy-rose-cris-jan-wedding/" : "/",
```

with your repository path, including the leading and trailing slash.

## RSVP

RSVP is intentionally disabled because you selected “No RSVP for now.” No guest data is collected or stored.

## Notes

- The countdown uses the configured date/time. The default time is 4:00 PM in the browser's local timezone.
- Replace the venue address and Google Maps URL with the exact location before sharing.
- The invitation uses Google Fonts, so typography may fall back to system fonts if guests are offline.
- This is a static website and does not require a server or database.
