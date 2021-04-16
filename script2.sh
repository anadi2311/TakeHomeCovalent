#!/bin/bash

echo "Analyzing the Data in Python Matplotlib after 60 Samples"
# watch -n 60 `python3 AnalyzeTickerData.py`
while true; do python3 AnalyzeTickerData.py; sleep 60; done
