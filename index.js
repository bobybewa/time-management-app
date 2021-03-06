const express = require('express')
const app = express()
const http = require('http').createServer(app)
// const io = require('socket.io')(http)
const cors = require('cors')
const port = process.env.PORT || 8000

const io = require("socket.io")(http, {
    cors: {
        origin: "https://time-management-by-boby.web.app/",
    }
});

io.on('connection', socket => {
    socket.on('message', ({name, message}) => {
        console.log(name,message, "<<<");
        io.emit('message', {name, message})
    })

    socket.on("disconnect", () => {
        console.log(socket.id,'socket id keluar');
    })
})
app.get('/', (req,res) => {
    res.send('welcome')
})
app.use(cors())
http.listen(port, () => {
    console.log(`listening on ${port}`);
})