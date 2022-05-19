const axios = require('axios');
const cheerio = require('cheerio').default;

module.exports.scrapAnime = async function(options) {

    console.log(options.srcurl);

    var body = await axios.get(options.srcurl+options.filter+options.params, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/5351 (KHTML, like Gecko) Chrome/40.0.852.0 Mobile Safari/5351',
        }
    })
    .then (function (response) {
        return response.data;
    }) .catch (function (error) {console.log(error)});

    if (typeof body === 'string' || body instanceof String) {
        var $ = cheerio.load(body);
        var animelist = [];

        var title;
        var url;
        var img;

        switch (options.site) {
            case "animeflv":
                $('ul.ListAnimes li').each(function(index) { 
                    title = $(this).children().children('a').children('h3.Title').text();
                    url = $(this).children().children('a').attr('href');
                    img = $(this).children().children('a').children('div').children('figure').children('img').attr('src');
                    
                    var index = {
                        "title": title,
                        "url": url,
                        "img": img
                    };

                    animelist.push(index);
                });
            
        }
        return animelist;
    } else {
        return [0];
    }
}

module.exports.scrapEpisodes = async function (srcurl, animeURL) {
    /* Sanear enlace desde donde se van a sacar los datos; algunas páginas
    tienen enlaces relativos y otras enlaces absolutos. */ 
    var animeURLsanitized = srcurl+animeURL.replace(srcurl, "");
    var body = await axios.get(animeURLsanitized)
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

    // Algunas páginas dan los resultados al revés; si alguna página hace eso, agregar aquí.
    if (srcurl == "animeflv")
        return episodeList.reverse();
    else
        return episodeList;
}

module.exports.scrapStreaming = async function(srcurl, episodeURL) {
}