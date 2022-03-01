import { useParams } from 'react-router-dom'

const Room = () => {
    const params = useParams()
    return(
        <div>
            <h1>Room {params.name}</h1>
        </div>
    )
}

export default Room