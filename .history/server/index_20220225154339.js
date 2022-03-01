import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2'
import cors from 'cors'
import userRoutes from './routes/routes.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'


dotenv.config() 

const app = express();
app.use(express.json())

app.options('*', cors())
app.use(cors({
    origin: "http://localhost:7000/",
    methods: ["GET", "POST"],
    credentials: true
}))

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
    key: "user",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24
    },
    
}))

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
app.listen(5000, ()=>{
    console.log("connected")
})