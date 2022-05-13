const asa = require('./main');

console.log(asa.availableSources());

asa.getAnime("monoschinos2", "86")
    .then(res => console.log(res));

asa.getAnime("monoschinos2", "serial experiments").then(res => {
    asa.getEpisodes("monoschinos2", res[0].url).then(res => {
        console.log(res)
    });
});