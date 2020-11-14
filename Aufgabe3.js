DatasystemHandler = require("./DatasystemHandler.js");
Match = require("./Match.js");

var spielstaerkenId = 2;

DatasystemHandler.readPlayersFile(spielstaerkenId).then(function(players){
    console.log(players);

    new Match(players[0], players[1]);
});

