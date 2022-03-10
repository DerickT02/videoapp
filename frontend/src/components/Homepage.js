import Axios from 'axios'
import {useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import './Homepage.css'
import { io } from 'socket.io-client';

function Homepage({currUser}){
    const [rooms, setRooms] = useState([])
    const currentUser = currUser
    const navigate = useNavigate()
    const logout = (e) => {
        e.preventDefault();
        Axios.get('http://localhost:5000/users/logout')
        setTimeout(function timeout(){
            window.location.reload(1);
          }, 1000)
      
    }

    const socket = io.connect('http://localhost:5000')

   const joinRoom = (roomName, user) => {
       const joinData = {roomName: roomName, user: user};
       socket.emit('join-room', joinData)
   }

   const createRoom = () => {
        return navigate('/createroom')
   }

    useEffect(() => {
        Axios.get('http://localhost:5000/rooms').then((res) => {
        setRooms(res.data)
        console.log(res.data)
        })
    }, [])




    return(
    <div className = "homepage">
    
    <div className = "nav-bar">
        <button onClick = {() => {createRoom()}}>Create Room</button> 
        <button id = "logout" onClick = {(e) => {logout(e)}}>Logout</button>
    </div>
    
        <h1>Hello {currentUser}</h1>
    <div className = "rooms-container">
        <div className = "rooms">
        {rooms.map((room) => {
            return(
                <div className = "room-card">
                    <div className = "room-title">
                    <h1>{room.roomName}</h1>
                    
                    </div>

                    <h2>{room.creator}</h2>
                    <div className = "room-button">
                    <Link to = {`/room/${room.roomName}`} state = {{from: room.roomName, id: room.id}}><button onClick = {() => {joinRoom(room.roomName, currUser)}}>Join Room</button></Link>
                    </div>
                </div>
            )
        })}
            </div>
        </div>
    </div>
    )
}

export default Homepage