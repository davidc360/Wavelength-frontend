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

import { setToken, setSocket } from './ducks/modules/session'
import { sendMessage } from './ducks/modules/chat'


// const ENDPOINT = 'http://50.116.0.53/'
const ENDPOINT = 'http://127.0.0.1:2000/'

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
    const { token } = useSelector(state => state.session)

    const tokenFromURL = useLocation().pathname.slice(1)

    useEffect(() => {
        dispatch(setToken(tokenFromURL))
    }, [])

    useEffect(() => {
        const socket = socketIOClient.connect(ENDPOINT)

        socket.on('connect', () => {
            console.log('connection open')
            socket.emit('subscribe', { room: userInfo.token })
    
            socket.emit('join_room', {
                photo_url: userInfo.photo_url,
                username: userInfo.username,
                room: token
            })
        })
        
        socket.on('connection_message', e => {
            console.log(e)
            dispatch(sendMessage({
                username: e.username,
                message: 'joined',
                photo_url: e.photo_url
            }))
        })

        dispatch(setSocket(socket))
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
