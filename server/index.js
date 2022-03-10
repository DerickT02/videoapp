import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2'
import cors from 'cors'
import userRoutes from './routes/routes.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { Server } from 'socket.io'
import http from 'http'
import { ExpressPeerServer } from 'peer';
import { SocketAddress } from 'net';


dotenv.config() 

const app = express();
const peerServer = express();
app.use(express.json())




app.use(cors({
    origin: ["http://localhost:7000", "http://localhost:8000"],
    methods: ["GET", "POST"],
    credentials: true
}))

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

const expressSession = session({
    key: "user",
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: Date.now() + (30 * 86400 * 1000),
    },
    maxAge: Date.now() + (30 * 86400 * 1000)
    
})

app.use(expressSession)

export const dbconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Verycool19',
    port: 3306,
    database: 'videoappdb'
    

})


dbconnection.connect(function(err){
    if(err) throw err;
    console.log("Connected to db");
})

app.get('/', (req, res) => {
    res.send("Hello Backend")
    
})
app.use('/', userRoutes)


let server = http.createServer(peerServer)
let appserver = http.createServer(app)

const io = new Server(appserver, {
    cors: {
      origin: "http://localhost:7000",
      methods: ["GET", "POST"],
      credentials: true
    }
  })



io.on('connection', (socket) => {
    
  socket.on('join-room', data => {
      console.log(`Someone has joined ${data.roomName}`)
      socket.join(data.roomName)
      
  })
 
    socket.on('send-id', (data) => {
        
        socket.join(data.room)
        console.log(socket.rooms)
        console.log(`${data.id} has joined ${data.room}`)
        socket.broadcast.to(data.room).emit('receive-id', data.id)
        
        
    })

    socket.on('disconnect', () => {
       socket.broadcast.emit('user-disconnected')
    })
})


appserver.listen(5000, ()=>{
    console.log("connected")
})

peerServer.use('/', ExpressPeerServer(server, {debug: true, allow_discovery: true}))

server.listen(3000, () => {
    console.log("connected to peer")
}) 