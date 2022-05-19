# asa ![GitHub package.json version](https://img.shields.io/github/package-json/v/panintegralus/asa) ![npm](https://img.shields.io/npm/v/asa-api) ![NPM](https://img.shields.io/npm/l/asa-api) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/PanIntegralus/asa) ![GitHub last commit](https://img.shields.io/github/last-commit/PanIntegralus/asa) ![GitHub issues](https://img.shields.io/github/issues/panintegralus/asa) ![GitHub Hits](https://hits.deltapapa.io/github/panintegralus/asa.svg)

# ⚠ THIS IS THE DEVELOPMENT BRANCH. DON'T USE THIS BRANCH BECAUSE IT'S BROKEN ALL THE TIME ⚠

ASA (Anime Scraper API) is an API to scrap information from anime websites. This was made for another project, but now is entirely separated. However, **is not meant to use in production**. It was made just for fun.

## THE PROJECT IS BEING REWRITTEN FOR BETTER SUPPORT IN THE FUTURE
### This means that **breaking changes will be made**, and you'll probably need to change stuff. **Don't use this module in production**.
---
- [Features](#features)
- [Installation](#installation)
- [Examples](#examples)
- [Sites supported](#sites-supported)

## Features
- [x] Retrieve any relevant information, like anime name, episodes, and streaming services.
- [x] Support for multiple sites.
- [x] Fast responses thanks to [cheerio](https://www.npmjs.com/package/cheerio).

## Installation
```
npm install asa-api --save
```

## Examples

List all available sources and functions
```js
const asa = require('asa-api');
console.log(asa.availableSources());
```

Search for anime and get results
```js
const asa = require('asa-api');
asa.getAnime("animeflv", "86")
    .then(res => console.log(res));

/*
[
  {
    title: '86 - Eighty Six',
    url: 'https://ww3.animeflv.cc/anime/86-eighty-six',
    img: 'https://img.animeflv.cc/cover/86-eighty-six.jpg'
  },
  {
    title: '86 2nd Season',
    url: 'https://ww3.animeflv.cc/anime/86-2nd-season',
    img: 'https://img.animeflv.cc/cover/86-2nd-season.jpg'
  }
]
*/
```

Get anime episodes
```js
const asa = require('asa-api');
asa.getAnime("monoschinos2", "serial experiments").then(res => {
    asa.getEpisodes("monoschinos2", res[0].url).then(res => {
        console.log(res)
    });
});

/*
  {
    url: 'https://monoschinos2.com/ver/serial-experiments-lain-latino-episodio-1'
  },
  {
    url: 'https://monoschinos2.com/ver/serial-experiments-lain-latino-episodio-2'
  }, ...
*/
```

Get streaming services from episode
```js
const asa = require('asa-api');
asa.getAnime("animeflv", "serial experiments").then(res => {
    asa.getEpisodes("animeflv", res[0].url).then(res => {
        asa.getStreaming("animeflv", res[0].url).then(res => {
            console.log(res)
        });
    });
});
/*
  {
    servicename: 'Streamsb',
    url: 'https://sbplay2.xyz/e/yp7u8ih6k9fn'
  },
  {
    servicename: 'Xstreamcdn',
    url: 'https://fembed-hd.com/v/mzvk6w8k1oq'
  }, ...
*/
```





## Sites supported

### Español 🇪🇸
| Name | URL | Status | Notes |
| ------------- | ------------- | ------------- | ------------- |
| MonosChinos | https://monoschinos2.com/ | 🟡 Not fully functional | Limited to 31 results per request. You can't retrieve streaming services _(at least not right now)_. |
| AnimeFLV | https://ww3.animeflv.cc/ | ✔ Fully working | There's another URL for this site: https://www3.animeflv.net/. I'm not sure if the one used right now is official, but it's the only one I got working. |
| JKAnime | https://jkanime.net/ | 🔘 Planned | |
| VerAnime.org | https://www.veranime.org/ | 🔘 Planned | |
| Hentaila.tv | https://hentaila.tv | 🟡 Not fully functional | 🔞 +18 NSFW | 

### English 🇬🇧
| Name | URL | Status | Notes |
| ------------- | ------------- | ------------- | ------------- |
| Animebee.to | https://animebee.to/ | 🔘 Planned | |
| Zoro.to | https://zoro.to/ | 🔘 Planned | |

If you would like to request me to add a new language, feel free to open an issue.
