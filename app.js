const express = require("express");
const http = require("http");
const app = express();
const path = require('path');
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server);
const moment = require("moment");

app.use(express.static(path.join(__dirname, "src"))) //__dirname이 프로젝트 폴더 가리킴
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`test PORT ${PORT}`));

io.on("connection", (socket)=>{
    socket.on("mychat", (data)=>{
        const {name ,msg} = data;
        io.emit("mychat", {
            name : name,
            msg : msg,
            time : moment(new Date()).format("HH:mm:ss")
        });
    })
})