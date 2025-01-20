import { useState, useRef } from "react"
import COUNTRY from "../COUNTRY"

export default function SIGNUP(props) {
  const profile = useRef()
  const [user, setuser] = useState({
    userName: '', email: '', passcode: '', country: '', state: "", city: "",
  })



  //   const showpath=()=>{
  //   console.log(profile.current.files[0])

  //  }



  const handlefunc = (e) => {
    // console.log(e)
    let name = e.target.name;
    let value = e.target.value;

    setuser(pre => ({ ...pre, [name]: value }))








  }
  const sendData = async () => {
    console.log('sdfs')
    const formdata = new FormData();


    console.log("profilepicture", profile.current.files[0])


    formdata.set('profile', profile.current.files[0])

    for (let field in user) {
      formdata.set(field, user[field])
    }
    // console.log(formdata.entries().next())
    // for (let pair of formdata.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }


    const url = " https://chatapp-ajay.work.gd/sign"
    // const url = "http://localhost:2323/sign"


    const request = await fetch(url, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json"
      // },
      body: formdata
    })






    if (request.ok) {
      const response = await request.json();
      document.querySelector('#response').style.background = "rgb(127, 185, 38)";
      document.querySelector('#response').style.color = "rgb(2, 105, 2)"
      document.querySelector('#response').innerHTML = response.message
      document.querySelector('#response').style.display = "block"
      setTimeout(() => {
        document.querySelector('#response').style.display = "none"
      }, 2000);
    } else {
      const response = await request.json();
      document.querySelector('#response').style.background = "rgb(184, 81, 63)";
      document.querySelector('#response').style.color = " rgb(206, 11, 11)"
      document.querySelector('#response').innerHTML = response.message
      document.querySelector('#response').style.display = "block"
      setTimeout(() => {
        document.querySelector('#response').style.display = "none"
      }, 2000);
    }

  }







  //  console.log(user)
  return (
    <>
      <div className="login-container">
        <div id="response">user registered successfully</div>

        <form action="" onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
          <h3>Register</h3>
          <input type="file" name="profile" id="" ref={profile} />
          <input
            type="text"
            name='userName'
            value={user.name}
            placeholder="Enter Username"
            onChange={handlefunc}
            spellCheck={false}
          />
          <input
            type="text"
            name='email'
            value={user.email}
            placeholder="Enter Email"
            onChange={handlefunc}
            spellCheck={false}
          />

          {/* <COUNTRY
          change={handlefunc}
        /> */}

          <input
            type="password"
            name='passcode'
            value={user.password}
            placeholder="Enter Passcode"
            onChange={handlefunc} />

          <button
            onClick={sendData}>signup</button>
          <div className="signUp">
            <p>Already have an account?<a href="#" onClick={props.changeState}>login</a></p>
          </div>
        </form>
      </div>
    </>
  )
}
