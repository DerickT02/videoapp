import { dbconnection } from '../index.js'



export const getUsers = async (req, res) => {
    try{
    dbconnection.query('SELECT * FROM USER', (err, result, fields) => {
        if(err) throw err;
        res.send(result)
    })
    }
    catch (err){
        res.send(err)
    }
}