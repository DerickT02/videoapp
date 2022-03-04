import Axios from 'axios'
import {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Homepage.css'
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:5000')
function Homepage({currUser}){
    const [rooms, setRooms] = useState([])
    const currentUser = currUser
    const logout = (e) => {
        e.preventDefault();
        Axios.get('http://localhost:5000/users/logout')
        setTimeout(function timeout(){
            window.location.reload(1);
          }, 1000)
      
    }

    useEffect(() => {
        Axios.get('http://localhost:5000/rooms').then((res) => {
        setRooms(res.data)
        console.log(res.data)
        })
    }, [])

    const joinRoom = (roomName) => {
        let joinData = {user: currentUser, roomName: roomName}
        socket.emit('join-room', joinData)
    }

    console.log(rooms)
    return(
    <div className = "homepage">
    <button onClick = {(e) => {logout(e)}}>Logout</button>
   <Link to = '/createroom'><button>Create Room</button></Link> 
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
                    <Link to = {`/room/${room.roomName}`} state = {{from: room.roomName}}><button onClick = {() => {joinRoom(room.roomName)}}>Join Room</button></Link>
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