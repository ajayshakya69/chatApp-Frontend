import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useSocket } from '../../context/SocketContext'

export default function LOGIN(props) {


  const socket = useSocket();


  // socket.on('test_useContext_socket',(data)=>{
  //   console.log(data)
  // })
  //hooks
  const [user, setUser] = useState({
    userName: "", passcode: ""
  })
  const navigate = useNavigate(); // this hook used to navigate between different routers

  const handlefunc = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser(preValue => ({ ...preValue, [name]: value }))
  }




  // function for sending data to the server and check the user details are correct or not
  async function sendLoginData() {
    console.log(user)
    // const request = await fetch('http://127.0.0.1:2323/login', {
    const request = await fetch(' https://chatapp-ajay.work.gd/login', {

      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(user)
    })


    if (request.status == 422) {
      alert('bad request')
    } else {
      const response = await request.json();
      // console.log(response.token);

      localStorage.setItem('authToken', response.authToken)

      console.log(response.message);

      navigate('/chats')
    }


  }




  return (
    <>
      <div className="login-container">

        <form action="" onSubmit={(e) => e.preventDefault()} >
          <h3>Login</h3>
          <input
            type="text"
            name='userName'
            value={user.name}
            placeholder="Enter Username"
            onChange={handlefunc}
            spellCheck={false}
          />
          <input
            type="password"
            name='passcode'
            value={user.password}
            placeholder="Enter Passcode"
            onChange={handlefunc} />
          <button
            onClick={sendLoginData}>Login</button>
          <div className="signUp">
            <p>Don't register yet?<a href="#" onClick={props.changeState}>register</a></p>
          </div>
        </form>
      </div>
    </>
  )
}
