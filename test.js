const asa = require('./main');

console.log(asa.availableSources());

asa.getAnime("animeflv", "86").then(res => {
    asa.getEpisodes("animeflv", res[0].url).then(res => {
        console.log(res);
    })
    .catch(error => {
        console.log(error);
    });
});