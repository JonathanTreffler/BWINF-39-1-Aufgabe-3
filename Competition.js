Match = require("./Match.js");
Helpers = require("./Helpers.js");

class LigaCompetition {
    constructor(players) {
        this.players = players;
        console.log(this.players);

        this.playerWins = new Map();

        for(let player in players) {
            this.playerWins.set(parseInt(player), 0);
        }

        console.log(this.playerWins);

        this.run();
    }
    run() {
        for(let player1Id = 0; player1Id < this.players.length; player1Id++) {
            for(let player2Id = player1Id+1; player2Id < this.players.length; player2Id++) {

                let player1 = this.players[player1Id];
                let player2 = this.players[player2Id];
                
                console.log(player1.id + " gegen " + player2.id);

                let match = new Match(player1, player2);
                let matchResult = match.run();

                this.playerWins.set(matchResult.id, this.playerWins.get(matchResult.id) + 1);
            }
        }
        console.log(this.playerWins);

        /*  rearrange from:
            Map {
                0 => 4,
                1 => 5,
            }
                
            to:
            [[ 0, 4 ],  [ 1, 5 ]]

            for very fast sorting
        */
        let sortedPlayerWins = [...this.playerWins.entries()].sort(function(firstEl, secondEl) {
            if(firstEl[1] != secondEl[1]) {
                // first Priority: won Games
                return secondEl[1] - firstEl[1];
            } else {
                //second priority: Player Id
                return firstEl[0] - secondEl[0];
            }
            
        });
        console.log(sortedPlayerWins);
        console.log("Der Gewinner ist Spieler "+ sortedPlayerWins[0][0] + " mit " + sortedPlayerWins[0][1] + " gewonnenen Spielen");
    }
}

class KOCompetition {
    constructor(players, CompetitionPlan) {
        this.players = players;
        this.CompetitionPlan = CompetitionPlan;

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
        // shuffle players
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

            let match = new Match(player1, player2);
            let matchResult = match.run();

            console.log("Spieler ", player1.id, " gegen ", player2.id);

            WinnersInThisRound.push(matchResult);
            console.log("   ==> Spieler ", matchResult.id, " gewinnt \n");
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

module.exports = { LigaCompetition, KOCompetition };