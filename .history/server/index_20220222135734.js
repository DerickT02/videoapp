import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2'



dotenv.config()
const app = express();
app.use(express.json())

const dbconnection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT
})

dbconnection.connect(function(err){
    if(err) throw err;
    console.log("Connected to db")
})

app.get('/', (req, res) => {
    res.send("Hello Backend")
    
})

app.listen(process.env.DOCKER_PORT, ()=>{
    console.log("connected")
})