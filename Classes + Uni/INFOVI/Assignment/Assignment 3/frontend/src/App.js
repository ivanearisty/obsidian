import "./App.css";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const Graph = React.lazy(() => import("./components/Graph"));

const testData = [
  { patch: "14.1", value: 40 },
  { patch: "14.2", value: 42 },
  { patch: "14.3", value: 45 },
];
const metrics = [
  "win_rate",
  "win_rate_delta",
  "modified_winrate",
  "pick_rate",
  "rank",
  "ban_rate",
  "games",
];
const champions = [
  "Aatrox",
  "Ahri",
  "Akali",
  "Akshan",
  "Alistar",
  "Amumu",
  "Anivia",
  "Annie",
  "Aphelios",
  "Ashe",
  "Aurelion Sol",
  "Aurora",
  "Azir",
  "Bard",
  "Bel'Veth",
  "Blitzcrank",
  "Brand",
  "Braum",
  "Briar",
  "Caitlyn",
  "Camille",
  "Cassiopeia",
  "Cho'Gath",
  "Corki",
  "Darius",
  "Diana",
  "Dr. Mundo",
  "Draven",
  "Ekko",
  "Elise",
  "Evelynn",
  "Ezreal",
  "Fiddlesticks",
  "Fiora",
  "Fizz",
  "Galio",
  "Gangplank",
  "Garen",
  "Gnar",
  "Gragas",
  "Graves",
  "Gwen",
  "Hecarim",
  "Heimerdinger",
  "Hwei",
  "Illaoi",
  "Irelia",
  "Ivern",
  "Janna",
  "Jarvan IV",
  "Jax",
  "Jayce",
  "Jhin",
  "Jinx",
  "K'Sante",
  "Kai'Sa",
  "Kalista",
  "Karma",
  "Karthus",
  "Kassadin",
  "Katarina",
  "Kayle",
  "Kayn",
  "Kennen",
  "Kha'Zix",
  "Kindred",
  "Kled",
  "Kog'Maw",
  "LeBlanc",
  "Lee Sin",
  "Leona",
  "Lillia",
  "Lissandra",
  "Lucian",
  "Lulu",
  "Lux",
  "Malphite",
  "Malzahar",
  "Maokai",
  "Master Yi",
  "Milio",
  "Miss Fortune",
  "Mordekaiser",
  "Morgana",
  "Naafiri",
  "Nami",
  "Nasus",
  "Nautilus",
  "Neeko",
  "Nidalee",
  "Nilah",
  "Nocturne",
  "Nunu & Willump",
  "Olaf",
  "Orianna",
  "Ornn",
  "Pantheon",
  "Poppy",
  "Pyke",
  "Qiyana",
  "Quinn",
  "Rakan",
  "Rammus",
  "Rek'Sai",
  "Rell",
  "Renata Glasc",
  "Renekton",
  "Rengar",
  "Riven",
  "Rumble",
  "Ryze",
  "Samira",
  "Sejuani",
  "Senna",
  "Seraphine",
  "Sett",
  "Shaco",
  "Shen",
  "Shyvana",
  "Singed",
  "Sion",
  "Sivir",
  "Skarner",
  "Smolder",
  "Sona",
  "Soraka",
  "Swain",
  "Sylas",
  "Syndra",
  "Tahm Kench",
  "Taliyah",
  "Talon",
  "Taric",
  "Teemo",
  "Thresh",
  "Tristana",
  "Trundle",
  "Tryndamere",
  "Twisted Fate",
  "Twitch",
  "Udyr",
  "Urgot",
  "Varus",
  "Vayne",
  "Veigar",
  "Vel'Koz",
  "Vex",
  "Vi",
  "Viego",
  "Viktor",
  "Vladimir",
  "Volibear",
  "Warwick",
  "Wukong",
  "Xayah",
  "Xerath",
  "Xin Zhao",
  "Yasuo",
  "Yone",
  "Yorick",
  "Yuumi",
  "Zac",
  "Zed",
  "Zeri",
  "Ziggs",
  "Zilean",
  "Zoe",
  "Zyra",
];
const patches = Array.from({ length: 12 }, (_, i) => `14.${i + 10}`);

function App() {
  const [selectedChampion, setSelectedChampion] = useState(champions[0]);
  const [selectedMetric, setSelectedMetric] = useState(metrics[0]);
  const [startPatch, setStartPatch] = useState(patches[0]);
  const [endPatch, setEndPatch] = useState(patches[patches.length - 1]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const cleanChampionName = selectedChampion.toLowerCase().replace(/[\s_']/g, '');
  const [imageUrl, setImageUrl] = useState(getChampionImageUrl(cleanChampionName, true));

  function getChampionImageUrl(name, includeZero) {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${name.toLowerCase()}/skins/base/${name.toLowerCase()}loadscreen${includeZero ? '_0' : ''}.jpg`;
  }

  const handleImageError = () => {
    if (imageUrl.includes('_0')) {
      setImageUrl(getChampionImageUrl(cleanChampionName, false));
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const patchRange = patches.slice(
        patches.indexOf(startPatch),
        patches.indexOf(endPatch) + 1
      );

      try {
        const results = await Promise.all(
          patchRange.map(async (patch) => {
            const response = await fetch(
              `http://127.0.0.1:8000/test/${selectedChampion}&${patch}`
            );
            if (!response.ok)
              throw new Error(`Failed to fetch data for patch ${patch}`);

            const result = await response.json();
            return { patch, value: result[selectedMetric] };
          })
        );

        setData(results);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    setData(null);
    fetchData();
  }, [selectedChampion, selectedMetric, startPatch, endPatch]);

  useEffect(() => {
    setImageUrl(getChampionImageUrl(cleanChampionName, true));
  }, [selectedChampion]);

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h1>League of Legends Champion Stats</h1>

      <label>
        Champion:
        <select
          value={selectedChampion}
          onChange={(e) => setSelectedChampion(e.target.value)}
        >
          {champions.map((champ) => (
            <option key={champ} value={champ}>
              {champ}
            </option>
          ))}
        </select>
      </label>

      <label>
        Metric:
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
        >
          {metrics.map((metric) => (
            <option key={metric} value={metric}>
              {metric}
            </option>
          ))}
        </select>
      </label>

      <label>
        Start Patch:
        <select
          value={startPatch}
          onChange={(e) => {
            const newStartPatch = e.target.value;
            if (patches.indexOf(newStartPatch) > patches.indexOf(endPatch)) {
              setEndPatch(newStartPatch);
            }
            setStartPatch(newStartPatch);
          }}
        >
          {patches.map((patch) => (
            <option key={patch} value={patch}>
              {patch}
            </option>
          ))}
        </select>
      </label>

      <label>
        End Patch:
        <select
          value={endPatch}
          onChange={(e) => {
            const newEndPatch = e.target.value;
            if (patches.indexOf(newEndPatch) < patches.indexOf(startPatch)) {
              setStartPatch(newEndPatch);
            }
            setEndPatch(newEndPatch);
          }}
        >
          {patches.map((patch) => (
            <option key={patch} value={patch}>
              {patch}
            </option>
          ))}
        </select>
      </label>
      <br></br>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <div style={{ marginRight: '20px' }}>
          <img
            src={imageUrl}
            alt={`${selectedChampion} load screen`}
            onError={handleImageError}
            style={{ width: '300px', height: 'auto' }}
          />
        </div>

        <div>
          {loading ? (
            <>
              <div style={{ height: "100px" }}></div>
              <ClipLoader color="white" size={200} />
            </>
          ) : (
            data && <Graph data={data} metric={selectedMetric} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
