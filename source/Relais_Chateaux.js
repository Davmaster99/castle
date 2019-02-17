const puppeteer = require('puppeteer');
var fs = require('fs');
var JsonFile = [];


(async function main() {
    try {
        
        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage()
        await page.goto('https://www.relaischateaux.com/us/destinations/europe/france')  
        await page.setViewport({ width: 1440, height: 752 })
        await page.waitForSelector('.hotelQuickView');
        const sections = await page.$$('.hotelQuickView');
        console.log(sections.length);

        for (const section of sections) {
            //We put the url's of all the stuffs we need
            const link = await section.$$eval('.mainTitle3 > a ', as => as.map(a => a.href));
            const name = await section.$eval('h3 > a > span', span => span.innerText);
            const restaurant = await section.$eval('span', span => span.innerText);
            var Price = -1;
            if (await section.$('div > div:nth-child(2) > div.priceTag > div > span.price > span.price') !== null) {
                Price = await section.$eval('div > div:nth-child(2) > div.priceTag > div > span.price > span.price', span => span.innerText);
            }
            //We check if the hotels have Restaurants and we print the list in the console and in the JSON file
            if (restaurant === "Hotel + Restaurant") {
                console.log("{\"name\":\"" + name + "\"," + "\"link\":\"" + link + "\"," + "\"genre\":\"" + restaurant + "\"," + "\"prix\":\"" + Price+ "\"}");
                JsonFile.push({ "name": name, "link": link, "restaurant ": restaurant,"price":Price })
            }
        }
        //The URL's of all pages are weird, they are dispatched with the following order
        var url_page_ = [2, 4, 5, 6, 7, 7, 8];
        //We go through all the pages 
        for (var i = 0; i < 7; i++) {
            //For each page, we wait for the results to charge, then we click on each link and get the informations we need
            await page.waitForSelector('#destinationResults > #destPagination > .pagination > li:nth-child(' + url_page_[i] + ') > a')
            await page.click('#destinationResults > #destPagination > .pagination > li:nth-child(' + url_page_[i] + ') > a')
            await page.waitFor(2000);
            await page.waitForSelector('.hotelQuickView');

            const sections = await page.$$('.hotelQuickView');
            console.log(sections.length);

            //We repeat the previous operations
            for (const section of sections) {
                const link = await section.$$eval('.mainTitle3 > a ', as => as.map(a => a.href));
                const name = await section.$eval('h3 > a > span', span => span.innerText);
                const restaurant = await section.$eval('span', span => span.innerText);
                var Price = -1;
                if (await section.$('div > div:nth-child(2) > div.priceTag > div > span.price > span.price') !== null) {
                    Price = await section.$eval('div > div:nth-child(2) > div.priceTag > div > span.price > span.price', span => span.innerText);
                }
                if (restaurant === "Hotel + Restaurant") {
                    console.log("{\"name\":\"" + name + "\"," + "\"link\":\"" + link + "\"," + "\"genre\":\"" + restaurant + "\"," + "\"prix\":\"" + Price+ "\"}");
                    JsonFile.push({ "name": name, "link": link, "restaurant ": restaurant,"price":Price })

                }
            }
        }
        
        fs.writeFileSync("output/Hotel_Restaurant.json", JSON.stringify(JsonFile));




    }
    catch (e) { console.log("fail !! "); }
})();
