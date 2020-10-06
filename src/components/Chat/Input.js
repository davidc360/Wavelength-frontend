import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from "./Input.module.sass"
import { sendMessage } from '../../ducks/modules/chat'

export default function () {
    const dispatch = useDispatch()
    const { username, photo_url } = useSelector(state => state.chat.userInfo)
    const { token, socket } = useSelector(state => state.session)

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            const message = {
                username: username,
                photo_url: photo_url,
                message: e.target.value,
                room: token
            }
            // dispatch(sendMessage(message))
            socket.emit('chat_message', message)

            e.target.value = ''
        }
            
    }
    
    return(
        <div className={styles.ctn}>
            <input type="text" placeholder='type your message here...' onKeyDown={handleKeyDown}/>
        </div>
    )
}