class KOCompetition {
    constructor(players, CompetitionPlan, roundsPerMatch) {
        this.players = players;
        this.CompetitionPlan = CompetitionPlan;
        this.roundsPerMatch = parseInt(roundsPerMatch) || 1;

        this.run();
    }
    run() {
        console.log(this.players);

        if(this.CompetitionPlan === "random") {
            this.randomPlan();
        }

        this.round(this.players, 1);
    }
    randomPlan() {
        // Shuffle players
        Helpers.shuffleArray(this.players);
    }
    round(players, roundNumber) {
        console.log("\n START RUNDE ", roundNumber);
        console.log("Teilnehmer der Runde:");
        console.log(players);

        let WinnersInThisRound = [];
        
        // run a match with every pair of players
        for(let i = 0; i < players.length; i = i+2) {
            
            let player1 = players[i];
            let player2 = players[i+1];

            let match = new Match.MatchMultipleRounds(player1, player2, this.roundsPerMatch);
            let matchResult = match.run();

            console.log("Spieler ", player1.id, " gegen ", player2.id);

            WinnersInThisRound.push(matchResult.winner);
            console.log("   ==> Spieler ", matchResult.winner.id, " gewinnt (", matchResult.wins, " von ", this.roundsPerMatch, " = ", matchResult.winRatio*100, "% Spiele gewonnen ) \n");
        }

        console.log("Gewinner dieser Runde:")
        console.log(WinnersInThisRound);

        if(WinnersInThisRound.length === 1) {
            console.log("** Gesammtgewinner ist Spieler ", WinnersInThisRound[0].id, " **");
        } else {
            // recursively run next round
            this.round(WinnersInThisRound, roundNumber+1);
        }
    }
}

module.exports = KOCompetition;