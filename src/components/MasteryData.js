
// const MasteryData = ({playerData, handleMastery}) => {


  

// const fetchMastry = () => {
//   let summonerID = playerData.id
//   let API_KEY = 'RGAPI-a0f390ea-8b09-428a-a99d-9c7f34d90fcd'
//   console.log(summonerID)
//   fetch(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerID}?api_key=${API_KEY}`)
//   .then(response => response.json())
//   .then(data => {
//     let newList = data.slice(0,5);
//     handleMastery(newList)
//   })
  
// }



//   return (
//     <div>
//       {playerData.name}
//       <button onClick={() => {
//         fetchMastry()
        
//       }}>Mastery</button>
//     </div>
    
//   )
// }

// export default MasteryData