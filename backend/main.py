from typing import Union
from fastapi import FastAPI
from fetchData import main as scrape
from runner import process
import pandas as pd
import json

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/get/{ticker}")
def read_item(ticker: str, percentage: int = 50):
    scrape(ticker)
    return process(percentage)

@app.get("/tickers")
def read_tickers():
    df = pd.read_csv("../ticker.txt", sep="\t", index_col=False)
    return json.dumps(df.to_dict(orient='list')['ticker'])