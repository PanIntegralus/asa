const importModules = require('import-modules');

const controllers = importModules('./controllers');

module.exports.getAnime = exports.getAnime = async function(source, inputsearch) {
    try {
        return controllers[source](inputsearch).then(res => {return res});
    } catch (error) {
        console.log(error);
    }
}

module.exports.availableSources = exports.availableSources = function() {
    return controllers;
}