import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2'
import cors from 'cors'
import userRoutes from './routes/routes'


dotenv.config()

const app = express();
app.use(express.json())

app.use(cors())

export const dbconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Verycool19',
    port: 3306
    

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