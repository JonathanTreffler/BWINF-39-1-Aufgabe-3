Match = require("./Match.js");
Helpers = require("./Helpers.js");
Competition = require("./Competition.js");

class LigaCompetition extends Competition {
    constructor(players, silent) {
        super();

        this.players = players;
        this.silent = silent;

        this.playerWins = new Map();

        for(let player in players) {
            this.playerWins.set(parseInt(player), 0);
        }

        this.log(this.playerWins);

        this.run();
    }
    run() {
        for(let player1Id = 0; player1Id < this.players.length; player1Id++) {
            for(let player2Id = player1Id+1; player2Id < this.players.length; player2Id++) {

                let player1 = this.players[player1Id];
                let player2 = this.players[player2Id];
                
                this.log(player1.id + " gegen " + player2.id);

                let match = new Match.DefaultMatch(player1, player2);
                let matchResult = match.run();

                this.playerWins.set(matchResult.winner.id, this.playerWins.get(matchResult.winner.id) + 1);
            }
        }
        this.log(this.playerWins);

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
        this.log(sortedPlayerWins);

        this.winner = {id: sortedPlayerWins[0][0], wins: sortedPlayerWins[0][1]};
        
        this.log("Der Gewinner ist Spieler "+ this.winner.id + " mit " + this.winner.wins + " gewonnenen Spielen");
    }
}

module.exports = LigaCompetition;