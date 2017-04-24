/**
 * Created by adaror on 22/04/2017.
 */
var player = require("./player");
var http = require("http");

http.createServer(function(req,res){
    let player1 = new player.instance('Arik');
    player1.addMedals(5);
    player1.addBaskets(14);
    let player2 = new player.instance('Or');
    player1.removeMedals(3);
    player1.removeMedals(6);
    player2.addMedals(3);
    player2.addBaskets(10);
    player2.addBaskets(15);
    player1.removeBaskets(30);
    player2.removeBaskets(1);
    res.writeHeader(200, {'Content-type':'text/html'});
    res.write(player.messages);
    res.end('success');
}).listen(8088);

console.log('Listening on port 8088...');


