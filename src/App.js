import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./App.css";

function App() {
  const champIdToName = {};
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
  const API_KEY = "RGAPI-b73d73d8-1eed-44be-a877-21cc39c0cdf2";
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

  // const getProfileIcon = () => {
  //   if (playerData.profileIconId === 0) {
  //     return "";
  //   } else {
  //     return `http://ddragon.leagueoflegends.com/cdn/12.16.1/img/profileicon/${playerData.profileIconId}.png`;
  //   }
  // };
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
  console.log(playerData);
  function getChampIconUrl(championId) {
    fetch(
      "http://ddragon.leagueoflegends.com/cdn/12.16.1/data/en_US/champion.json"
    )
      .then((response) => response.json())
      .then((data) => {
        let fullArray = data.data;
        console.log("hi");
        let findByKey = (matchKey) =>
          Object.entries(fullArray.data).find(
            ([key, value]) => value.key === matchKey
          );
        console.log("hi");
        console.log(findByKey("202"));
      });
  }

  // OMG LETS SEE IF THE CHANGES HAPPENED IN MY DESKTOP
  // const secondBarDisplay = () => {
  //   if (playerData.id) {
  //   }
  // };

  const renderChampImage = (champData) => {
    return (
      <img
        // src={getChampName(champData.championId)}
        src={
          "https://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/" +
          getChampIconUrl(champData.championId) +
          ".png"
        }
        alt=""
        className="champImage"
      />
    );
  };

  const displayMastery = () => {
    if (playerData.mastery) {
      return playerData.mastery.map((champData) => (
        // console.log(champData)
        <div className="champ" key={champData.championId}>
          {renderChampImage(champData)}
          <p>{"Mastery " + champData.championLevel}</p>
          <p>{champData.championPoints.toLocaleString()}</p>
        </div>
      ));
    }
  };

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
          {playerData.activeGameData === "No Active Game" ||
          !playerData.activeGameData ? (
            <span className="active">In-Game</span>
          ) : (
            <span className="active active-true">In-Game</span>
          )}
        </div>
        <div className="bottom">
          <div className="topLeft">
            <div className="masteryTitle">Mastery List</div>
            <div className="masteryData">{displayMastery()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
