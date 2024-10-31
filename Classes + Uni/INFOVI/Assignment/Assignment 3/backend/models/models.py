from pydantic import BaseModel

class ChampionInstance(BaseModel):
    name: str
    patch: float
    win_rate: float
    win_rate_delta: float
    modified_winrate: float
    pick_rate: float
    tier: int
    rank: int
    ban_rate: float
    games: int

if __name__ == "__main__":
    pass