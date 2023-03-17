# MyTab

I wrote this as a Homepage/New Tab extension/addon for Firefox (works for Chrome as well). As such I don't publish the extensions publicly, it's specific to what I wanted. It's also an exercise as I'm trying to learn HTML/CSS/JS/TS/React/insert flavor of the month framework.

https://user-images.githubusercontent.com/51514842/216735597-25ae7644-c16b-4515-8d8d-08aadd55a241.mp4

## Features

All are optional

- Bookmarks with user specified FontAwesome icon
- Github repository information
- Current and forecast weather, through either OpenWeatherMap or WeatherUnderground
- A server/service like [servermon](https://github.com/jnines/servermon) or [node-servermon](https://github.com/jnines/node-servermon)

### How it's run

This can be published as a private extension/addon for either Firefox or Chrome (requiring replacing manifest.json with the one in the chromium folder), or "side-loaded" on Chrome. It can also be ran as a regular web-page. I made this an extension instead of a regular page for the purely convenient bit about my cursor starting in an empty URL bar.

**The only files required are index.html, the resources and app directories, and manifest.json if used as an extension.**

### Storage

If used as an extension/addon it will use Firefox or Chrome sync storage respectively. If you choose not to use sync functionality, it will still use sync storage purely as extension storage. If run as a webpage it will use localstorage.

### Criticisms

I welcome any and all criticisms about my work. Can't get better if you don't know how bad you are.

### Frameworks and libraries

I'm aware there are multiple frameworks/libraries/etc that would have made writing this easier/faster. The point was to do it to learn as I'll hopefully have plenty of chances to use other people's stuff in the future.
