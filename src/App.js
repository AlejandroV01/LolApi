import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./allBottoms.css";
import "./App.css";
import DisplayFlexRank from "./components/DisplayFlexRank";
import DisplayLiveGame from "./components/DisplayLiveGame";
import DisplayLiveGameRedSide from "./components/DisplayLiveGameRedSide";
import DisplaySoloRank from "./components/DisplaySoloRank";
import "./nav.css";
import "./profileDisplay.css";
function App() {
  const champIdToName = {
    266: "Aatrox",
    103: "Ahri",
    84: "Akali",
    166: "Akshan",
    12: "Alistar",
    32: "Amumu",
    34: "Anivia",
    1: "Annie",
    523: "Aphelios",
    22: "Ashe",
    136: "AurelionSol",
    268: "Azir",
    432: "Bard",
    200: "Belveth",
    53: "Blitzcrank",
    63: "Brand",
    201: "Braum",
    51: "Caitlyn",
    164: "Camille",
    69: "Cassiopeia",
    31: "Chogath",
    42: "Corki",
    122: "Darius",
    131: "Diana",
    119: "Draven",
    36: "DrMundo",
    245: "Ekko",
    60: "Elise",
    28: "Evelynn",
    81: "Ezreal",
    9: "Fiddlesticks",
    114: "Fiora",
    105: "Fizz",
    3: "Galio",
    41: "Gangplank",
    86: "Garen",
    150: "Gnar",
    79: "Gragas",
    104: "Graves",
    887: "Gwen",
    120: "Hecarim",
    74: "Heimerdinger",
    420: "Illaoi",
    39: "Irelia",
    427: "Ivern",
    40: "Janna",
    59: "JarvanIV",
    24: "Jax",
    126: "Jayce",
    202: "Jhin",
    222: "Jinx",
    145: "Kaisa",
    429: "Kalista",
    43: "Karma",
    30: "Karthus",
    38: "Kassadin",
    55: "Katarina",
    10: "Kayle",
    141: "Kayn",
    85: "Kennen",
    121: "Khazix",
    203: "Kindred",
    240: "Kled",
    96: "KogMaw",
    7: "Leblanc",
    64: "LeeSin",
    89: "Leona",
    876: "Lillia",
    127: "Lissandra",
    236: "Lucian",
    117: "Lulu",
    99: "Lux",
    54: "Malphite",
    90: "Malzahar",
    57: "Maokai",
    11: "MasterYi",
    21: "MissFortune",
    62: "Wukong",
    82: "Mordekaiser",
    25: "Morgana",
    267: "Nami",
    75: "Nasus",
    111: "Nautilus",
    518: "Neeko",
    76: "Nidalee",
    895: "Nilah",
    56: "Nocturne",
    20: "Nunu",
    2: "Olaf",
    61: "Orianna",
    516: "Ornn",
    80: "Pantheon",
    78: "Poppy",
    555: "Pyke",
    246: "Qiyana",
    133: "Quinn",
    497: "Rakan",
    33: "Rammus",
    421: "RekSai",
    526: "Rell",
    888: "Renata",
    58: "Renekton",
    107: "Rengar",
    92: "Riven",
    68: "Rumble",
    13: "Ryze",
    360: "Samira",
    113: "Sejuani",
    235: "Senna",
    147: "Seraphine",
    875: "Sett",
    35: "Shaco",
    98: "Shen",
    102: "Shyvana",
    27: "Singed",
    14: "Sion",
    15: "Sivir",
    72: "Skarner",
    37: "Sona",
    16: "Soraka",
    50: "Swain",
    517: "Sylas",
    134: "Syndra",
    223: "TahmKench",
    163: "Taliyah",
    91: "Talon",
    44: "Taric",
    17: "Teemo",
    412: "Thresh",
    18: "Tristana",
    48: "Trundle",
    23: "Tryndamere",
    4: "TwistedFate",
    29: "Twitch",
    77: "Udyr",
    6: "Urgot",
    110: "Varus",
    67: "Vayne",
    45: "Veigar",
    161: "Velkoz",
    711: "Vex",
    254: "Vi",
    234: "Viego",
    112: "Viktor",
    8: "Vladimir",
    106: "Volibear",
    19: "Warwick",
    498: "Xayah",
    101: "Xerath",
    5: "XinZhao",
    157: "Yasuo",
    777: "Yone",
    83: "Yorick",
    350: "Yuumi",
    154: "Zac",
    238: "Zed",
    221: "Zeri",
    115: "Ziggs",
    26: "Zilean",
    142: "Zoe",
    143: "Zyra",
  };
  const [summonerName, setSummonerName] = useState("");
  const [playerData, setPlayerData] = useState({
    id: "",
    accountId: "",
    puuid: "",
    name: "",
    profileIconId: 0,
    summonerLevel: 0,
  });
  // const API_KEY = process.env.REACT_APP_API_KEY;
  const API_KEY = "RGAPI-c600d0ad-402c-4ee5-bc5e-8a28df934c8a";
  const getGeneralData = async () => {
    await fetch(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        let updatedData = {};
        updatedData = {
          accountId: data.accountId,
          id: data.id,
          name: data.name,
          profileIconId: data.profileIconId,
          puuid: data.puuid,
          summonerLevel: data.summonerLevel,
        };
        setPlayerData((previous) => ({
          ...previous,
          ...updatedData,
        }));

        fetchMastery(data.id);
        fetchActiveGame(data.id);
        fetchRankedData(data.id);
      })
      .catch((err) => alert("Invalid Summoner Name"));
    console.log(playerData);
  };

  const getProfileIcon = () => {
    if (playerData.profileIconId === 0) {
      return "";
    } else {
      return `http://ddragon.leagueoflegends.com/cdn/12.16.1/img/profileicon/${playerData.profileIconId}.png`;
    }
  };

  const fetchRankedData = (data) => {
    fetch(
      `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${data}?api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        let newList = data;
        setPlayerData((previous) => ({
          ...previous,
          rankedInfo: newList,
        }));
      });
  };
  const fetchMastery = (data) => {
    fetch(
      `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${data}?api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        let newList = data.slice(0, 5);
        setPlayerData((previous) => ({
          ...previous,
          mastery: newList,
        }));
      });
  };
  const fetchActiveGame = (data) => {
    fetch(
      `https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${data}?api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        let activeGameData = data;
        setPlayerData((previous) => ({
          ...previous,
          activeGameData: activeGameData,
        }));
      })
      .catch((err) => {
        setPlayerData((previous) => ({
          ...previous,
          activeGameData: "No Active Game",
        }));
        console.log("no active game");
      });
  };
  const displayMastery = () => {
    if (playerData.mastery) {
      return playerData.mastery.map((champData) => (
        // console.log(champData)
        <div className="champ" key={champData.championId}>
          <img
            src={
              "https://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/" +
              champIdToName[champData.championId] +
              ".png"
            }
            alt=""
            className="champImageMastery"
          />
          <p>{"Mastery " + champData.championLevel}</p>
          <p>{champData.championPoints.toLocaleString()}</p>
        </div>
      ));
    }
  };

  console.log(playerData);
  return (
    <div className="App">
      <div className="container">
        <div className="nav">
          <div className="title">
            <h1>LoL</h1>
            <h1 className="light">ytics</h1>
          </div>
          <div className="search">
            <input
              type="text"
              onChange={(e) => setSummonerName(e.target.value)}
              placeholder="Search..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  getGeneralData();
                } else {
                  return;
                }
              }}
            />
            <FontAwesomeIcon
              icon={faSearch}
              onClick={() => {
                getGeneralData();
              }}
              className="faSearch"
            />
          </div>
        </div>
        <div className="profileDisplay">
          <h1>{playerData.name}</h1>
          <div className="playerIconDiv">
            {playerData.name ? (
              <>
                <img src={getProfileIcon()} className="playerIcon" alt="" />
                <p>{playerData.summonerLevel}</p>
              </>
            ) : (
              <div></div>
            )}
          </div>
          {playerData.activeGameData === "No Active Game" ||
          !playerData.activeGameData ? (
            <span className="active">In-Game</span>
          ) : (
            <span className="active active-true">In-Game</span>
          )}
        </div>
        <div className="allBottoms">
          <div className="aBottomContainer firstRowDivs">
            <div className="bottomDivTitle">
              <h1>RANKED STATS</h1>
            </div>
            <div className="rankedRow">
              <div className="rankedIndi">
                {playerData.rankedInfo ? (
                  <>
                    <h2>SOLO</h2>
                    <DisplaySoloRank playerData={playerData} />
                  </>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="rankedIndi">
                {playerData.rankedInfo ? (
                  <>
                    <h2>FLEX</h2>
                    <DisplayFlexRank playerData={playerData} />
                  </>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
          <div className="aBottomContainer firstRowDivs">
            <div className="bottomDivTitle">
              <h1>MASTERY LIST</h1>
            </div>
            <div className="masteryData">{displayMastery()}</div>
          </div>
          <div className="aBottomContainer secondRowDivs">
            <div className="bottomDivTitle">
              <h1>BLUE SIDE</h1>
            </div>
            <div className="bottomLiveGame">
              {!playerData.activeGameData ? (
                <h1 className="noLiveGame">Please enter a summoner name</h1>
              ) : (
                <DisplayLiveGame playerData={playerData} />
              )}
            </div>
          </div>
          <div className="aBottomContainer secondRowDivs">
            <div className="bottomDivTitle">
              <h1>RED SIDE</h1>
            </div>
            <div className="bottomLiveGame">
              {!playerData.activeGameData ? (
                <h1 className="noLiveGame">Please enter a summoner name</h1>
              ) : (
                <DisplayLiveGameRedSide playerData={playerData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
