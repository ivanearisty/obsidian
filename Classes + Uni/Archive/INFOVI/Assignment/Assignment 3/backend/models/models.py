from pydantic import BaseModel

class ChampionInstance(BaseModel):
    name: str
    patch: float
    win_rate: float
    win_rate_delta: float
    modified_winrate: float
    pick_rate: float
    tier: str
    rank: int
    ban_rate: float
    games: int

#ended up not using this
tier_mapping = {
    "S+": 1,
    "S": 2,
    "S-": 3,
    "A+": 4,
    "A": 5,
    "A-": 6,
    "B+": 7,
    "B": 8,
    "B-": 9,
}


if __name__ == "__main__":
    pass