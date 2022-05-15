const axios = require('axios');
const res = require('express/lib/response');
const cheerio = require('cheerio').default;

var srcurl = "https://ww3.animeflv.cc";

module.exports.getAnime = async function (inputsearch) {
    var body = await axios.get(srcurl+"/browse?q="+inputsearch, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/5351 (KHTML, like Gecko) Chrome/40.0.852.0 Mobile Safari/5351',
        }
    })
    .then (function (response) {
        return response.data;
    }) .catch (function (error) {console.log(error)});

    var $ = cheerio.load(body);
    var animelist = []
    $('ul.ListAnimes li').each(function(index) {
        if (index == 30) {return false};

        title = $(this).children().children('a').children('h3.Title').text();
        url = srcurl+$(this).children().children('a').attr('href');
        img = $(this).children().children('a').children('div').children('figure').children('img').attr('src');

        var index = {
            "title": title,
            "url": url,
            "img": img
        };
        animelist.push(index);
    });
    return animelist;
}

module.exports.getEpisodes = async function(animeURL) {
    var body = await axios.get(animeURL)
    .then (function (response) {
        return response.data;
    }) .catch (function (error) {console.log(error)});

    var $ = cheerio.load(body);
    
    var episodeList = []
    $('ul#episodeList li').each(function (index) {
        url = srcurl+$(this).children('a').attr('href');
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
    $('ul.CapiTnv li').each(function(index) {
        var data_video = $(this).attr('data-video');
        var servicename = $(this).attr('title');
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