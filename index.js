const { log } = require('console');
const express = require('express');
const http = require('http')
const { Server } = require("socket.io");
const app = express()
const PORT = 3020;


const server = http.createServer(app)


const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html')
})

io.on('connection', (socket) => {

    //broadcst on emit
    socket.emit('user connected', `welcome ${socket.id}`)
    socket.broadcast.emit('user connected', `${socket.id} connected`)
    socket.on('disconnect', () => {
        socket.broadcast.emit('user connected', 'user disconnected')
    })

    socket.on('chat message', (msg) => {
        this.id == socket.id;

        var messageFormat = {
            'message': msg,
            'time': new Date().getSeconds(),
            'sender': socket.id
        }
        io.emit('chat message', messageFormat)
    })


})
server.listen(PORT, () => {
    console.log(`server now running on port ${PORT}`)
})