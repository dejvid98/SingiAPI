const http = require('http');
const app = require('./app');

const port = process.env.PORT || 1313;

const server = http.createServer(app);

server.listen(port,()=>{
    console.log("Server is starting up...")
});