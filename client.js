const fs = require('fs');
var request = require('request');

function writeToJS(data, dir, name){
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFile(`${dir}/${name}`, data, (err) => {
        // Throw Error in Case of issues.
        if (err) throw err;
    });
};

var headers = {
    'Content-Type': 'application/json'
};

let Int = 0;

// Sample of Queries
let queryobject = {
    Gamertag: String,
    Xp: Int,
    SpartanRank: Int,
    HighestCsrAttained: {
      Tier: Int,
      DesignationId: Int,
      Csr: Int,
      PercentToNextTier: Int,
      Rank: Int
    },
    Stats: {
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
    },
    TotalTimePlayed: String
}

var dataString = {
    "query": 
        `{ 
            Gamertag, 
            HighestCsrAttained {Csr, Rank},
            Stats { TotalKills, TotalDeaths} 
        } 
`};

var options = {
    url: 'http://localhost:4000/graphql',
    method: 'POST',
    headers: headers,
    body: JSON.stringify(dataString)
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
        writeToJS(body, "response", `getPlayer.json`)
    }
}

request(options, callback);
