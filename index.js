/**
 * Created by adaror on 22/04/2017.
 */
var player = require("./player");
var http = require("http");

http.createServer(function(req,res){
    var player1 = new player.instance('Arik');
    player1.addMedals(5);
    player1.addBaskets(14);
    player1.removeMedals(3);
    player1.removeMedals(6);
    res.writeHeader(200,{'Content-type':'text/plain'});
    res.write(player.messages);
    res.end();
}).listen(8088);

console.log('Listening on port 8088...');


