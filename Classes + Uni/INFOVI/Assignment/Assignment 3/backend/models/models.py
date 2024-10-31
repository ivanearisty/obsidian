from pydantic import BaseModel

class ChampionInstance(BaseModel):
    name: str
    patch: float
    win_rate: float
    tier: str
    rank: int
    ban_rate: float
    pick_rate: float
    win_rate_delta: float
    modified_winrate: float

if __name__ == "__main__":
    pass