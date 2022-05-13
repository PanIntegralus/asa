const axios = require('axios');
const cheerio = require('cheerio').default;

var srcurl = "https://monoschinos2.com";

module.exports.getAnime = async function (inputsearch) {
    var body = await axios.get(srcurl+"/buscar?q="+inputsearch)
    .then (function (response) {
        return response.data;
    }) .catch (function (error) {console.log(error)});
    
    var $ = cheerio.load(body);
    var animelist = []
    $('div.row a[href]').each(function(index) {
        if (index == 30) {return false};
    
        title = $(this).children().children('.seriesdetails').children('.seristitles').text();
        url = $(this).attr('href');
        img = $(this).children().children().children().attr('src');
    
        var index = {
            "title": title,
            "url": url,
            "img": img
        }
        animelist.push(index);
    });
    return animelist;
}

module.exports.getEpisodes = async function (animeURL) {
    var body = await axios.get(animeURL)
    .then (function (response) {
        return response.data;
    }) .catch (function (error) {console.log(error)});

    var $ = cheerio.load(body);
    
    var episodeList = []
    $('div.col-item a').each(function (index) {
        url = $(this).attr('href');
        var index = {
            "url": url
        };
        episodeList.push(index);
    });

    return episodeList;
}