# Lakka

## Kyykkä livestream overlay manager

This app provides a backend for managing livestream overlays for kyykkä livestreams. It features a Telegram bot interface, which can be used to manipulate the data seen on the actual stream overlay.

This backend is still heavily WIP.

## Running on local dev environment

```
npm ci
npm run dev
```

## Planned features

- User can begin a livestream session and the backend will provide a link to dynamically changing overlay
- Possibility to manipulate the data seen on screen live
- Add multiple users to same streaming session so that there can be multiple stream "editors"
- Possibility to create a custom overlays instead of fixed ones
