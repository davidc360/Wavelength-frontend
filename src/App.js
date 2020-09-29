import React, { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import store from './ducks/store'

import './App.css';
import styles from "./App.module.sass"

import YouTubePlayer from './components/YouTubePlayer/YouTubePlayer'
import SessionController from './components/SessionController/SessionController'
import Chat from './components/Chat/Chat'

function App() {
    return (
        <Provider store={store}>
            <div className='App'>
                <div className={styles.room}>
                    <YouTubePlayer />
                    <SessionController />
                </div>
                <Chat />
            </div>
        </Provider> 
    )
}

export default App;
