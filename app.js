
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

// Socket.io server listens to our app
var io = require('socket.io').listen(server);
const CLOUD_EVENT="door_open";
const eventList = require('./event-list.json');

io.on('connection', function(socket) {
    socket.on('clientmessage', function (data) {
        const messageIndex=Math.floor(Math.random() * 10); 
        let message= eventList[messageIndex]
        if(message.type==CLOUD_EVENT){
            io.emit('cloudMessage', message);
        }else{
            io.emit('edgeMessage', message);
        }
    });
});

app.get('/', (req, res) => {
    res.send({"message":"hello world"});
});

server.listen(3001);