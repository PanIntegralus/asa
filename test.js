const asa = require('./main');

console.log(asa.availableSources());

asa.getAnime("animeflv", "86").then(res => {
    console.log(res);
    asa.getEpisodes("animeflv", res[0].url).then(res => {
        console.log(res);
        asa.getStreaming("animeflv", res[7].url).then(res => {
            console.log(res);
        });
    })
    .catch(error => {
        console.log(error);
    });
});