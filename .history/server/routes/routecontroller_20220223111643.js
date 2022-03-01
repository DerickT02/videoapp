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
    bcrypt.hash(password, saltRounds, (err, hash) => {


        dbconnection.query('INSERT INTO USER (username, email, password) VALUES(?, ?, ?)', [username, email, hash], (err, result) => {
            if(err) throw err;
            res.send("Successfully Registered")
        })
    })
}

export const login = async (req, res) => {
    const {email, password} = req.body
    dbconnection.query('SELECT * FROM USER WHERE email = ?', [email], (err, result) => {
        
        if(err) throw err;
        if(result.length > 0){
            bcrypt.compare(password, result[0].password, (err, response) => {
                if(response){
                    res.send(result)
                }
                else{
                    res.send('Wrong email/password')
                }
            })
        }
        else{
            res.send("User does not exist")
        }
    })
}


