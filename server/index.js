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


dotenv.config() 

const app = express();
app.use(express.json())




app.use(cors({
    origin: "http://localhost:7000",
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


const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:7000',
        methods: ['GET', 'POST']
    } 
})

io.use(function(socket, next){
    expressSession(socket.request, socket.request.res || {}, next)
})

io.on("connection", (socket) => {
    socket.request.session
    console.log("connected to video server")
    socket.on('join-room', async (data) => {
        socket.join(data)
        console.log(`${data.user} has joined room ${data.roomName}`)
    })

    socket.on('leave-room', async (data) => {
        socket.leave(data)
        console.log(`${data.user} has left room ${data.roomName}`)
    })
})

server.listen(5000, ()=>{
    console.log("connected")
})