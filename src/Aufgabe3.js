DatasystemHandler = require("./DatasystemHandler.js");
StrategyTesting = require("./StrategyTesting.js");

var spielstaerkenFileId = 3;
var StrategyTestingIterations = 100000;

DatasystemHandler.readPlayersFile(spielstaerkenFileId).then(function(players){
    console.log("Spieler: ")
    console.log(players);
    console.log("\n");

    console.log("Liga Strategie: ");
    new StrategyTesting.LigaStrategyTester(players).run(StrategyTestingIterations);

    console.log("============= \n \n");

    console.log("KO Strategie (Zufällige Sortierung): ");
    new StrategyTesting.KOStrategyTester(players, "random", 1).run(StrategyTestingIterations);

    console.log("============= \n");

    console.log("K.O x 5 Strategie (Zufällige Sortierung): ");
    new StrategyTesting.KOStrategyTester(players, "random", 5).run(StrategyTestingIterations);

    console.log("============= \n");

    console.log("K.O x 501 Strategie (Zufällige Sortierung): ");
    new StrategyTesting.KOStrategyTester(players, "random", 501).run(StrategyTestingIterations);

    console.log("============= \n \n");

    console.log("KO Strategie (Sortierung nach Id): ");
    new StrategyTesting.KOStrategyTester(players, "id", 1).run(StrategyTestingIterations);

    console.log("============= \n");

    console.log("K.O x 5 Strategie (Sortierung nach Id): ");
    new StrategyTesting.KOStrategyTester(players, "id", 5).run(StrategyTestingIterations);

    console.log("============= \n");

    console.log("K.O x 501 Strategie (Sortierung nach Id): ");
    new StrategyTesting.KOStrategyTester(players, "id", 501).run(StrategyTestingIterations);
});

