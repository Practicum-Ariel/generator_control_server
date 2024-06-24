const
    express = require('express'),
    app = express(),
    PORT = 3000,
    cors = require('cors')

const http = require('http')
const server = http.createServer(app)

const socketIO = require('socket.io')

const io = new socketIO.Server(server, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    console.log("connecting now:", socket.id);

    socket.on('openLive', (data) => {
        console.log(data);
        userBySocket.push({ socketId: socket.id, data: data });
        console.log(userBySocket.length)

    })

})


server.listen(PORT, () => console.log("### server is up ###")) 
