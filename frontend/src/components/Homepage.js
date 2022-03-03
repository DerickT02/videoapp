import Axios from 'axios'
import {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Homepage.css'
function Homepage(){
    const [rooms, setRooms] = useState([])

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

    console.log(rooms)
    return(
    <div>
    <button onClick = {(e) => {logout(e)}}>Logout</button>
    <button>Create Room</button>
        <h1>Hello Homepage</h1>
        {rooms.map((room) => {
            return(
                <div className = "room-card">
                    <div className = "room-title">
                    <h1>{room.roomName}</h1>
                    
                    </div>

                    <h2>{room.creator}</h2>
                    <div className = "room-button">
                    <Link to = {`/room/${room.roomName}`}><button>Join Room</button></Link>
                    </div>
                </div>
            )
        })}

    </div>
    )
}

export default Homepage