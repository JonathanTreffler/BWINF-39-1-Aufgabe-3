LigaCompetition = require("./LigaCompetition.js");
KOCompetition = require("./KOCompetition.js");

class StrategyTester {
    constructor(players) {
        this.bestPlayer = this.getBestPlayer(players);

        this.bestPlayerWon = 0;
    }
    getBestPlayer(players) {
        let sortedPlayers = players.sort(function(firstEl, secondEl) {
            return secondEl.strength - firstEl.strength;
        });

        return sortedPlayers[0];
    }
    run(iterations) {
        this.iterations = iterations || 10;

        for(let i = 0; i < this.iterations; i++) {
            this.iteration();
        }

        this.result();
    }
    result() {
        console.log("Der beste Spieler (", this.bestPlayer.id, ") gewann ", this.bestPlayerWon, " von ", this.iterations, " Spiele (",this.bestPlayerWon/this.iterations*100,"%) \n");
    }
}

class LigaStrategyTester extends StrategyTester {
    constructor(players) {
        super(players);

        this.players = players;
    }
    iteration() {
        let competition = new LigaCompetition(this.players, true);

        if(competition.winner.id == this.bestPlayer.id) {
            this.bestPlayerWon++;
        }
    }
}

class KOStrategyTester extends StrategyTester {
    constructor(players, CompetitionPlan, roundsPerMatch) {
        super(players);

        this.players = players;
        this.CompetitionPlan = CompetitionPlan;
        this.roundsPerMatch = roundsPerMatch;
    }
    iteration() {
        let competition = new KOCompetition(this.players, this.CompetitionPlan, this.roundsPerMatch, true);

        if(competition.winner.id == this.bestPlayer.id) {
            this.bestPlayerWon++;
        }
    }
}

module.exports = { LigaStrategyTester, KOStrategyTester };