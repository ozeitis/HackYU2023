from typing import Union
from fastapi import FastAPI
from fetchData import main as scrape
from runner import process
import pandas as pd
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    df = df.replace([pd.np.inf, -pd.np.inf], pd.np.nan)  # Replace inf with nan
    df = df.dropna()  # Drop rows containing nan values
    tickers = df.to_dict(orient='list')['ticker']
    return {"tickers": tickers}