const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs')
const app = express();
const cors = require('cors')
const {addUser, getRoomFromSocketId, removeFromUsers, howManyUsers, getNameFromSocketId} = require('./Current')

const User = require('./User')

app.use(cors())
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//       'Access-Control-Allow-Methods',
//       'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//     );
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });
// const server = https
//     .createServer({
//         key: fs.readFileSync('server.key'),
//         cert: fs.readFileSync('server.pem')
//     }, app)
//     .listen(9080);

const server = app.listen(9080)

const io = require('./socket').init(server);

io.on('connection', socket => {

    socket.on('sendImage', image => {
        socket.broadcast.to(getRoomFromSocketId(socket.id)).emit('receiveImage', image)
    });

    socket.on('sendText', (text) => {
        socket.broadcast.emit('receiveText', message={text, user: getNameFromSocketId(socket.id)})
    })

    socket.on('join', ({nameValue, roomValue}, callback) => {
        try{
            const user = new User(socket.id, nameValue, roomValue)
            addUser(user)
            socket.join(roomValue)
            callback(null)
        } catch(error){
            callback(error)
        }
    })
  
    socket.on('disconnect', () => {
        console.log('Disconecting user ' + socket.nameValue)
        removeFromUsers(socket.id)
        console.log('Number of users connected' + howManyUsers())
    });
});





