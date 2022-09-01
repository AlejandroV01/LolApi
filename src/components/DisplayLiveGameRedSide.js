import React from "react";

const DisplayLiveGameRedSide = ({ playerData }) => {
  const getProfileIcon = (profileIconId) => {
    if (playerData.profileIconId === 0) {
      return "";
    } else {
      return `http://ddragon.leagueoflegends.com/cdn/12.16.1/img/profileicon/${profileIconId}.png`;
    }
  };

  const displayChampsInLiveGame = (arrayOfLiveGame) => {
    return arrayOfLiveGame.map((player) => (
      <div className="individualLivePlayer">
        <img
          src={getProfileIcon(player.profileIconId)}
          alt=""
          className="liveGameIcon"
        />
        <h2>{player.summonerName}</h2>
        <div className="summonerSpells">
          <p>{player.spell1Id}</p>
          <p>{player.spell2Id}</p>
        </div>
      </div>
    ));
  };
  if (playerData.activeGameData === "No Active Game") {
    return <h1>No Active Game</h1>;
  } else {
    let arrayOfLiveGameRedSide = playerData.activeGameData.participants.slice(
      5,
      11
    );
    return (
      <>
        <div className="redOverlay">
          <h1>{playerData.activeGameData.gameMode}</h1>
          <div className="champsInLiveGame">
            {displayChampsInLiveGame(arrayOfLiveGameRedSide)}
          </div>
        </div>
      </>
    );
  }
};

export default DisplayLiveGameRedSide;
