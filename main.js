var config = require('./config.json');

const axios = require('axios').default;
const cheerio = require('cheerio');

const express = require('express');
const app = express();
const port = config.server.port;

const cloudscraper = require('cloudscraper-version.two');

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
                    console.log(url);
    
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
                    siteurl = "https://ww3.animeflv.cc";
                    console.log(siteurl);
                    
                    axios.get(siteurl+"/browse?q="+req.params.input, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/5351 (KHTML, like Gecko) Chrome/40.0.852.0 Mobile Safari/5351',
                        }
                    })
                    .then (function (response) {
                        var body = response.data;
                        //console.log(body);

                        let $ = cheerio.load(body);
                        let animelist = []
                        $('ul.ListAnimes li').each(function(index) {
                            if (index == 30) {return false}
                            console.log(index);
                            title = $(this).children().children('a').children('h3.Title').text();
                            url = siteurl+$(this).children().children('a').attr('href');
                            img = $(this).children().children('a').children('div').children('figure').children('img').attr('src');
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
                        res.send(body);
                    })
                    .catch(function (error) {console.log(error)});
                
                default:
                    break;
            }
        } else { res.json({}) };
    };
});

app.listen(port, () => {
    console.log(`Running app listening on port ${port}.`);
});