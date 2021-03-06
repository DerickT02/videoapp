import { useState } from 'react'
import Axios from 'axios'
import './CreateRoom.css'

function CreateRoom({currUser}){
    const [roomName, setRoomName] = useState("")

    const createRoom = (e) => {
        e.preventDefault()
        Axios.post("http://localhost:9000/rooms/create", {roomName: roomName, creator: currUser})
    }

    return (
    <div className = "create-room">
        <div className = "title"><h1>Name Room</h1></div>
        <div className = "input"><input type = "text" onChange = {(e) => {setRoomName(e.target.value)}}></input></div>
        <button onClick = {createRoom}>Create Room</button>
    </div>
    )
}

export default CreateRoom