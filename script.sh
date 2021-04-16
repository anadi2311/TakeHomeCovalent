#!/bin/bash
echo "Set the Interval for API calls in MilliSeconds"
read interval
echo "1. Downloading Data from API at $interval Milli Seconds >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
ticker_data=`node FetchTickerData.js $interval` 

