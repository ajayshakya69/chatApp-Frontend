import { useEffect, useState, useRef } from 'react'
import { useSocket } from '../context/SocketContext';



export default function CHATSCREEN(props) {


    const [isTyping, setTyping] = useState(false);

    const socket = useSocket();

    // ARRAY FOR TYPING 

    console.log('render')
    let typingTimer;

    const timeFlag = useRef(0);













    function checkDate(dateBaseDate) {
        const currentDate = new Date().toDateString();

        const checkDate = new Date(dateBaseDate);
        let element = document.querySelector('.chatScreen').innerHTML;

        // console.log(element)
        //     document.querySelector('.chatScreen').innerHTML+= ` <div className="msgTime">
        //     <p>today</p>
        //  </div>`


        const dateDiff = ((new Date(currentDate)) - (new Date(checkDate))) / (1000 * 60 * 60 * 24);

        if (dateDiff == 0 && timeFlag.current != 1) {
            console.log("today")
            document.querySelector('.chatScreen').innerHTML += ` <div class="msgTime">
                       <p>today</p>
                    </div>`
            timeFlag.current = 1;
        }
        else if (dateDiff == 1 && timeFlag.current != 2) {
            console.log("yesterday")
            document.querySelector('.chatScreen').innerHTML += ` <div class="msgTime"> 
            <p>Yesterday</p>
                </div>`
            timeFlag.current = 2;
        }
        else if (dateDiff > 1 && timeFlag.current != checkDate.toDateString()) {
            console.log(checkDate.toLocaleDateString().replace(/["/"]/g, '-'))
            document.querySelector('.chatScreen').innerHTML += ` <div class="msgTime">
        <p>${checkDate.toLocaleDateString().replace(/["/"]/g, '-')}</p>
     </div>`
            timeFlag.current = checkDate.toDateString();
        }



    }











    function displayMessage(message, className, dateObject) {




        checkDate(dateObject.date);











        const chatscreen = document.querySelector('.chatScreen');
        const parentElement = document.querySelector('.chatScreen');
        const childElement = document.createElement('div');
        const paragraphChildElement = document.createElement('p');
        const childTimeElement = document.createElement('div');




        paragraphChildElement.textContent = message;
        childTimeElement.textContent = dateObject.time

        childElement.setAttribute('class', className);


        childElement.appendChild(paragraphChildElement)
        childElement.appendChild(childTimeElement)



        parentElement.appendChild(childElement)

        chatscreen.scrollTop = chatscreen.scrollHeight

    }











    async function previousMessag(senterId, sent_to_who_id) {



        try {


            // console.log(`message is send by ${senterId} to the ${sent_to_who_id._id} `)

            const data = {
                senderId: senterId,
                toWhomSendId: sent_to_who_id
            }

            const request = await fetch('http://127.0.0.1:2323/getmsg', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const response = await request.json();

            console.log(response)

            document.querySelector('.chatScreen').innerHTML = ' ';
            if (!response || response.length == 0) return document.querySelector('.chatScreen').innerHTML += "Let's talk"

            // console.log('before empty')
            // console.log('after empty')

            response.map(e => {



                (e.outGoingId == senterId) ? displayMessage(e.message, 'outgoing_msg', e.timeStamp) : displayMessage(e.message, 'incoming_msg', e.timeStamp);
            })







        } catch (error) {

            document.querySelector('.chatScreen').innerHTML = error.message
        }

    }

    
    const selectedUserData = props.userData.selectUserData
    const logged_in_user = props.userData.logged_user_id.id
    






    function status() {
        const childrens = document.querySelector('.sendMsg').children;
        const sendUserId = childrens[1].value;
        const senterId = logged_in_user;
        // to send the signal when user is start typing
        // console.log('who is typing now',senterId)
        socket.emit('typing_status', senterId, sendUserId);
        // console.log(senterId);

           console.log('jelo')
    }








    function sendMessage() {

        const chatscreen = document.querySelector('.chatScreen');



        const childrens = document.querySelector('.sendMsg').children;
        let message = childrens[0].value;
        const sendUserId = childrens[1].value;
        const senterId = logged_in_user;




        if (!message.trim()) return;

        const dateObject = {
            date: new Date().toDateString(),
            time: `${new Date().getHours()}:${new Date().getMinutes()}`
        }

        displayMessage(message, 'outgoing_msg', dateObject)
        childrens[0].value = ' ';
        childrens[0].focus();


        socket.emit('sendMessage', message, sendUserId, senterId);



        // socket.emit('typing_status', sendUserId, senterId);


        // console.log(`send message to the ${selectedUserData.userName},  by ${sender}`)

    }









  

    useEffect(() => {


        console.log(props.userData.selectUserData)
        previousMessag(logged_in_user, selectedUserData);

//  here error comes very often

        
        socket.on('recieveMessage', (message, whoSentMsg) => {
            
            console.log(selectedUserData._id,"&&",whoSentMsg)

            if (whoSentMsg == selectedUserData._id) {
                console.log('message printed')
                const dateObject = {
                    date: new Date().toDateString(),
                    time: `${new Date().getHours()}:${new Date().getMinutes()}`
                }
                displayMessage(message, 'incoming_msg', dateObject)
            }




        })


    // socket.on('istyping', (whoIsTyping) => {



    //     console.log('here')
    //        console.log(selectedUserData._id);

    //     console.log(whoIsTyping,selectedUserData._id)

    //     if (whoIsTyping != selectedUserData._id) console.log('change')

    //     if (whoIsTyping == selectedUserData._id) {


    //         console.log(whoIsTyping,selectedUserData._id)

    //         setTyping(true)
    //         if (typingTimer) {
    //             clearTimeout(typingTimer);
    //         }

    //         typingTimer = setTimeout(() => {
    //             setTyping(false)
    //         }, 5000);
    //     }
    // })


        // to show the selected user that another user are typing now 

      

    }, [props.userData.selectUserData])

     
  







    return (




        <>
            <div className="ove">


                <div className='mainSection'>


                    <div className="selected_user_profile">
                        <div onClick={() => props.userData.msgSectionToUserlist()}>

                            <span className="material-symbols-outlined">
                                arrow_back
                            </span>
                        </div>
                        <div className='chatUserProfile'>
                            <img
                                // Assigning a unique key using uuidv4()
                                src={`http://127.0.0.1:2323/getImage/${selectedUserData.profile}`}
                                alt={selectedUserData.profile}
                                width="50"
                                height="50"
                            />

                        </div>
                        <div className='status'>
                            <h3>{selectedUserData.userName}</h3>
                            {isTyping && <p>Typing...</p>}
                        </div>

                    </div>
                    <div className="chatScreen">
                        {/* <div className="msgTime">
                       <p>today</p>
                    </div> */}

                    </div>
                    <div className="sendMsg">
                        <input type="text" onChange={status} />
                        <input type="text" value={selectedUserData._id} disabled style={{ display: "none" }} />
                        <button onClick={sendMessage}>send</button>
                    </div>
                </div>
            </div>
        </>

    )
}


