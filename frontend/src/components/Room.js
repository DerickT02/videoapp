import { io } from 'socket.io-client'
import { useLocation, Link } from 'react-router-dom'
const socket = io.connect('http://localhost:5000')


function Room({currUser}){
    const location = useLocation()
    const { from } = location.state
    console.log(from)


    const leaveRoom = () => {
        socket.emit('leave-room', {roomName: from, user: currUser})
    }

    return(
    <div>
        <h1>Hello Room</h1>
        <Link to = '/homepage'><button onClick = {() => {leaveRoom()}}>Leave Room</button></Link>
    </div>
    )
}

export default Room