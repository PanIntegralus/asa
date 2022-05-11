const request = require('request')
const axios = require('axios').default
const cheerio = require('cheerio')

const puppeteer = require('puppeteer')

const express = require('express')
const cors = require('cors')
const app = express()
const port = 5555

app.get('/api', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.json({saludo:["negro bailando"]});
});


// sitios que se pueden scrapear
var availableSites = [
    "monoschinos2"
    // "animeflv"
]

app.get('/api/scrap/:site/:input', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    req.params;
    if (availableSites.includes(req.params.site)) {
        var url;
        if (req.params.site == "monoschinos2") url = "https://monoschinos2.com/buscar?q=";
        // if (req.params.site == "animeflv") url = "https://www3.animeflv.net/browse?q=";

        axios.get(url+req.params.input)
        .then (function (response) {
            var body = response.data
            // console.log(body)
            let $ = cheerio.load(body);
            let animelist = []
            $('div.row a[href]').each(function(index) {
                if (index == 30) {return false}
                console.log(index)
                title = $(this).children().children('.seriesdetails').children('.seristitles').text()
                url = $(this).attr('href');
                img = $(this).children().children().children().attr('src');
                var index = {
                    "title": title,
                    "url": url,
                    "img": img
                }
                animelist.push(index)
                // count[url] = $(this).attr('href')
                // data.push(count)
                // count++
            });
            res.json({animelist});
        })
    } else {
        res.json({})
    }
});

app.listen(port, () => {
    console.log(`Running app listening on port ${port}.`)
});