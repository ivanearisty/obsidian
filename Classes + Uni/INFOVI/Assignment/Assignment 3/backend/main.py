from fastapi import FastAPI
from api import api
from models.models import ChampionInstance

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

@app.get("/champion/{champion_name}")
def read_item(champion_name: int, q: str = None):
    return 

@app.get("/test")
async def test():
    testChampion = await api.get_champion_data("corki", "14.19")
    return testChampion