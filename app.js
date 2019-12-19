const http = require('http');

// function reqListner(req, res){

// }

// http.createServer(reqListner);
// or

const server = http.createServer((req, res)=>{
    // console.log(req)
    console.log(req.url, req.method, req.headers);
    res.setHeader('content-type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my node.js server</h1></body>')
    res.write('</html>');
    res.end();
    // process.exit();
})

server.listen(3000);