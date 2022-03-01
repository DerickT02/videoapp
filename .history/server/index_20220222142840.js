import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2'
import cors from 'cors'



dotenv.config()
const app = express();
app.use(express.json())
app.use(cors())

const dbconnection = mysql.createConnection({
    host: 'database',
    user: 'root',
    database: 'videoappdb',
    port: 3306
})

dbconnection.connect(function(err){
    if(err) throw err;
    console.log("Connected to db");
})

app.get('/', (req, res) => {
    res.send("Hello Backend")
    
})

app.listen(process.env.DOCKER_PORT, ()=>{
    console.log("connected")
})