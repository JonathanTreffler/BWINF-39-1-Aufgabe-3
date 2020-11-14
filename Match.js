NumberGenerator = require("./RandomNumberGenerator.js");

class Match {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;

        this.run();
    }

    run() {
        let combinedStrength = this.player1.strength + this.player2.strength;

        let randomNumber = NumberGenerator.getRandomInt(1,combinedStrength+1);

        console.log(randomNumber);

        if(randomNumber <= this.player1.strength) {
            this.winner = this.player1;
            console.log("Winner is Player with id "+ this.player1.id);
        } else {
            this.winner = this.player2;
            console.log("Winner is Player with id "+ this.player2.id);
        }
    }
}

module.exports = Match;