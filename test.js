const asa = require('./main');

console.log(asa.availableSources());

asa.getAnime("animeflv", "ñ").then(res => {
    if (res.length > 0) {
        asa.getEpisodes("animeflv", res[0].url).then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        });
    }
});