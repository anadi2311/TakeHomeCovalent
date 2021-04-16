const axios = require('axios');
const expect = require('chai').expect;
const chai = require('chai')
const fs = require('fs');
const FetchTickerData = require('../FetchTickerData')
const sinon = require('sinon')
chai.use(require('sinon-chai'))

describe('Test the Spot Price API', () => {
        
    it("should return correctly fire the API - check statuscode, URL and pagination", async () =>{
        const resp = await axios.get("https://api.covalenthq.com/v1/pricing/tickers/?page-size=10000&key=${process.env.API_KEY}")
        expect(resp.status).to.equal(200)
        expect(resp.config.url).to.include('https://api.covalenthq.com/v1/pricing/tickers')
        expect(resp.data.data.pagination.has_more).to.equal(false)
    })
})

describe('Test 60 samples are dowloaded after 60 min and text file is written', () => {

    it('should run the function at correct time', (done) =>{
        console.log("This will result in API error due to multiple request. Aim is to check function is called and after 60 Samples Txt file is written")
        clock = sinon.useFakeTimers();
        var spiedFunc = sinon.spy(FetchTickerData.startTimer(60000))
        timer_id = spiedFunc()
        clock.tick(60000*61)
        clearInterval(timer_id);
        clock = sinon.restore();
        expect(spiedFunc).to.be.calledOnce;
        done();
    })

    it('New created file TotalTickerData should exist ', (done) => {
        console.log("waiting for previous test to finish")
        setTimeout(function(){
            expect(fs.existsSync('./TotalTickerData.txt')).to.equal(true);
            console.log("File Exists!! Now deleting it.")
            fs.unlinkSync('./TotalTickerData.txt')
            done();
        },5000)
    })
})