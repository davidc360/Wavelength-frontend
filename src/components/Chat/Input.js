import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from "./Input.module.sass"
import { sendMessage } from '../../ducks/modules/chat'

export default function () {
    const dispatch = useDispatch()
    const {name, picture} = useSelector(state => state.chat.userInfo)

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            dispatch(sendMessage({
                name: name,
                picture: picture,
                message: e.target.value
            }))
            e.target.value = ''
        }
            
    }
    
    return(
        <div className={styles.ctn}>
            <input type="text" placeholder='type your message here...' onKeyDown={handleKeyDown}/>
        </div>
    )
}