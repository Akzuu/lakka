# Lakka

## Kyykkä livestream overlay manager

This app provides a backend for managing livestream overlays for kyykkä livestreams. It features a Telegram bot interface, which can be used to manipulate the data seen on the actual stream overlay.

This backend is still heavily WIP.

## Running on local dev environment

First setup environmental variables by running `cp .env.example .env` in the root of this project. Fill in the necessary parts. The `TG_TOKEN` can be obtained from [BotFather](https://core.telegram.org/bots#3-how-do-i-create-a-bot).

You'll also need to have MySQL database running. Easiest way to achieve this is to run `docker-compose up` in the project root, which will launch a MySQL instance inside a docker container.

Then to actually run the app, run the following commands.

```
npm ci
npm run dev
```

## Secure Programming

Relevant parts for the course are marked with `SEC_PRO` comment prefix.

## Planned features

- User can begin a livestream session and the backend will provide a link to dynamically changing overlay
- Possibility to manipulate the data seen on screen live
- Add multiple users to same streaming session so that there can be multiple stream "editors"
- Possibility to create a custom overlays instead of fixed ones

## Possible features

- Crawl kyykkaliiga.fi (and other leagues?) to automatically get all the available matches and let streamer pick streamed matches from there
- Stream annoucement channel (Match X vs. Y starting at 18:00! Stream link: ...)

## GDPR

At this moment this bot is not GDPR compliant.
