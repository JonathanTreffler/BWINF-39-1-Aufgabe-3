NumberGenerator = require("./RandomNumberGenerator.js");

class DefaultMatch {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    run() {
        let combinedStrength = this.player1.strength + this.player2.strength;

        let randomNumber = NumberGenerator.getRandomInt(1,combinedStrength+1);

        if(randomNumber <= this.player1.strength) {
            this.winner = this.player1;
            return {winner: this.player1 };
        } else {
            this.winner = this.player2;
            return {winner: this.player2 };
        }
    }
}

class MatchMultipleRounds {
    constructor(player1, player2, rounds) {
        this.player1 = player1;
        this.player2 = player2;
        this.rounds = parseInt(rounds) || 1;

        this.player1Wins = 0;
        this.player2Wins = 0;
    }

    run() {
        for(let i = 0; i < this.rounds; i++) {
            let roundResult = this.round();

            if(roundResult == 1) {
                this.player1Wins++;
            } else if(roundResult == 2) {
                this.player2Wins++;
            }
        }
        //console.log(this.player1Wins, this.player2Wins);

        if(this.player1Wins === this.player2Wins) {
            console.log("ACHTUNG: Gleichstand im Match; Gerade Rundenzahlen sind nicht empfohlen");
            let winRatio = this.player1Wins/this.rounds;
            return {winner: this.player1, winRatio, wins:  this.player1Wins};

        } else if(this.player1Wins > this.player2Wins) {
            let winRatio = this.player1Wins/this.rounds;
            return {winner: this.player1, winRatio, wins:  this.player1Wins};

        } else {
            let winRatio = this.player2Wins/this.rounds;
            return {winner: this.player2, winRatio, wins:  this.player2Wins};
        }
    }

    round() {
        let combinedStrength = this.player1.strength + this.player2.strength;

        let randomNumber = NumberGenerator.getRandomInt(1,combinedStrength+1);

        if(randomNumber <= this.player1.strength) {
            return 1;
        } else {
            return 2;
        }
    }
}

module.exports = { DefaultMatch, MatchMultipleRounds };