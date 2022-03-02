import Axios from 'axios'
import './Homepage.css'
function Homepage(){

    const logout = (e) => {
        e.preventDefault();
        Axios.get('http://localhost:5000/users/logout')
        setTimeout(function timeout(){
            window.location.reload(1);
          }, 1000)
      
    }

    return(
    <div>
    <button onClick = {(e) => {logout(e)}}>Logout</button>
        <h1>Hello Homepage</h1>

    </div>
    )
}

export default Homepage