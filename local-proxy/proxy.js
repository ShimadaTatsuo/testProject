var http = require('http'),
    httpProxy = require('http-proxy');

var php = new httpProxy.createProxyServer({
    target:{
        host: 'localhost',
        port: 9001
    }
});

var js = new httpProxy.createProxyServer({
    target:{
        host: 'localhost',
        port: 3001
    }
});

var server = http.createServer(function(req, res) {
    var hostname = req.headers.host.split(":")[0];
        php.web(req, res);
});

server.listen(80, function(){
    process.setuid(1000);
});

server.on('error', function(e, res){
    console.log(e);
});

console.log('node proxy start ---');

php.on('error', function(err, req, res) {
    res.end();
});

js.on('error', function(err, req, res) {
    res.end();
});

