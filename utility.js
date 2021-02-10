var symbols = []
document.querySelector('.table').children[1].children.forEach(child => {
    symbols.push(child.children[2].innerText);
});
console.log(symbols);

//get PE
// const link1 = `https://finance.yahoo.com/quote/${symbol_arr[i]}?p=${symbol_arr[i]}&.tsrc=fin-srch`;
// document.querySelector('span[data-reactid="149"]').innerText;

//get P/B 
// const link2 = `https://finance.yahoo.com/quote/${symbol_arr[i]}/key-statistics?p=${symbol_arr[i]}`;
// document.querySelectorAll('td.Ta\\(c\\)')[36].innerText;