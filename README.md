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

Relevant parts of the source code for this course are marked with `SEC_PRO` comment prefix.

### General description

This app provides a backend for managing livestream overlays for kyykkä livestreams. It features a Telegram bot interface, which can be used to manipulate the data seen on the actual stream overlay.

This is a big project and my aim was mostly during this course to create some kind of architecture design and a secure database implementation for this app. I have also assessed some possible security issues and come up with a solution to them.

### Structure

There are four key parts to the app. For this course, I have mostly focused on the bot and database implementations as one of my key visions was to implement the SQL queries during this course as securely as possible. The api folder also includes some comments about some general middleware used to provide more secure REST api.

```
Lakka
└───api
│   The HTTP server implementation
│
└───bot
│   The Telegram bot and first user interface implementation
│
└───database
│   The migrations and SQL queries
│
└───lib
    Some helper functions
```

### Identified security issues and some solutions

| Problem                           | Solution                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| User input and SQL injections​    | Queries are built with Knex which should be able to handle injections safely.                                                                                                                                                                                                                                                                                       |
| Session passcode strength is weak | Users can only try inputting the passcode three times. After three failed attempts, 10 minute cooldown is issued to the user, which should limit the possibility to brute force the codes. The passcodes are also only valid for 10 minutes. Part of this structure is already implemented, but for instance checking if the user is banned is not yet implemented. |
| Outdated packages​                | Use GitHub bot which identifies outdated packages and creates merge requests for updating the package. Not yet implemented.                                                                                                                                                                                                                                         |

### Known issues

If a bad actor had multiple accounts available, it is possible to still brute force the joinig passcode. I just don't really see a situtation where somebody would waste their resources to put something funny on a kyykkä livestream that has maybe 10-70 viewers.

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
