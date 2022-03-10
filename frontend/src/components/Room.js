import { io } from 'socket.io-client'
import { useLocation, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Peer from 'peerjs'
import peer from 'peerjs'
import './Room.css'


function Room({currUser}){
    const location = useLocation()
    const remoteVid = useRef(null)
    const myVideo = useRef(null)
    const [peerID, setPeerID] = useState('')
    const [remoteID, setRemoteID] = useState('')
    const { from, id } = location.state
   
    const socket = io.connect('http://localhost:5000')

    const leaveRoom = () => {
        window.location.reload()
    }
   

    const peer = new Peer(undefined, {
        host: '/',
        port: '3000'
    })

  

    useEffect(() => {

        
    
      peer.on('open', id => {
          const joinData = {id: id, room: from}
          console.log(joinData)
          socket.emit('send-id', joinData)
          
      })

      
 
      navigator.mediaDevices.getUserMedia({
          video: true
      }).then(stream => {
        addVideoStream(myVideo, stream)

        peer.on('call', call => {
            call.answer(stream)

            call.on('stream', userVideoStream => {
                addVideoStream(remoteVid, userVideoStream)
            })
        })

        socket.on('receive-id', id => {
            console.log("User connected" + id)
            connectToNewUser(id, stream, remoteVid)
          })
      })

    }, [])

   
    const addVideoStream = (videoRef, stream) => {
        videoRef.current.srcObject = stream
        videoRef.current.addEventListener('loadedmetadata', () => {
            videoRef.current.play()
        })

    }

    const connectToNewUser = (userID, stream, remoteRef) => {
        const call = peer.call(userID, stream)
        call.on('stream', userVideoStream => {
            addVideoStream(remoteRef, userVideoStream)
        })
        call.on('close', () => {
            remoteRef.remove()
        })
    }

    return(
    <div className = "Room">
       
        <Link to = '/homepage'><button onClick = {leaveRoom}>Leave room</button></Link>
        <div className = "video-container">

        <div className = "video-card">
            <video ref = {remoteVid}></video>
        </div>
        
        
        
        <div className = "video-card">
            <video ref = {myVideo} muted = {true}></video>
        </div>
        </div>
    </div>
    )
}

export default Room