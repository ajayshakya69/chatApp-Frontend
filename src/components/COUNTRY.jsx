import { useState, useEffect, useRef } from "react"

export default function COUNTRY(props) {
  const dataref = useRef([])



  const base_url = "https://countryapi-production.up.railway.app"
  
  const api = async ( eleSelector, sendData,type) => { // we need this function three times so we declare this function and use it thrice i.e for country, state and city
 
   const url = !!sendData? `${base_url}/${type}/${sendData}`:`${base_url}/${type}`;

    console.log(url)

    try {
      console.log('fetching data')
      const data = await fetch(url)
      const response = await data.json();
      dataref.current = response

  

      response.map(e => {
        document.getElementById(eleSelector).innerHTML += `<option value="${e.name}">${e.name}</option>`
      })

    } catch (error) {
      console.log(error.message)
    }
  }




  function country(event, type, eleSelector) {

    props.change(event);

    document.getElementById(eleSelector).innerHTML = ` <option value="select">---SELECT-${type}---</option>`
    if (event.target.value != 'select') {
     api(eleSelector,event.target.value,type);

      document.getElementById(eleSelector).removeAttribute('disabled') // after adding the cities the select tag change its state from disable
    } else {
      document.getElementById(eleSelector).setAttribute('disabled', 'true')
    }
  }



  useEffect(() => {
    api("select", null, "country");

    document.getElementById('selectState').setAttribute('disabled', 'true')
    document.getElementById('selectCity').setAttribute('disabled', 'true')
  }, [])

  return (
    <>
      <label htmlFor="country"></label>
      <select name="country" id="select" onChange={(event) => country(event, "state", "selectState")}>
        <option value="select">---SELECT-COUNTRY---</option>
      </select>
      <select name="state" id="selectState" onChange={(event) => country(event, "city", 'selectCity')}>
        <option value="select">---SELECT-STATE--</option>
      </select>
      <select name="city" id="selectCity" onChange={props.change}>
        <option value="select">---SELECT-CITY--</option>
      </select>
    </>
  )
}
