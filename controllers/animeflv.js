const axios = require('axios');
const cheerio = require('cheerio').default;

module.exports = async function (inputsearch) {
    var srcurl = "https://ww3.animeflv.cc";

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