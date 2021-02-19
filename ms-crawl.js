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

const getFromURL_1 = async (page)=> {
    const pricePerShare = await page.$eval('#message-box-price', el => el.textContent);
    const priceBookValue = await page.$$eval('.dp-value', el => el.map(item => item.textContent));

    const data = {
        pricePerShare: parseFloat(pricePerShare.substring(1)),
        priceBookValue: parseFloat(priceBookValue[23]),
    }

    return data;
}

const getFromURL_2 = async (page)=> {

    const result = await page.$$eval('td', el => el.map(item => item.textContent));

    const data = {
        debtToEquity: parseFloat(result[933]),
        netIncome: parseFloat(result[59].split(',').join('')) * 1000000,
        earningsPerShare: parseFloat(result[71]),
        bookValuePerShare: parseFloat(result[119])
    }

    return data;

}

const getFromURL_3 = async (page)=> {

    const result = await page.$$eval('#Y_5', el => el.map(item => item.textContent));

    const data = {
        shortTermDebt: parseFloat(result[29].split(',').join('')) * 1000000,
        longTermDebt: parseFloat(result[39].split(',').join('')) * 1000000,
        totalEquity: parseFloat(result[58].split(',').join('')) * 1000000,
    }

    return data;

}

const scanner = async ()=> {

    const stockDataArr = [];

    for(let i = 0; i < trial_list.length; i++){

        const url_1 = `https://www.morningstar.com/stocks/xnas/${trial_list[i]}/quote`;
        const url_2 = `http://financials.morningstar.com/ratios/r.html?t=${trial_list[i]}&region=usa&culture=en-US`;
        const url_3 = `http://financials.morningstar.com/balance-sheet/bs.html?t=${trial_list[i]}&region=usa&culture=en-US`;

        const { pricePerShare, 
                priceBookValue } = await scan(url_1, getFromURL_1);

        const { debtToEquity, 
                netIncome,
                earningsPerShare, 
                bookValuePerShare } = await scan(url_2,  getFromURL_2);
        
        const { shortTermDebt,
                longTermDebt,
                totalEquity } = await scan(url_3, getFromURL_3);

        const data = {
            symbol: trial_list[i],
            pricePerShare,
            priceBookValue,
            debtToEquity,
            netIncome,
            earningsPerShare,
            bookValuePerShare,
            shortTermDebt,
            longTermDebt,
            totalEquity,
        }

        stockDataArr.push(data);

        console.log(data);

    }

    return stockDataArr;

}

const sortByMetric = async ()=> {

    const results = await scanner();

    const list = results.filter(stock => {

        const { symbol,
                pricePerShare,
                priceBookValue,
                debtToEquity,
                netIncome,
                earningsPerShare,
                bookValuePerShare,
                shortTermDebt,
                longTermDebt,
                totalEquity } = stock;

        const PE = parseFloat((pricePerShare / earningsPerShare).toFixed(2));
        const PB = priceBookValue ? priceBookValue : parseFloat((pricePerShare / bookValuePerShare).toFixed(2));
        const DTE = debtToEquity ? debtToEquity : (shortTermDebt + longTermDebt) / totalEquity;

        console.log("PE:", PE, "PB:", PB, "DTE:", DTE);

        const metric_1 = parseFloat((PE * PB).toFixed(2));
        const metric_2 = DTE;

        stock.pe_pb = metric_1
        stock.dte = metric_2;
        
        if((metric_1 > 0 && metric_1 < 22.5) && (metric_2 > 0 && metric_2 < 0.5)){
            stock.pe_pb = metric_1
            stock.dte = metric_2;
            return stock;
        }

    });

    return list;

}

const generateList = async ()=> {
    const list = await sortByMetric();
    const data = JSON.stringify({list: list});
    fs.writeFileSync('list.json', data);
}

generateList();

// PriceEarnings(P/E)  = pricePerShare/earningsPerShare 
// priceBookValue(P/B) = pricePerShare/bookValuePerShare
// DebToEquityFormula  = (shortTermDebt + longTermDebt) / equity

// metric_1 = P/E * P/B < 22.50
// metric_2 = DebtToEquity < 0.50