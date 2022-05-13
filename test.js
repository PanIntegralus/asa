const asa = require('./main');

console.log(asa.availableSources());

asa.getAnime("animeflv", "86")
    .then(res => console.log(res));

asa.getAnime("animeflv", "serial experiments").then(res => {
    asa.getEpisodes("animeflv", res[0].url).then(res => {
        console.log(res)
    });
});