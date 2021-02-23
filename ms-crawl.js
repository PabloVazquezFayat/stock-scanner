const fs = require('fs');
const puppeteer = require('puppeteer');

const trial_list = [
    "AAPL","MSFT","AMZN","FB","TSLA","GOOGL","GOOG","BRK-B","JNJ","JPM","NVDA",
    "V","DIS","PYPL","PG","UNH","HD","MA","BAC","NFLX","INTC","CMCSA","ADBE","VZ","ABT","CRM",
    "XOM","CSCO","T","WMT","PFE","TMO","PEP","KO","AVGO","MRK","ABBV","NKE","CVX","QCOM","NEE",
    "ACN","MCD","LLY","TXN","MDT","COST","DHR","HON","UNP","AMGN","WFC","BMY","LIN","PM","C",
    "LOW","SBUX","ORCL","UPS","BA","NOW","RTX","AMD","IBM","CAT","MS","MMM","GS","BLK","AMT",
    "INTU","GE","DE","TGT","AMAT","CVS","MU","ISRG","CHTR","BKNG","GILD","LMT","SCHW","TJX",
    "AXP","FIS","MO","SPGI","PLD","ATVI","MDLZ","SYK","CI","LRCX","ZTS","ANTM","CB","BDX",
    "TMUS","TFC","ADP","CCI","GM","CME","DUK","CSX","CL","PNC","ADSK","EQIX","ILMN","USB",
    "FISV","SO","ICE","COP","EL","FDX","NSC","GPN","D","ITW","SHW","MMC","ADI","APD","BSX",
    "VRTX","ECL","EW","COF","AON","REGN","EMR","HUM","PGR","DG","NEM","ETN","TWTR","NOC",
    "F","FCX","HCA","KLAC","MCO","KMB","WM","ALGN","CMG","IDXX","ROST","TEL","EXC","SNPS",
    "EA","ROP","DOW","MET","BIIB","DLR","EBAY","CTSH","APTV","AEP","STZ","MCHP","APH","DD",
    "BAX","LHX","CDNS","SYY","DXCM","A","GD","TROW","JCI","TRV","HPQ","AIG","CMI","SLB",
    "SRE","PSA","WBA","PH","GIS","IQV","TT","CNC","MSCI","XLNX","PCAR","BK","INFO","ALXN",
    "EOG","MAR","SPG","MNST","ANSS","ZBH","ORLY","ALL","XEL","PSX","TDG","PPG","CTVA","PRU",
    "IFF","MPC","YUM","VIAC","MSI","VRSK","CTAS","HLT","SWKS","CARR","ADM","AFL","LUV","PEG",
    "MCK","SBAC","AWK","WLTW","ES","PAYX","BLL","RMD","MTD","ROK","ETSY","DFS","AZO","KMI",
    "SWK","AME","GLW","BBY","FAST","KEYS","DHI","DAL","FRC","WMB","WEC","STT","WELL","VLO",
    "OTIS","SIVB","PXD","KR","VFC","DLTR","WY","LEN","AMP","CPRT","ENPH","ED","MXIM","LYB",
    "AVB","CERN","CLX","DTE","FITB","TTWO","FTV","ZBRA","CBRE","MKC","EQR","AJG","EFX",
    "VTRS","HSY","LH","EIX","KHC","O","CDW","FTNT","PPL","FLT","WST","TER","PAYC","MKTX",
    "HOLX","ARE","ODFL","OXY","VMC","CHD","KMX","TSN","NTRS","SYF","VRSN","URI","EXPE",
    "OKE","QRVO","RSG","AKAM","MLM","ETR","KSU","IP","GRMN","CTLT","RF","WDC","TRMB",
    "COO","TFX","AES","KEY","TSCO","MTB","XYL","AEE","VTR","HIG","ULTA","LVS","FE","AMCR",
    "WAT","HPE","HAL","ANET","DOV","CFG","TYL","CAG","ALB","GWW","ESS","DRI","CTXS","INCY",
    "NUE","NDAQ","NVR","EXPD","IT","DGX","IR","BR","PKI","CMS","STX","PEAK","VAR","HES",
    "ABC","CCL","NTAP","STE","CAH","DRE","MAA","EXR","CE","FMC","DPZ","BKR","GPC","IEX",
    "MAS","MGM","LDOS","WAB","ABMD","K","HBAN","J","POOL","AVY","TDY","EMN","OMC","BF-B",
    "PFG","HRL","BIO","BXP","RJF","PHM","SJM","CINF","NLOK","FBHS","RCL","UAL","FFIV",
    "PKG","CHRW","WHR","EVRG","LUMN","JBHT","XRAY","LNT","UDR","CNP","HAS","LW","WRK",
    "LB","JKHY","TXT","L","ATO","DVN","LYV","WYNN","DISCK","AAP","HWM","ALLE","PWR",
    "AAL","TPR","FANG","BWA","LKQ","NRG","FOXA","SNA","IPG","UHS","HSIC","NWL","CBOE",
    "HST","MOS","IRM","WU","CPB","WRB","CF","LNC","MHK","RE","TAP","PNR","GL","CMA",
    "NWSA","IPGP","PNW","NI","IVZ","JNPR","ROL","NLSN","AOS","RHI","DVA","ZION","AIZ",
    "DISH","REG","NCLH","KIM","BEN","FLIR","SEE","MRO","DISCA","COG","HBI","ALK","HII",
    "DXC","PVH","APA","FRT","PBCT","PRGO","VNO","LEG","RL","NOV","FLS","UNM","SLG","HFC",
    "FOX","VNT","GPS","FTI","XRX","UAA","UA","NWS"
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
    const pricePerShare = await page.$eval('#last-price-value', el => el.textContent);

    const data = {
        pricePerShare: parseFloat(pricePerShare),
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
        totalLiability: parseFloat(result[48].split(',').join('')) * 1000000,
        totalStockholderEquity: parseFloat(result[57].split(',').join('')) * 1000000,
        totalEquity: parseFloat(result[58].split(',').join('')) * 1000000,
    }

    return data;

}

const getFromURL_4 = async (page)=> {

    const result = await page.$$eval('td', el => el.map(item => item.textContent));

    const data = {
        priceBookValue : parseFloat(result[15])
    }

    return data;

}

const scanner = async ()=> {

    const stockDataArr = [];

    for(let i = 0; i < trial_list.length; i++){

        const url_1 = `http://performance.morningstar.com/stock/performance-return.action?t=${trial_list[i]}&region=usa&culture=en-US`;
        const url_2 = `http://financials.morningstar.com/ratios/r.html?t=${trial_list[i]}&region=usa&culture=en-US`;
        const url_3 = `http://financials.morningstar.com/balance-sheet/bs.html?t=${trial_list[i]}&region=usa&culture=en-US`;
        const url_4 = `http://financials.morningstar.com/valuation/price-ratio.html?t=${trial_list[i]}&region=usa&culture=en-US`

        const { pricePerShare } = await scan(url_1, getFromURL_1);

        const { debtToEquity, 
                netIncome,
                earningsPerShare, 
                bookValuePerShare } = await scan(url_2,  getFromURL_2);
        
        const { shortTermDebt,
                longTermDebt,
                totalLiability,
                totalStockholderEquity,
                totalEquity } = await scan(url_3, getFromURL_3);

        const { priceBookValue } = await scan(url_4, getFromURL_4);

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
            totalLiability,
            totalStockholderEquity,
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
                totalLiability,
                totalStockholderEquity,
                totalEquity } = stock;

        const PE = parseFloat((pricePerShare / earningsPerShare).toFixed(2));
        const PB = priceBookValue ? priceBookValue : parseFloat((pricePerShare / bookValuePerShare).toFixed(2));
        //const DTE = debtToEquity ? debtToEquity : (shortTermDebt + longTermDebt) / totalEquity;
        const DTE = debtToEquity ? debtToEquity : totalLiability / totalStockholderEquity;

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