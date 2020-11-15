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

                let match = new Match.DefaultMatch(player1, player2);
                let matchResult = match.run();

                this.playerWins.set(matchResult.winner.id, this.playerWins.get(matchResult.winner.id) + 1);
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

module.exports = LigaCompetition;