const asa = require('./main');
asa.getAnime("animeflv", "86")
    .then(res => console.log(res))