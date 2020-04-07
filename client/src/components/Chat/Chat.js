import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import './Chat.css'

let socket

const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)
        // goes to backend once it reads the string...and also can send an object
        socket.emit('join', { name, room }, () => {
            
        } )

        return () => {
            // unmounting when leaving chat
            socket.emit('disconnect')
            // will turn off the one instant of the socket
            socket.off()
        }
    }, [ENDPOINT, location.search])
    return (
        <h1>Chat</h1>
    )
}

export default Chat