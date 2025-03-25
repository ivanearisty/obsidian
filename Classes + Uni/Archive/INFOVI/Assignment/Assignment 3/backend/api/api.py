from typing import Optional
from bs4 import BeautifulSoup
import httpx
import asyncio
from models.models import ChampionInstance
import logging
logger = logging.getLogger(__name__)

url = 'https://lolalytics.com/lol/'
state = 2
latest_patch = "14.21"

sample_champion_data = {
    "name": "Corki",
    "patch": "14.19",
    "win_rate": "50.5%",
    "win_rate_delta": "+0.5%",
    "modified_winrate": "50.5%",
    "pick_rate": "1.1%",
    "tier": "A",
    "rank": "2",
    "ban_rate": "0.1%",
    "games": "1000"
}

async def main():
    if state == 0 :
        # Testing
        res = await get_champion_data("corki", "14.19")
        with open('/Users/suape/WorkDir/Main Vault/Classes + Uni/INFOVI/Assignment/Assignment 3/backend/api/champion_data.html', 'w') as file:
            file.write(res)
    if state == 1 : 
        # Testing
        with open('/Users/suape/WorkDir/Main Vault/Classes + Uni/INFOVI/Assignment/Assignment 3/backend/api/champion_data.html', 'r') as file:
            data = file.read()
        await testing(data)

async def testing(data):
    soup = BeautifulSoup(data, 'html.parser')
    
    row_1_data = []
    row_2_data = []

    container_div = soup.find('div', class_='flex justify-around border border-[#333333] p-2 text-center')
    if container_div:
        # Find all the individual sections within this container
        sections = container_div.find_all('div', recursive=False)  # Only immediate children divs
        
        for section in sections:
            # Find the value (the number or letter) within the div with class "font-bold"
            value_div = section.find('div', class_='mb-1 font-bold')
            if value_div:
                value = value_div.get_text(strip=True)
                row_1_data.append(value)
    print(row_1_data)

    container_div = soup.find('div', class_='mt-2 flex justify-around border border-[#333333] p-2 text-center')
    if container_div:
        # Find all the individual sections within this container
        sections = container_div.find_all('div', recursive=False)  # Only immediate children divs
        
        for section in sections:
            # Find the value (the number or letter) within the div with class "font-bold"
            value_div = section.find('div', class_='mb-1 font-bold')
            if value_div:
                value = value_div.get_text(strip=True)
                row_2_data.append(value)
    print(row_2_data)

    return

async def save_champion_data(champion_name: str, patch: Optional[str] = None) -> ChampionInstance:
    nUrl = url + champion_name.lower() + "/build/" + (f"?patch={patch}" if patch else "")
    
    print(nUrl)

    async with httpx.AsyncClient() as client:
        response = await client.get(nUrl)

    if response.status_code != 200:
        return f"Error: Received status code {response.status_code}"
    
    soup = BeautifulSoup(response.text, 'html.parser')

    return soup.prettify()

async def get_champion_data(champion_name: str, patch: Optional[str] = None) -> ChampionInstance:
    nUrl = url + champion_name.lower() + "/build/" + (f"?patch={patch}" if patch else "")

    async with httpx.AsyncClient() as client:
        response = await client.get(nUrl)

    print(response.status_code)

    if response.status_code != 200:
        return f"Error: Received status code {response.status_code}"
    
    soup = BeautifulSoup(response.text, 'html.parser')

    with open('/Users/suape/WorkDir/Main Vault/Classes + Uni/INFOVI/Assignment/Assignment 3/backend/api/test.html', 'w') as file:
            file.write(soup.prettify())

    row_1_data = []
    row_2_data = []

    container_div = soup.find('div', class_='flex justify-around border border-[#333333] p-2 text-center')
    if container_div:
        # Find all the individual sections within this container
        sections = container_div.find_all('div', recursive=False)  # Only immediate children divs
        
        for section in sections:
            # Find the value (the number or letter) within the div with class "font-bold"
            value_div = section.find('div', class_='mb-1 font-bold')
            if value_div:
                value = value_div.get_text(strip=True)
                row_1_data.append(value)

    container_div = soup.find('div', class_='mt-2 flex justify-around border border-[#333333] p-2 text-center')
    if container_div:
        # Find all the individual sections within this container
        sections = container_div.find_all('div', recursive=False)  # Only immediate children divs
        
        for section in sections:
            # Find the value (the number or letter) within the div with class "font-bold"
            value_div = section.find('div', class_='mb-1 font-bold')
            if value_div:
                value = value_div.get_text(strip=True)
                row_2_data.append(value)

    print(row_1_data)
    print(row_2_data)

    return ChampionInstance(
        name=champion_name,
        patch=float(latest_patch if not patch else patch),
        win_rate=parse_percentage(row_1_data[0]),
        win_rate_delta=parse_percentage(row_1_data[1]),
        modified_winrate=parse_percentage(row_1_data[2]),
        pick_rate=parse_percentage(row_1_data[3]),
        tier=row_2_data[0], 
        rank=int(row_2_data[1].split('/')[0]),
        ban_rate=parse_percentage(row_2_data[2]),
        games=parse_integer(row_2_data[3])
    )

        
def parse_percentage(value: str) -> float:
    return float(value.strip('%'))

def parse_integer(value: str) -> int:
    return int(value.replace(',', ''))

if __name__ == "__main__":
    asyncio.run(main())
