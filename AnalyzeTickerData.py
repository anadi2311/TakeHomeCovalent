import json
import pandas as pd 
import matplotlib.pyplot as plt 
import random
import numpy as np
import threading


WAIT_SECONDS = 61

def Transform_Data():
    try:
        with open('TotalTickerData.txt') as file:
            data = json.load(file)
            df = pd.DataFrame(data)

            #randomly fill null values in contract_address
            
            df.loc[df.sample(frac=0.1).index, "contract_address"] = np.nan
            df = df[df["contract_address"].isnull()]

            df1 = pd.pivot_table(df, index = ['contract_name',"contract_ticker_symbol"], values = "contract_address", aggfunc = len)
            print(df1)
            df1 = df1.sort_values(['contract_address'], ascending=[False])
           
            fig,[ax1,ax2]  = plt.subplots(nrows = 2, figsize = (30,15))
        
            df1 = df1.drop(df1[(df1.contract_address > 60)].index)
            print(range(0, max(df1["contract_address"])))
            ax1.hist(df1["contract_address"], bins = list(range(0,max(df1["contract_address"]+1))))
            ax1.set_xlim((0, max(df1["contract_address"])+1))
            ax1.tick_params(labelsize = 14)
            ax1.set_title("Frequency of contracts Vs Number of Nulls in contract_address", fontsize = 18)
            ax1.set_xlabel("Number of Nulls",fontsize = 14)
            ax1.set_ylabel("Frequency of Contracts",fontsize = 14)


            fif_lar = df1.contract_address.nlargest(10).iloc[-1]  
            df1 = df1.drop(df1[(df1.contract_address < fif_lar)].index)
            df1 = df1.reset_index()
            ax2.bar(df1.contract_name, df1.contract_address)
            ax2.set_xticklabels(df1.contract_name,rotation = 90, fontsize = 14)
            ax2.set_title("Top5 Contract Address with most number of nulls", fontsize = 18)
            ax2.set_ylabel("Number of Nulls",fontsize = 14)
            ax2.set_xlabel("Contract Ticker Symbols",fontsize = 14)

            for p in ax1.patches:
              ax1.annotate(str(p.get_height()), (p.get_x() * 1.005, p.get_height() * 1.005))

            fig.savefig("Contract_Address_with_Nulls.png")
            ticker = threading.Event()
            while not ticker.wait(WAIT_SECONDS):
                Transform_Data()
            
    except:
        raise Exception("Problem Analyzing Data")

if __name__ == "__main__":
    Transform_Data()