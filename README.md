## MyTab

I wrote this as an Homepage/New Tab extension/addon for Firefox (works for Chrome as well). As such I don't publish the extensions publicly, it's specific to what I wanted. It's also an exercise as I'm trying to learn HTML/CSS/JS/TS/React/insert flavor of the month framework.



https://user-images.githubusercontent.com/51514842/202825427-fe32eb94-91a9-4622-bdeb-6d6a1bc36aab.mp4


### Features

All are optional

- Bookmarks with user specified FontAwesome icon
- Github repository information
- Current and forecast weather, through either OpenWeatherMap or WeatherUnderground
- A server/service [monitor](https://github.com/jnines/servermon) (requires separate webserver)

#### How it's run

This can be published as a private extension/addon for either Firefox or Chrome (requiring replacing manifest.json with the one in the chromium folder), or "side-loaded" on Chrome. It can also be ran as a regular web-page. I made this an extension instead of a regular page for the purely convenient bit about my cursor starting in an empty URL bar.

#### Storage

If used as an extension/addon it will use Firefox or Chrome sync storage respectively. If you choose not to use sync functionality, it will still use sync storage purely as extension storage. If run as a webpage it will use localstorage.

#### Criticisms

I welcome any and all criticisms about my work. Can't get better if you don't know how bad you are.

#### Frameworks and libraries

I'm aware there are multiple frameworks/libraries/etc that would have made writing this easier/faster. The point was to do it to learn as I'll hopefully have plenty of chances to use other people's stuff in the future.
