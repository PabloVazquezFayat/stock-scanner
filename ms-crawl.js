const fs = require('fs');
const puppeteer = require('puppeteer');

const trial_list = [
    "AAPL","MSFT"
];

const scan = async (URL, search)=> {

    const options = {
        headless: true,
        defaultViewport: null,
        args: ['--window-size=1920,1080']
    }

    try{

        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();

        await page.setDefaultNavigationTimeout(0);
        await page.goto(URL, { waitUntil: 'networkidle0' });

        const results = await search(page);

        await browser.close();

        return results;

    }catch(error){
        console.log(error);
    }

}

const getPricePerShare = async (page)=> {
    const result = await page.$eval('#message-box-price', el => el.textContent);
    return parseFloat(result.substring(1));
}

const getDebtToEquity = async (page)=> {
    const result = await page.$$eval('td', el => el.map(item => item.textContent));
    return parseFloat(result[933]);
}

const getNetIncome = async (page)=> {
    const result = await page.$$eval('td', el => el.map(item => item.textContent));
    return parseFloat(result[59].split(',').join('')) * 1000000
}

const getEarningsPerShare = async (page)=> {
    const result = await page.$$eval('td', el => el.map(item => item.textContent));
    return parseFloat(result[71]);
}

const getBookValuePerShare = async (page)=> {
    const result = await page.$$eval('td', el => el.map(item => item.textContent));
    return parseFloat(result[119]);
}

const getShortTermDebt = async (page)=> {
    const result = await page.$$eval('td', el => el.map(item => item.textContent));
    return parseFloat(result[776]);
}

const getLongTermDebt = async (page)=> {
    const result = await page.$$eval('td', el => el.map(item => item.textContent));
    return parseFloat(result[836]);
}

const scanner = async ()=> {

    const stockDataArr = [];

    for(let i = 0; i < trial_list.length; i++){

        const url_1 = `https://www.morningstar.com/stocks/xnas/${trial_list[i]}/quote`;
        const url_2 = `http://financials.morningstar.com/ratios/r.html?t=${trial_list[i]}&region=usa&culture=en-US`;
        const url_3 = `http://financials.morningstar.com/balance-sheet/bs.html?t=${trial_list[i]}&region=usa&culture=en-US`;

        const data = {
            symbol: trial_list[i],
            pricePerShare: await scan(url_1, getPricePerShare),
            debtToEquity: await scan(url_2,  getDebtToEquity),
            netIncome: await scan(url_2, getNetIncome),
            earningsPerShare: await scan(url_2, getEarningsPerShare),
            bookValuePerShare: await scan(url_2,  getBookValuePerShare),
            shortTermDebt: await scan(url_2, getShortTermDebt),
            longTermDebt: await scan(url_2, getLongTermDebt),
        }

        stockDataArr.push(data);

        console.log(data);

    }

    return stockDataArr;

}

scanner();