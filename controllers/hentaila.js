const axios = require('axios');
const cheerio = require('cheerio').default;
const importModules = require('import-modules');

const utils = importModules('../utils');

var srcurl = "https://hentaila.tv";

module.exports.getAnime = async function (inputsearch) {
    utils.scrapAnime(srcurl, inputsearch);
    // var body = await axios.get(srcurl+"/?s="+inputsearch, {
    //     headers: {
    //         'User-Agent': 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/5351 (KHTML, like Gecko) Chrome/40.0.852.0 Mobile Safari/5351',
    //     }
    // })
    // .then (function (response) {
    //     return response.data;
    // }) .catch (function (error) {console.log(error)});

    // if (typeof body === 'string' || body instanceof String) {
    //     var $ = cheerio.load(body);
    //     var animelist = []
    //     $('div.justify-content-md-center a.card__cover').each(function(index) {
    //         if (index == 30) {return false};

    //         title = $(this).children('h3').text();
    //         url = $(this).attr('href');
    //         img = $(this).children('img').attr('src');

    //         var index = {
    //             "title": title,
    //             "url": url,
    //             "img": img
    //         };
    //         animelist.push(index);
    //     });
    //     return animelist;
    // } else {return [];}
}

module.exports.getEpisodes = async function(animeURL) {
    var body = await axios.get(animeURL)
    .then (function (response) {
        return response.data;
    }) .catch (function (error) {console.log(error)});

    var $ = cheerio.load(body);
    
    var episodeList = []
    $('div.hentai__episodes a').each(function (index) {
        url = $(this).attr('href');
        var index = {
            "url": url
        };
        episodeList.push(index);
    });

    return episodeList.reverse();
}

module.exports.getStreaming = async function(episodeURL) {
    var body = await axios.get(episodeURL)
    .then (function (response) {
        return response.data;
    }) .catch (function (error) {console.log(error)});

    $ = cheerio.load(body);

    var streamingList = []
    $('div.jw-wrapper video.jw-video').each(function(index) {
        var data_video = $(this).attr('src');
        var servicename = "Video Blob";
        if (servicename=="Our Server") {} else {
            var index = {
                "servicename": servicename,
                "url": data_video
            };
            streamingList.push(index);
        }
    });
    return streamingList;
}