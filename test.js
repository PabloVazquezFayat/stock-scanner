const puppeteer = require('puppeteer');

const trial_list = ['C'];

const scan = async ()=> {

    const options = {
        headless: true,
        defaultViewport: null,
        args: ['--window-size=1920,1080']
      }

    try{

        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();
        const URL = `https://finance.yahoo.com/quote/${"DIS"}/key-statistics?p=${"DIS"}`;
        const type = 'pb';
        const filter = 'tr';

        await page.setDefaultNavigationTimeout(0);
        await page.goto(URL, { waitUntil: 'networkidle0' });

        let result = '';

        if(type === 'pe'){
            result = await page.$eval(filter, el => el.textContent);
        }

        if(type === 'pb'){
           const res = await page.$$eval(filter, el => el.map(item => item.textContent));
           const pbText = res.filter( el => el.indexOf('Price/Book (mrq)') !== -1)[0]
           result = pbText.substring("Price/Book (mrq)".length, pbText.indexOf('.')+3);
        }

        console.log(result);

        await browser.close();

    }catch(error){
        console.log(error);
    }

}

scan();