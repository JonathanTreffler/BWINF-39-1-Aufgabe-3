DatasystemHandler = require("./DatasystemHandler.js");
Competition = require("./Competition.js");

var spielstaerkenId = 3;

DatasystemHandler.readPlayersFile(spielstaerkenId).then(function(players){
    console.log(players);

    new Competition.LigaCompetition(players);
});

