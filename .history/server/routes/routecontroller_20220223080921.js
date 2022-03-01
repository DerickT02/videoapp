import { dbconnection } from '../index.js'
import bcrypt from 'bcrypt'
const saltRounds = 10


export const getUsers = async (req, res) => {
    try{
    dbconnection.query('SELECT * FROM USER;', (err, result, fields) => {
        if(err) throw err;
        res.send(result)
    })
    }
    catch (err){
        res.send(err)
    }
}

export const register = async (req, res) => {
    const {username, email, password} = req.body
    try{
        dbconnection.query('INSERT INTO USER (username, email, password) VALUES(?, ?, ?)', [username, email, password], (err, result) => {
            if(err) throw err;
            res.send("Successfully Registered")
            res.send(result)
        })
    }
    catch(err){
        res.send(err)
    }
}

