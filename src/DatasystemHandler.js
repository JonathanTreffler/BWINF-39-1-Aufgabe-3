fs = require('fs');

Player = require("./Player.js");

function readPlayersFile(id) {
    return new Promise(function(resolve, reject) {
        fs.readFile('../data/spielstaerken' + id + ".txt", 'utf8', function (err,data) {
            if (err) {
                reject(err);
            }

            let fileRows = data.split(/\r?\n/);

            let players = [];

            for (let row in fileRows) {
                let content = fileRows[row];
                if(row > 0 && content != "") {
                    players.push(new Player(row-1, parseInt(content)));
                }
            }

            resolve(players);
        });
    });
}

module.exports = { readPlayersFile };