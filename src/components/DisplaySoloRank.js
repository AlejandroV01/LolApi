import React from "react";
import BRONZE from "./Emblem_Bronze.png";
import CHALLENGER from "./Emblem_Challenger.png";
import DIAMOND from "./Emblem_Diamond.png";
import EMPTY from "./Emblem_Empty.png";
import GOLD from "./Emblem_Gold.png";
import GRANDMASTER from "./Emblem_Grandmaster.png";
import IRON from "./Emblem_Iron.png";
import MASTER from "./Emblem_Master.png";
import PLATINUM from "./Emblem_Platinum.png";
import SILVER from "./Emblem_Silver.png";
const DisplaySoloRank = ({ playerData }) => {
  let soloRank;
  let rankNum;
  if (playerData.rankedInfo.length === 0) {
    soloRank = "no rank";
  } else if (playerData.rankedInfo.length === 2) {
    soloRank = playerData.rankedInfo[1].tier;
    rankNum = playerData.rankedInfo[1].rank;
  } else if (playerData.rankedInfo[0].queueType === "RANKED_SOLO_5x5") {
    soloRank = playerData.rankedInfo[0].tier;
    rankNum = playerData.rankedInfo[0].rank;
  } else {
    soloRank = "no rank";
  }

  const switchFunction = () => {
    switch (soloRank) {
      case "BRONZE":
        return (
          <>
            <img src={BRONZE} alt="BRONZE" className="soloRank" />
            <p>
              {soloRank}
              {" " + rankNum}
            </p>
          </>
        );
      case "IRON":
        return (
          <>
            <img src={IRON} alt="IRON" className="soloRank" />
            <p>
              {soloRank}
              {" " + rankNum}
            </p>
          </>
        );
      case "SILVER":
        return (
          <>
            <img src={SILVER} alt="SILVER" className="soloRank" />
            <p>
              {soloRank}
              {" " + rankNum}
            </p>
          </>
        );
      case "GOLD":
        return (
          <>
            <img src={GOLD} alt="GOLD" className="soloRank" />
            <p>
              {soloRank}
              {" " + rankNum}
            </p>
          </>
        );
      case "PLATINUM":
        return (
          <>
            <img src={PLATINUM} alt="PLATINUM" className="soloRank" />
            <p>
              {soloRank}
              {" " + rankNum}
            </p>
          </>
        );
      case "DIAMOND":
        return (
          <>
            <img src={DIAMOND} alt="DIAMOND" className="soloRank" />
            <p>
              {soloRank}
              {" " + rankNum}
            </p>
          </>
        );
      case "MASTER":
        return (
          <>
            <img src={MASTER} alt="MASTER" className="soloRank" />
            <p>
              {soloRank}
              {" " + rankNum}
            </p>
          </>
        );
      case "GRANDMASTER":
        return (
          <>
            <img src={GRANDMASTER} alt="GRANDMASTER" className="soloRank" />
            <p>
              {soloRank}
              {" " + rankNum}
            </p>
          </>
        );
      case "CHALLENGER":
        return (
          <>
            <img src={CHALLENGER} alt="CHALLENGER" className="soloRank" />
            <p>
              {soloRank}
              {" " + rankNum}
            </p>
          </>
        );
      default:
        return <img src={EMPTY} alt="NO RANK" className="soloRank" />;
    }
  };

  return switchFunction();
};

export default DisplaySoloRank;
