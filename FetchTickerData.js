const axios = require('axios');
const fs = require('fs');

let totalTickerData = [];
let counter = 0;
let timerId = "";

const args = process.argv;
console.log(args[2])

function startTimer(interval){
    timer = setInterval(function(){requestTickerData(interval)},interval)
    timer = timerId;
    return timer
}

async function requestTickerData(interval) {
    
    try{
        let res = await axios.get("https://api.covalenthq.com/v1/pricing/tickers/?page-size=10000&key=${process.env.API_KEY}").catch((err)=>{
            console.error(err);
        })
        // console.log(res.data.data.pagination.has_more)
        counter++;
        // decide number of samples
        if (counter < 61){
        tickerData = res.data.data.items;
        console.log("Fetching Sample : ", counter)
        console.log("length",tickerData.length)
        totalTickerData.push(tickerData);}
        else{
            clearInterval(timer)
            console.log("All Samples downloaded.")
            console.log("Flattening 60 Samples into single array", totalTickerData.length)
            totalTickerData = totalTickerData.flat();
            console.log("Length after flat", totalTickerData.length)
            console.log("Writing the data into text file.")
            fs.writeFileSync('TotalTickerData.txt',JSON.stringify(totalTickerData))
            counter = 0
            totalTickerData = []
            if (require.main === module){
                startTimer(interval)                
            }
        }
    }
    catch(err){
        console.log(err)
    }
}


if (require.main === module) {
    startTimer(Number(args[2])*1000)
}
else{
    console.log("not in module")
}

module.exports = {startTimer,requestTickerData};
