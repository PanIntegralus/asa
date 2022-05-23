const importModules = require('import-modules');

const utils = importModules('../utils');

var site = "animeflv";
var srcurl = "https://ww3.animeflv.cc";
var filter = "/browse?q=";

var options = {
    site: site,
    srcurl: srcurl,
    filter: filter,
    params: inputSearch,
}


module.exports.getAnime = async function (inputSearch) {
    options.params = inputSearch;
    return await utils["scrap"].scrapAnime(options);
}

module.exports.getEpisodes = async function(animeURL) {
    return await utils["scrap"].scrapEpisodes(srcurl, animeURL);
}

module.exports.getStreaming = async function(episodeURL) {
    return await utils["scrap"].scrapStreaming(srcurl, episodeURL);

    // var body = await axios.get(episodeURL)
    // .then (function (response) {
    //     return response.data;
    // }) .catch (function (error) {console.log(error)});

    // $ = cheerio.load(body);

    // var streamingList = []
    // $('ul.CapiTnv li').each(function(index) {
    //     var data_video = $(this).attr('data-video');
    //     var servicename = $(this).attr('title');
    //     if (servicename=="Our Server") {} else {
    //         var index = {
    //             "servicename": servicename,
    //             "url": data_video
    //         };
    //         streamingList.push(index);
    //     }
    // });
    // return streamingList;
}