const http = require('http');
const routes = require('./routes');
// function reqListner(req, res){

// }

// http.createServer(reqListner);
// or

const server = http.createServer(routes);

server.listen(3000);