#!/bin/bash
echo "1.Press Enter only if you create .env and pasted your API KEY"
read API

echo "2. Downloading Data from API at 60  Seconds >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
ticker_data=`node FetchTickerData.js 60`




