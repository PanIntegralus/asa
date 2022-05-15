const asa = require('./main');

console.log(asa.availableSources());

asa.getAnime("animeflv", "serial experiments").then(res => {
    asa.getEpisodes("animeflv", res[0].url).then(res => {
        asa.getStreaming("animeflv", res[0].url).then(res => {
            console.log(res)
        });
    });
});