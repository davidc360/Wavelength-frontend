import React, { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import store from './ducks/store'

import './App.css';

import VideoPlayer from './components/VideoPlayer/VideoPlayer'
import SessionController from './components/SessionController/SessionController'
import Chat from './components/Chat/Chat'

function App() {
    return (
        <Provider store={store}>
            <div className='App'>
                <div>
                    <VideoPlayer />
                    <SessionController />
                </div>
                <Chat />
            </div>
        </Provider> 
    )
}

export default App;
