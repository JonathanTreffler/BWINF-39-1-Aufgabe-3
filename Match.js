NumberGenerator = require("./RandomNumberGenerator.js");

class Match {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    run() {
        let combinedStrength = this.player1.strength + this.player2.strength;

        let randomNumber = NumberGenerator.getRandomInt(1,combinedStrength+1);

        if(randomNumber <= this.player1.strength) {
            this.winner = this.player1;
            //console.log("Winner is Player with id "+ this.player1.id);
            return 1;
        } else {
            this.winner = this.player2;
            //console.log("Winner is Player with id "+ this.player2.id);
            return 2;
        }
    }
}

module.exports = Match;