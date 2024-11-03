from fastapi import FastAPI
from api import api
from models.models import ChampionInstance
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Expose all origins
origins = ["*"]

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

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

@app.get("/champion/{champion_name}")
def read_item(champion_name: int, q: str = None):
    return 

@app.get("/test/{champion_name}&{patch_version}")
async def test(champion_name: str, patch_version: str):
    testChampion: ChampionInstance = await api.get_champion_data(champion_name, patch_version)
    return testChampion