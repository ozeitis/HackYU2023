import requests
import json
import pandas as pd

def main(ticker):
    df = pd.read_csv("../ticker.txt", sep="\t", index_col=False)
    print(df.head())

    data = df.loc[df["ticker"] == ticker.lower()]
    print(data)

    cik = str(data["cik"][0])
    print(cik)
    while len(cik) < 10:
        cik = "0" + cik

    print(cik)

    #    https://data.sec.gov/api/xbrl/companyfacts/CIK0000320193.json
    url = "https://data.sec.gov/api/xbrl/companyfacts/CIK"+ str(cik) + ".json"
    headers = {
        "User-Agent": "YU-Hackathan-2023",
        # "User-Agent": "Mozilla/5.0",
        # "Accept-Encoding": "gzip, deflate",
        # "Host": "www.sec.gov"
        # 'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Mobile Safari/537.36'
    }

    response = requests.get(url, headers=headers)

    print(url)
    if response.status_code == 200:
        with open("d.json", "w") as f:
            f.write(response.text)
            print("Data saved as data.json")
    else:
        print(response.status_code)
        print("Error fetching data")
