// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
//                                                         
const fs = require('fs');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { config } = require("./api/keys");

// // Read API Keys/Endpoints
// eval(fs.readFileSync(`./keys.js`)+'');

// // Api Keys
// const config = {
//   halo: {
//       desc: 'ocp-apim-subscription-key',
//       key: 'f4bfe0061ba84032b87aeb1c00600dc3'
//   }
// }

// ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
//                                                                           
function getPlayer(gamertag) {
  let data = null;
  let xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      let res = JSON.parse(this.responseText);
      let player = res.Results[0];
      console.log(player.Id);
      graphQuery(player);
    }
  });
  xhr.open("GET", "https://www.haloapi.com/stats/h5/servicerecords/arena?players=" + gamertag);
  xhr.setRequestHeader(config.halo.desc, config.halo.key);
  xhr.send(data);
}

let schema = buildSchema(`
  type HighestCsrAttainedType {
    Tier: Int,
    DesignationId: Int,
    Csr: Int,
    PercentToNextTier: Int,
    Rank: Int
  }

  type StatsType {
    TotalKills: Int,
    TotalHeadshots: Int,
    TotalMeleeKills: Int,
    TotalAssassinations: Int,
    TotalGroundPoundKills: Int,
    TotalShoulderBashKills: Int,
    TotalPowerWeaponKills: Int,
    TotalDeaths: Int,
    TotalAssists: Int,
    TotalGamesCompleted: Int,
    TotalGamesWon: Int,
    TotalGamesLost: Int,
    TotalGamesTied: Int,
    TotalGrenadeKills: Int
    TotalSpartanKills: Int,
  }

  type Query {
    Gamertag: String,
    Xp: Int,
    SpartanRank: Int,
    HighestCsrAttained(
      Tier: Int,
      DesignationId: Int,
      Csr: Int,
      PercentToNextTier: Int,
      Rank: Int
    ): HighestCsrAttainedType,
    Stats(
      TotalKills: Int,
      TotalHeadshots: Int,
      TotalMeleeKills: Int,
      TotalAssassinations: Int,
      TotalGroundPoundKills: Int,
      TotalShoulderBashKills: Int,
      TotalPowerWeaponKills: Int,
      TotalDeaths: Int,
      TotalAssists: Int,
      TotalGamesCompleted: Int,
      TotalGamesWon: Int,
      TotalGamesLost: Int,
      TotalGamesTied: Int,
      TotalGrenadeKills: Int,
      TotalSpartanKills: Int,
    ) : StatsType,
    TotalTimePlayed: String
  }
`);

function graphQuery(player) {
  
  let root = {
     Gamertag: () => player.Result.PlayerId.Gamertag,
     Xp: () => player.Result.Xp,
     SpartanRank: () => player.Result.SpartanRank,
     HighestCsrAttained: {
      Tier: () => player.Result.ArenaStats.HighestCsrAttained.Tier,
      DesignationId: () => player.Result.ArenaStats.HighestCsrAttained.DesignationId,
      Csr: () => player.Result.ArenaStats.HighestCsrAttained.Csr,
      PercentToNextTier: () => player.Result.ArenaStats.HighestCsrAttained.PercentToNextTier,
      Rank: () => player.Result.ArenaStats.HighestCsrAttained.Rank,
     },
     Stats: {
      TotalKills: () => player.Result.ArenaStats.TotalKills,
      TotalHeadshots: () => player.Result.ArenaStats.TotalHeadshots,
      TotalMeleeKills: () => player.Result.ArenaStats.TotalMeleeKills,
      TotalAssassinations: () => player.Result.ArenaStats.TotalAssassinations,
      TotalGroundPoundKills: () => player.Result.ArenaStats.TotalGroundPoundKills,
      TotalShoulderBashKills: () => player.Result.ArenaStats.TotalShoulderBashKills,
      TotalPowerWeaponKills: () => player.Result.ArenaStats.TotalPowerWeaponKills,
      TotalDeaths: () => player.Result.ArenaStats.TotalDeaths,
      TotalAssists: () => player.Result.ArenaStats.TotalAssists,
      TotalGamesCompleted: () => player.Result.ArenaStats.TotalGamesCompleted,
      TotalGamesWon: () => player.Result.ArenaStats.TotalGamesWon,
      TotalGamesLost: () => player.Result.ArenaStats.TotalGamesLost,
      TotalGamesTied: () => player.Result.ArenaStats.TotalGamesTied,
      TotalGrenadeKills: () => player.Result.ArenaStats.TotalGrenadeKills,
      TotalSpartanKills: () => player.Result.ArenaStats.TotalSpartanKills,
     },
     TotalTimePlayed: () => player.Result.ArenaStats.TotalTimePlayed,
  };

  let app = express();
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));
  app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
}

getPlayer("NicmeisteR");