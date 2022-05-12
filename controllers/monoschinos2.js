const axios = require('axios');
const cheerio = require('cheerio').default;

module.exports = async function (inputsearch) {
    var srcurl = "https://monoschinos2.com/buscar?q="+inputsearch;

    var body = await axios.get(srcurl)
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