import { dbconnection } from '../index.js'




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
    


        dbconnection.query('INSERT INTO USER (username, email, password) VALUES(?, ?, ?)', [username, email, password], (err, result) => {
            if(err) throw err;
            res.send({username: username, password: password, email: email})
        })
    
}

export const login = async (req, res) => {
    const {email, password, username} = req.body
    dbconnection.query('SELECT * FROM USER WHERE email = ? AND username = ?', [email, username], (err, result) => {
        
        if(err) throw err;
        if(result.length > 0){
            
                if(password === result[0].password){
                    req.session.user = result
                   
                    console.log(req.session)
                   
                    res.send(result)
                }
                else{
                    res.send('Wrong email/password')
                }
            
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

export const logout = async (req, res) => {
    if(req.session.user){
        req.session.destroy()
    }
}

export const getRooms = async (req, res) => {
    if(!req.session.user){
        res.send({message: "You are not authorized to do that"})
    }
    else{
        dbconnection.query("SELECT * FROM ROOM", (err, result) => {
            if(err) throw err;
            res.send(result)
        })
    }
}

export const createRooms = async (req, res) => {
    const {roomName, creator} = req.body
    if(!req.session.user){
        res.send({message: "You are not authorized to do that"})
    }
    else{
        dbconnection.query("INSERT INTO ROOM (roomName, creator) VALUES(?, ?)", [roomName, creator], (err, result) => {
            if(err) throw err;
            res.send("Successfully Created Room")
        })
    }
}

