from typing import Union
from fastapi import FastAPI
from fetchData import main as scrape
from runner import process

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/get/{ticker}")
def read_item(ticker: str, percentage: int = 50):
    scrape(ticker)
    return process(percentage)