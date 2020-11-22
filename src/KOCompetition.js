Competition = require("./Competition.js");

class KOCompetition extends Competition {
    constructor(players, CompetitionPlan, roundsPerMatch, silent) {
        super();

        this.players = players;
        this.CompetitionPlan = CompetitionPlan;
        this.roundsPerMatch = parseInt(roundsPerMatch) || 1;
        this.silent = silent;

        this.matchesRun = 0;

        this.run();
    }
    run() {
        this.log(this.players);

        switch(this.CompetitionPlan) {
            case "random":
                this.randomPlan();
                break;
            case "id":
                this.idPlan();
                break;
            case "reverse-id":
                this.ReverseIdPlan();
                break;
        }

        this.round(this.players, 1);
    }
    randomPlan() {
        // Shuffle players
        Helpers.shuffleArray(this.players);
    }
    idPlan() {
        // sort by Id
        this.players = this.players.sort(function(firstEl, secondEl) {
            return firstEl.id - secondEl.id;
        });
    }
    ReverseIdPlan() {
        // sort by Id
        this.players = this.players.sort(function(firstEl, secondEl) {
            return secondEl.id - firstEl.id;
        });
    }
    round(players, roundNumber) {
        this.log("\n START RUNDE ", roundNumber);
        this.log("Teilnehmer der Runde:");
        this.log(players);

        let WinnersInThisRound = [];
        
        // run a match with every pair of players
        for(let i = 0; i < players.length; i = i+2) {
            
            let player1 = players[i];
            let player2 = players[i+1];

            let match = new Match.MatchMultipleRounds(player1, player2, this.roundsPerMatch);
            let matchResult = match.run();
            this.matchesRun += this.roundsPerMatch;

            this.log("Spieler ", player1.id, " gegen ", player2.id);

            WinnersInThisRound.push(matchResult.winner);
            this.log("   ==> Spieler ", matchResult.winner.id, " gewinnt (", matchResult.wins, " von ", this.roundsPerMatch, " = ", matchResult.winRatio*100, "% Spiele gewonnen ) \n");
        }

        this.log("Gewinner dieser Runde:")
        this.log(WinnersInThisRound);

        if(WinnersInThisRound.length === 1) {
            this.winner = WinnersInThisRound[0];
            this.log("** Gesammtgewinner ist Spieler ", this.winner.id, " **");
        } else {
            // recursively run next round
            this.round(WinnersInThisRound, roundNumber+1);
        }
    }
}

module.exports = KOCompetition;