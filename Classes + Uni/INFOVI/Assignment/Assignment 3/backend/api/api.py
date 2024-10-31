from typing import Optional
from bs4 import BeautifulSoup
import httpx
import asyncio
from models.models import ChampionInstance

url = 'https://lolalytics.com/lol/'
state = 1
latest_patch = "14.21"

async def main():
    if state == 0 :
        # Send a GET request to the URL asynchronously
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

async def transform_data(data):

    pass

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

    if response.status_code != 200:
        return f"Error: Received status code {response.status_code}"
    
    soup = BeautifulSoup(response.text, 'html.parser')

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

    return None

    # return ChampionInstance(
    #     name=champion_name,
    #     patch=(f"?patch={patch}" if patch else latest_patch),
    #     win_rate=row_1_data[0],
    #     win_rate_delta=row_1_data[1],
    #     modified_winrate=row_1_data[2],
    #     pick_rate=row_1_data[3],
    #     tier=row_2_data[0],
    #     rank=row_2_data[1][:row_2_data[1].find('/')],
    #     ban_rate=row_2_data[2],
    #     games=row_2_data[3]
    # )
        


# async def get_champion_data(champion_name: str, patch: Optional[str] = None):
#     nUrl = url + champion_name.lower() + "/build/" + (f"?patch={patch}" if patch else "")
    
#     print(nUrl)

#     async with httpx.AsyncClient() as client:
#         response = await client.get(nUrl)

#     if response.status_code != 200:
#         return f"Error: Received status code {response.status_code}"
    
#     soup = BeautifulSoup(response.text, 'html.parser')

#     return soup.prettify() 

if __name__ == "__main__":
    asyncio.run(main())
