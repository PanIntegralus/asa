const importModules = require('import-modules');

const controllers = importModules('./controllers');

module.exports.availableSources = exports.availableSources = function() {
    return controllers;
}

module.exports.getAnime = exports.getAnime = async function(source, inputsearch) {
    try {
        return controllers[source].getAnime(inputsearch);
    } catch (error) {
        console.log(error);
    }
}

module.exports.getEpisodes = exports.getEpisodes = async function(source, animeURL) {
    try {
        
        return controllers[source].getEpisodes(animeURL).then(res =>{return res});
    } catch (error) {
        console.log(error);
    }
}
