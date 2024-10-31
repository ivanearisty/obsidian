from typing import Optional
from bs4 import BeautifulSoup
import httpx
import asyncio
from backend.models.models import ChampionInstance

# URL to scrape
url = 'https://lolalytics.com/lol/'

state = 1

async def main():
    if state == 0 :
        # Send a GET request to the URL asynchronously
        res = await get_champion_data("Aatrox", "14.19")
        with open('/Users/suape/WorkDir/Main Vault/Classes + Uni/INFOVI/Assignment/Assignment 3/backend/api/champion_data.html', 'w') as file:
            file.write(res)
    if state == 1 : 
        # Testing
        with open('/Users/suape/WorkDir/Main Vault/Classes + Uni/INFOVI/Assignment/Assignment 3/backend/api/champion_data.html', 'r') as file:
            data = file.read()
        await testing(data)

async def testing(data):
    soup = BeautifulSoup(data, 'html.parser')
    
    container_div = soup.find('div', class_='flex justify-around border border-[#333333] p-2 text-center')

    if container_div:
        win_rate_div = container_div.find('div', class_='mb-1 font-bold')
        if win_rate_div:
            win_rate: float = win_rate_div.get_text(strip=True)
            print(win_rate)
        
    return

async def transform_data(data):

    pass

async def get_champion_data(champion_name: str, patch: Optional[str] = None):
    nUrl = url + champion_name.lower() + "/build/" + (f"?patch={patch}" if patch else "")
    
    print(nUrl)

    async with httpx.AsyncClient() as client:
        response = await client.get(nUrl)

    if response.status_code != 200:
        return f"Error: Received status code {response.status_code}"
    
    soup = BeautifulSoup(response.text, 'html.parser')

    return soup.prettify() 

if __name__ == "__main__":
    asyncio.run(main())
