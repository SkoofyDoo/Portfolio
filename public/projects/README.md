# Project previews

Prefer **MP4** over GIF (smaller, sharper, better perf).

Per project in `src/data/projects.js`:

```js
media: {
  type: 'video',           // or 'gif' | 'image'
  src: '/projects/{id}/preview.mp4',
  poster: '/projects/{id}/poster.jpg', // optional
}
```

- `autoplay` + `muted` + `loop` + `playsInline` on desktop cards
- Keep files lean when possible (aim &lt; 2–4 MB for loops)

