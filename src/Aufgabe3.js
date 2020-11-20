DatasystemHandler = require("./DatasystemHandler.js");
StrategyTesting = require("./StrategyTesting.js");

var spielstaerkenFileId = 3;
var StrategyTestingIterations = 100000;

DatasystemHandler.readPlayersFile(spielstaerkenFileId).then(function(players){
    console.log("players: ")
    console.log(players);

    //new LigaCompetition(players);
    //new KOCompetition(players, "random");
    //new KOCompetition(players, "random", 5, true);
    console.log("Liga Strategie: ");
    new StrategyTesting.LigaStrategyTester(players).run(StrategyTestingIterations);

    console.log("============= \n");

    console.log("KO Strategie: ");
    new StrategyTesting.KOStrategyTester(players, "random", 1).run(StrategyTestingIterations);

    console.log("============= \n");

    console.log("K.O x 5 Strategie: ");
    new StrategyTesting.KOStrategyTester(players, "random", 5).run(StrategyTestingIterations);
});

