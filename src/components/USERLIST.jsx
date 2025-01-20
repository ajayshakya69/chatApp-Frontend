import { v4 as uuidv4 } from 'uuid';
import CHATSCREEN from './CHATSCREEN'
import { useState, useEffect } from 'react'
import {useSocket} from "../context/SocketContext"

export default function USERLIST(props) {
    const [chatScreen, showchatScreen] = useState(false);
    const [selectUserData, setselectUserData] = useState({});
     const socket = useSocket();

    const logged_user_id = props.data.userData;




    function shiftChat(e) {
        setselectUserData(pre=>pre=e)
        showchatScreen(true)
        document.querySelector('.chatBox').classList.add('changeLayout');
        document.querySelector('header').style.display="none";

        // console.log(selectUserData)

    }

    function msgSectionToUserlist(){
        console.log('sfsd')
        document.querySelector('.chatBox').classList.remove('changeLayout')
        showchatScreen(false);

    }

    useEffect(() => {
        console.log(socket)
        socket.on('connect',()=>{
            console.log("connected")
        })

        socket.emit('join-room', props.data.userData.id)

    }, [])



    return (
        <>
            <div className="list">
                <div className="usersScreen"
                    draggable="none"
                >
                    <div className="helo">
                        <div className="role" key={props.data.userData.id}>
                            {props.data.userData.userName}
                        </div>
                    </div>

                    <ul
                        draggable="false"
                    >
                        {props.data.allData.map(e => (
                            <li
                                key={e._id}
                                onClick={() => shiftChat(e)}
                                draggable="false"
                            >
                                <div className="profileframe">
                                    <img
                                        key={uuidv4()} // Assigning a unique key using uuidv4()
                                        src={`http://127.0.0.1:2323/getImage/${e.profile}`}
                                        alt={e.profile}
                                        width="40"
                                        height="40"
                                        draggable="false"
                                    />
                                </div>
                                <h3>{e.userName}</h3>

                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='msgSection'>
                {chatScreen ? <CHATSCREEN userData={{ selectUserData, logged_user_id, msgSectionToUserlist }} /> : <p>select a user to chat</p>}
            </div>

        </>
    );
}
