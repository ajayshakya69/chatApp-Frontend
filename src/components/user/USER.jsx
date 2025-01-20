import { useState, useEffect } from 'react'
import LOGIN from './LOGIN'
import SIGNUP from './SIGNUP'
import './user.css'

export default function USER() {
  const [islogin, setLogin] = useState(true)
  // console.log(islogin)

  function changeState() {
       setLogin(prevalue=>!prevalue)
      // console.log('sdfs')
  }
  useEffect(() => {

  }, [])
  return (
    <>
      {islogin ? <LOGIN changeState={changeState} /> : <SIGNUP changeState={changeState} />}
    </>
  )
}
