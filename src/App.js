import React, { useEffect, useRef, useState } from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import store from './ducks/store'

import { BrowserRouter, Route, Switch, useLocation} from 'react-router-dom'

import './App.css';
import styles from "./App.module.sass"

import Home from './components/Home/Home'
import YouTubePlayer from './components/YouTubePlayer/YouTubePlayer'
import SessionController from './components/RoomControls/RoomControls'
import Chat from './components/Chat/Chat'

import SockJs from 'sockjs-client'
import socketIOClient from "socket.io-client"

import {
    setToken,
    setSocket,
    playVideo,
    pauseVideo,
    setTimestamp,
    setVideoLink,
} from './ducks/modules/session'
import { sendMessage, syncChat } from './ducks/modules/chat'


// const ENDPOINT = 'http://159.89.2.108/'
const ENDPOINT = 'http://127.0.0.1:8000/'
// const ENDPOINT = 'http://50.116.0.53/'
// const ENDPOINT = 'http://127.0.0.1:5000/'
// const ENDPOINT = 'https://maketube.herokuapp.com/'

function App() {
    
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='*' component={Room} />
                </Switch>
            </BrowserRouter>
        </Provider> 
    )
}

function Room() {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.chat.userInfo)
    const { player, token, timestampLastChanged } = useSelector(state => state.session)

    const tokenFromURL = useLocation().pathname.slice(1)
    const alreadySyncedChat = useRef(false)
    const alreadySyncedTimestamp = useRef(false)
    const alreadySyncedURL = useRef(false)

    useEffect(() => {
        const socket = socketIOClient.connect(ENDPOINT)
        const tokenToSend = token ?? tokenFromURL

        socket.on('connect', () => {
            console.log('connection open')
    
            socket.emit('join_room', {
                photo_url: userInfo.photo_url,
                username: userInfo.username,
                room: tokenToSend
            })

        })

        socket.on('sync_chat', e => {
            if (alreadySyncedChat.current) return
            dispatch(syncChat(e.messages))
            alreadySyncedChat.current = true
        })
        
        socket.on('connection_message', e => {
            console.log(e)
            dispatch(sendMessage({
                username: e.username,
                message: 'joined',
                photo_url: e.photo_url
            }))
        })

        socket.on('chat_message', message => {
            dispatch(sendMessage(message))
        })

        const setLink = e => {
            dispatch(setVideoLink(e.link))
        }
        socket.on('update_link', setLink)
        socket.on('sync_video_link', e => {
            if (!alreadySyncedURL.current) {
                setLink(e)
                alreadySyncedURL.current = true
            }
        })

        socket.on('pause_video', e => {
            console.log('received pause command')
            dispatch(pauseVideo())
        })
        
        socket.on('play_video', e => {
            console.log('received play command', e)
            let payload = {
                timestampLastChanged: Date.now(),
                timestamp: e.timestamp
            }
            const delta = Date.now() - e.actionStamp
            console.log(delta)
            // if ((delta) > 500)
            // payload.timestamp = e.timestamp
            dispatch(setTimestamp(payload))
            dispatch(playVideo())
        })
        
        socket.on('request_timestamp', e => {
            dispatch({ type: 'SEND_TIMESTAMP' })
        })
        
        socket.on('sync_timestamp', e => {
            if(alreadySyncedTimestamp.current) return
            console.log('supposed to sync timestamp', e)
            let payload = {
                timestampLastChanged: Date.now(),
                timestamp: e.timestamp
            }
            dispatch(setTimestamp(payload))
            // dispatch(playVideo())
            alreadySyncedTimestamp.current = true
        })

        dispatch(setSocket(socket))
        dispatch(setToken(tokenFromURL))
    }, [])

    return (
        <div className='App'>
            <div className={styles.room}>
                <YouTubePlayer />
                <SessionController />
            </div>
            <Chat />
        </div>
    )
}

export default App;
