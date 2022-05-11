var config = require('./config.json');

const axios = require('axios').default
const cheerio = require('cheerio')

const express = require('express')
const app = express()
const port = config.server.port

// sitios que se pueden scrapear
var availableSites = config.available_services;

app.get('/api/scrap/:site?/:input?', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    req.params;
    if (!req.params.site) {
        res.json({});
    } else {
        if (availableSites.includes(req.params.site)) {
            var url;
            switch (req.params.site) {
                case "monoschinos2":
                    url = "https://monoschinos2.com/buscar?q="+req.params.input;
    
                    axios.get(url)
                    .then (function (response) {
                        var body = response.data
                        // console.log(body)
                        let $ = cheerio.load(body);
                        let animelist = []
                        $('div.row a[href]').each(function(index) {
                            if (index == 30) {return false}
                            console.log(index);
                            title = $(this).children().children('.seriesdetails').children('.seristitles').text()
                            url = $(this).attr('href');
                            img = $(this).children().children().children().attr('src');
                            var index = {
                                "title": title,
                                "url": url,
                                "img": img
                            }
                            animelist.push(index);
                            // count[url] = $(this).attr('href')
                            // data.push(count)
                            // count++
                        });
                            res.json({animelist});
                    })
                    .catch (function (error) {console.log(error)});
                    break;
    
                case "animeflv":
                    url = "https://www3.animeflv.net/browse?q="+req.params.input;

                    axios.get(url, {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "User-Agent": "Mozilla/5.0",
                    })
                    .then (function (response) {
                        var body = response.data
                        console.log(body);
                    })
                    .catch (function (error) {console.log(error)});
                
                default:
                    break;
            }
        } else { res.json({}) };
    };
});

app.listen(port, () => {
    console.log(`Running app listening on port ${port}.`);
});