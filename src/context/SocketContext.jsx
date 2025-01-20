
import { useMemo, useContext } from "react";

import { io } from 'socket.io-client';

import socketContext from './Context'



export const useSocket = () => {
    const socket = useContext(socketContext);

    return socket;
}

export const Context = (props) => {


    // const socket = useMemo(() => io("http://localhost:2323/"), [])
    const socket = useMemo(() => io("https://chatapp-ajay.work.gd/"), [])


    // const socket = "ajay"

    return (
        <socketContext.Provider value={socket}>
            {props.children}
        </socketContext.Provider>
    )
}
