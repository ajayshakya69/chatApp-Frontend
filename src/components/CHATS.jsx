import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import USERLIST from './USERLIST'
import { io } from 'socket.io-client'

import { Context } from '../context/SocketContext'


import './test.css'

export default function WELCOME() {


	const [allData, setAllData] = useState({})

	const [isloading, setLoading] = useState(true)

	const [userData, setUserdata] = useState({})

	const [socketState, setSocketState] = useState()

	const navigate = useNavigate();





	//to check the user has permission to access this page 
	async function verifyUser() {

		try {
			const authToken = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
			// const request = await fetch('http://127.0.0.1:2323/verifyJwt', {
			const request = await fetch(' https://chatapp-ajay.work.gd/verifyJwt', {

				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				}
			})


			const response = await request.json();


			setLoading(false) // after response comes unable the loading

			setUserdata(pre => pre = response.userData)
			setAllData(pre => pre = response.allData)



			if (!response.message) {
				navigate('/user')
			}


		} catch (error) {
			console.log(error.message)
		}
	}





	useEffect(() => {


		verifyUser();
		// const socket = io('http://localhost:2323/')

		
	}, [])



	return (



		<div className='mainContainer'>
			{
				isloading ? (
					<p>loading...</p>
				) : (
					<>
						<Context>
							<header>

								<h3 className='title'>Let's Talk With Strangers</h3>
							</header>
							<div className="chatBox">
								<USERLIST data={{ allData, userData }} />

							</div>
						</Context>
					</>

				)
			}

		</div>

	)
}




