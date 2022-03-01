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
            res.send({username: username, password: password, email: email})
        })
    })
}

export const login = async (req, res) => {
    const {email, password, username} = req.body
    dbconnection.query('SELECT * FROM USER WHERE email = ? AND username = ?', [email, username], (err, result) => {
        
        if(err) throw err;
        if(result.length > 0){
            bcrypt.compare(password, result[0].password, (err, response) => {
                if(response){
                    req.session.user = result
                    console.log(req.session.user)
                    res.send(req.session.user)
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

export const getLogin = async (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true, data: req.session.user})
    }
    else{
        res.send({loggedIn: false, data: null})
    }
}

