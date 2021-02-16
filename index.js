const fs = require('fs');
const puppeteer = require('puppeteer');

// const trial_list = [
//     "AAPL","MSFT","AMZN","FB","TSLA","GOOGL","GOOG","BRK-B","JNJ","JPM","NVDA",
//     "V","DIS","PYPL","PG","UNH","HD","MA","BAC","NFLX","INTC","CMCSA","ADBE","VZ","ABT","CRM",
//     "XOM","CSCO","T","WMT","PFE","TMO","PEP","KO","AVGO","MRK","ABBV","NKE","CVX","QCOM","NEE",
//     "ACN","MCD","LLY","TXN","MDT","COST","DHR","HON","UNP","AMGN","WFC","BMY","LIN","PM","C",
//     "LOW","SBUX","ORCL","UPS","BA","NOW","RTX","AMD","IBM","CAT","MS","MMM","GS","BLK","AMT",
//     "INTU","GE","DE","TGT","AMAT","CVS","MU","ISRG","CHTR","BKNG","GILD","LMT","SCHW","TJX",
//     "AXP","FIS","MO","SPGI","PLD","ATVI","MDLZ","SYK","CI","LRCX","ZTS","ANTM","CB","BDX",
//     "TMUS","TFC","ADP","CCI","GM","CME","DUK","CSX","CL","PNC","ADSK","EQIX","ILMN","USB",
//     "FISV","SO","ICE","COP","EL","FDX","NSC","GPN","D","ITW","SHW","MMC","ADI","APD","BSX",
//     "VRTX","ECL","EW","COF","AON","REGN","EMR","HUM","PGR","DG","NEM","ETN","TWTR","NOC",
//     "F","FCX","HCA","KLAC","MCO","KMB","WM","ALGN","CMG","IDXX","ROST","TEL","EXC","SNPS",
//     "EA","ROP","DOW","MET","BIIB","DLR","EBAY","CTSH","APTV","AEP","STZ","MCHP","APH","DD",
//     "BAX","LHX","CDNS","SYY","DXCM","A","GD","TROW","JCI","TRV","HPQ","AIG","CMI","SLB",
//     "SRE","PSA","WBA","PH","GIS","IQV","TT","CNC","MSCI","XLNX","PCAR","BK","INFO","ALXN",
//     "EOG","MAR","SPG","MNST","ANSS","ZBH","ORLY","ALL","XEL","PSX","TDG","PPG","CTVA","PRU",
//     "IFF","MPC","YUM","VIAC","MSI","VRSK","CTAS","HLT","SWKS","CARR","ADM","AFL","LUV","PEG",
//     "MCK","SBAC","AWK","WLTW","ES","PAYX","BLL","RMD","MTD","ROK","ETSY","DFS","AZO","KMI",
//     "SWK","AME","GLW","BBY","FAST","KEYS","DHI","DAL","FRC","WMB","WEC","STT","WELL","VLO",
//     "OTIS","SIVB","PXD","KR","VFC","DLTR","WY","LEN","AMP","CPRT","ENPH","ED","MXIM","LYB",
//     "AVB","CERN","CLX","DTE","FITB","TTWO","FTV","ZBRA","CBRE","MKC","EQR","AJG","EFX",
//     "VTRS","HSY","LH","EIX","KHC","O","CDW","FTNT","PPL","FLT","WST","TER","PAYC","MKTX",
//     "HOLX","ARE","ODFL","OXY","VMC","CHD","KMX","TSN","NTRS","SYF","VRSN","URI","EXPE",
//     "OKE","QRVO","RSG","AKAM","MLM","ETR","KSU","IP","GRMN","CTLT","RF","WDC","TRMB",
//     "COO","TFX","AES","KEY","TSCO","MTB","XYL","AEE","VTR","HIG","ULTA","LVS","FE","AMCR",
//     "WAT","HPE","HAL","ANET","DOV","CFG","TYL","CAG","ALB","GWW","ESS","DRI","CTXS","INCY",
//     "NUE","NDAQ","NVR","EXPD","IT","DGX","IR","BR","PKI","CMS","STX","PEAK","VAR","HES",
//     "ABC","CCL","NTAP","STE","CAH","DRE","MAA","EXR","CE","FMC","DPZ","BKR","GPC","IEX",
//     "MAS","MGM","LDOS","WAB","ABMD","K","HBAN","J","POOL","AVY","TDY","EMN","OMC","BF-B",
//     "PFG","HRL","BIO","BXP","RJF","PHM","SJM","CINF","NLOK","FBHS","RCL","UAL","FFIV",
//     "PKG","CHRW","WHR","EVRG","LUMN","JBHT","XRAY","LNT","UDR","CNP","HAS","LW","WRK",
//     "LB","JKHY","TXT","L","ATO","DVN","LYV","WYNN","DISCK","AAP","HWM","ALLE","PWR",
//     "AAL","TPR","FANG","BWA","LKQ","NRG","FOXA","SNA","IPG","UHS","HSIC","NWL","CBOE",
//     "HST","MOS","IRM","WU","CPB","WRB","CF","LNC","MHK","RE","TAP","PNR","GL","CMA",
//     "NWSA","IPGP","PNW","NI","IVZ","JNPR","ROL","NLSN","AOS","RHI","DVA","ZION","AIZ",
//     "DISH","REG","NCLH","KIM","BEN","FLIR","SEE","MRO","DISCA","COG","HBI","ALK","HII",
//     "DXC","PVH","APA","FRT","PBCT","PRGO","VNO","LEG","RL","NOV","FLS","UNM","SLG","HFC",
//     "FOX","VNT","GPS","FTI","XRX","UAA","UA","NWS"
// ];

const trial_list = [
    "NUE","NDAQ","NVR","EXPD","IT","DGX","IR","BR","PKI","CMS","STX","PEAK","VAR","HES",
    "ABC","CCL","NTAP","STE","CAH","DRE","MAA","EXR","CE","FMC","DPZ","BKR","GPC","IEX",
    "MAS","MGM","LDOS","WAB","ABMD","K","HBAN","J","POOL","AVY","TDY","EMN","OMC","BF-B",
    "PFG","HRL","BIO","BXP","RJF","PHM","SJM","CINF","NLOK","FBHS","RCL","UAL","FFIV",
    "PKG","CHRW","WHR","EVRG","LUMN","JBHT","XRAY","LNT","UDR","CNP","HAS","LW","WRK",
    "LB","JKHY","TXT","L","ATO","DVN","LYV","WYNN","DISCK","AAP","HWM","ALLE","PWR",
    "AAL","TPR","FANG","BWA","LKQ","NRG","FOXA","SNA","IPG","UHS","HSIC","NWL","CBOE",
    "HST","MOS","IRM","WU","CPB","WRB","CF","LNC","MHK","RE","TAP","PNR","GL","CMA"
];

const scan = async (URL, filter, arr, type, key)=> {

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

        let result = '';
        let debtToEquityRatio = '';

        if(type === 'pe'){
            result = await page.$eval(filter, el => el.textContent);
        }

        if(type === 'pb'){
            const res = await page.$$eval(filter, el => el.map(item => item.textContent));
            const pbText = res.filter( el => el.indexOf('Price/Book (mrq)') !== -1)[0];
            const digested = pbText.split('Price/Book (mrq)')[1];

            if(digested.indexOf('N/A') === -1){
                result = pbText.substring("Price/Book (mrq)".length, pbText.indexOf('.')+3);
            }else{
                result = 'N/A';
            }

            const dteText = res.filter( el => el.indexOf('Total Debt/Equity (mrq)') !== -1)[0];
            const dteDigested = dteText.split('Total Debt/Equity (mrq)')[1];
            
            if(dteDigested.indexOf('N/A') === -1){
                debtToEquityRatio = dteText.substring("Total Debt/Equity (mrq)".length, dteText.indexOf('.')+3);
            }else{
                const dte = await calculateDTE(page);
                debtToEquityRatio = dte;
            }
            
        }

        result = result.split(',').join('');

        console.log(key, `${type}:`, result);

        if(result && parseFloat(result) > 0){
            arr.push({[key]: parseFloat(result), dte: debtToEquityRatio});
        }else if(result === 'N/A' && type === 'pe'){
            const calculatedPE = await calculatePE(type, page);
            arr.push({[key]: calculatedPE, dte: debtToEquityRatio});
        }else if(result === 'N/A' && type === 'pb'){
            const calculatedPB = await calculatePB(type, page);
            arr.push({[key]: calculatedPB, dte: debtToEquityRatio});
        }

        await browser.close();

    }catch(error){
        console.log(error);
    }

}

const calculatePE = async (type, page)=> {

    if(type === 'pe'){
        
        const pricePerShare = await page.$eval('[data-reactid="50"]', el => el.textContent);
        const earningsPerShare = await page.$eval('[data-test=EPS_RATIO-value]', el => el.textContent);

        const pps = parseFloat(pricePerShare) * 100;
        const eps = parseFloat(earningsPerShare) * 100;

        return Math.ceil(pps / eps); 
        
    }

}

const calculatePB = async (type, page)=> {

    if(type === 'pb'){
        const pricePerShare = await page.$eval('[data-reactid="50"]', el => el.textContent);
        const bookValuePerShare = await page.$$eval('tr', el => el.map(item => item.textContent));
        const bvpsText = bookValuePerShare.filter( item => item.indexOf("Book Value Per Share (mrq)") !== -1)[0];
        const digested = bvpsText.substring("Book Value Per Share (mrq)".length, bvpsText.indexOf('.')+3);
        const pps = parseFloat(pricePerShare) * 100;
        const bvps = parseFloat(digested) * 100;
        return Math.ceil(pps / bvps);
    }

}

const calculateDTE = async (page)=> {

    const totalDebt = await page.$$eval('tr', el => el.map(item => item.textContent));
    const td = totalDebt.filter(item => item.indexOf("Total Debt (mrq)") !== -1)[0].split("Total Debt (mrq)")[1];
    
    const bookValue = await page.$$eval('tr', el => el.map(item => item.textContent));
    const bv = bookValue.filter(item => item.indexOf("Book Value Per Share (mrq)") !== -1)[0].split("Book Value Per Share (mrq)")[1];

    const sharesOutstanding = await page.$$eval('tr', el => el.map(item => item.textContent));
    const so = sharesOutstanding.filter(item => item.indexOf("Shares Outstanding") !== -1)[0].split("Shares Outstanding")[1];

    const tdNumber = convertToNumer(td);
    const bvNumber = convertToNumer(bv);
    const soNumber = convertToNumer(so);

    return tdNumber * (bvNumber / soNumber);

}

const convertToNumer = (strNum)=> {

    const convert = (str, letter)=> {
        return parseFloat(str.split(letter)[0]);
    }

    if(strNum.indexOf('B') !== -1){
        return convert(strNum, 'B') * 1000000000;
    }else if(strNum.indexOf('M') !== -1){
        return convert(strNum, 'M') * 1000000;
    }else{
        return parseFloat(strNum);
    }

}

const scanner = async ()=> {

    const pe_arr = [];
    const pb_arr = [];

    for(let i = 0; i < trial_list.length; i++){
        const url = `https://finance.yahoo.com/quote/${trial_list[i]}/key-statistics?p=${trial_list[i]}`;
        const filter = 'tr';
        
        await scan(url, filter, pb_arr, 'pb', trial_list[i]);
    }

    for(let i = 0; i < trial_list.length; i++){
        const url = `https://finance.yahoo.com/quote/${trial_list[i]}?p=${trial_list[i]}&.tsrc=fin-srch`;
        const filter = '[data-test=PE_RATIO-value]';
        
        await scan(url, filter, pe_arr, 'pe', trial_list[i]);
    }

    return {PE_ARR: pe_arr, PB_ARR: pb_arr};

}

const getRatios = async ()=> {

    try{

        const finalList = [];
        const pe_pb_arrs =  await scanner();

        const pe_ar = [...pe_pb_arrs.PE_ARR];
        const pb_ar = [...pe_pb_arrs.PB_ARR];

        console.log(pe_ar, pe_ar.length, pb_ar, pb_ar.length);

        for(let i = 0; i < pe_ar.length; i++){

            const key = Object.keys(pe_ar[i])[0];
            const value_1 = Object.values(pe_ar[i])[0] * 100;
            const value_2 = Object.values(pb_ar[i])[0] * 100;

            console.log(key, value_1, value_2);

            const result = ((value_1 * value_2) / 10000).toFixed(2);
            
            if((result <= 22.5 && result >= 0) && (pb_ar[i].dte > 0 && pb_ar[i].dte < 0.50)){
                finalList.push({[key]: result});    
            }

        }

        console.log(finalList);

        return finalList;


    }catch(error){
        console.log(error);
    }

}

const generateList = async ()=> {
    const list = await getRatios();
    const data = JSON.stringify({list: list});
    //fs.writeFileSync('list.json', data);
}

generateList();



