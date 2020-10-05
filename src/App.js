import React, { useEffect, useRef, useState } from 'react'
import { Provider, useDispatch } from 'react-redux'
import store from './ducks/store'

import { BrowserRouter, Route, Switch, useLocation} from 'react-router-dom'

import './App.css';
import styles from "./App.module.sass"

import Home from './components/Home/Home'
import YouTubePlayer from './components/YouTubePlayer/YouTubePlayer'
import SessionController from './components/RoomControls/RoomControls'
import Chat from './components/Chat/Chat'

import { setToken } from './ducks/modules/session'

import SockJs from 'sockjs-client'
import socketIOClient from "socket.io-client"

// const ENDPOINT = 'http://50.116.0.53/'
const ENDPOINT = 'http://127.0.0.1:5000/'

function App() {
    const [response, setResponse] = useState("")

    useEffect(() => { 
        const socket = socketIOClient.connect(ENDPOINT)
        socket.on('connect', () => {
            console.log('connection open')
        })
    }, [])

    

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
    const token = useLocation().pathname.slice(1)

    useEffect(() => {
        dispatch(setToken(token))
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
