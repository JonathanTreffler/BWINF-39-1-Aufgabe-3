DatasystemHandler = require("./DatasystemHandler.js");
LigaCompetition = require("./LigaCompetition.js");
KOCompetition = require("./KOCompetition.js");

var spielstaerkenId = 3;

DatasystemHandler.readPlayersFile(spielstaerkenId).then(function(players){
    console.log(players);

    //new LigaCompetition(players);
    //new KOCompetition(players, "random");
    new KOCompetition(players, "random", 5);
});

