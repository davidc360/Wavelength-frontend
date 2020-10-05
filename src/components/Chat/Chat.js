import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import styles from "./Chat.module.sass" 
import Settings from './Settings'
import Message from './Message'
import Input from './Input'

export default function () {
    const messages = useSelector(state => state.chat.messages)

    return(
        <div className={styles.ctn}>
            <Settings />
            {messages.map((message, i) => (
                <Message {...message} key={i}/>
            )) }
            <Input />
        </div>
    )
}