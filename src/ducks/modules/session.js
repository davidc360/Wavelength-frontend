import produce from 'immer'

export const SET_TOKEN = 'SET_TOKEN'
export const SET_SOCKET = 'SET_SOCKET'
export const PLAY_VIDEO = 'PLAY_VIDEO'
export const PAUSE_VIDEO = 'PAUSE_VIDEO'
export const SET_TIMESTAMP = 'SET_TIMESTAMP'
export const SEND_TIMESTAMP = 'SEND_TIMESTAMP'
export const SET_VIDEO_LINK = 'SET_VIDEO_LINK'

const initialState = {
    // token: '1232D',
    timestampLastChanged: Date.now(),
    sendTimestamp: false,
    // link: 'https://www.youtube.com/watch?v=2gQhd0_X5eE'
}

const reducer = produce((draft, action = {}) => {
    switch (action.type) {
        case SET_TOKEN:
            draft.token = action.token
            
            return
        
        case SET_SOCKET:
            draft.socket = action.socket
            return

        case PLAY_VIDEO:
            draft.playState = 1
            return

        case PAUSE_VIDEO:
            draft.playState = 0
            return
        
        case SET_TIMESTAMP:
            draft.timestampLastChanged = action.timestampLastChanged
            if (action.timestamp) draft.timestamp = action.timestamp
            return
        
        case SEND_TIMESTAMP:
            draft.sendTimestamp = !draft.sendTimestamp
            return

        case SET_VIDEO_LINK:
            draft.link = action.link
            return
    }
}, initialState)

export const setToken = token => ({
    type: SET_TOKEN,
    token: token
})

export const setSocket = socket => ({
    type: SET_SOCKET,
    socket: socket
})

export const playVideo = () => ({
    type: PLAY_VIDEO,
})

export const pauseVideo = () => ({
    type: PAUSE_VIDEO,
 })

export const setTimestamp = ({ timestampLastChanged, timestamp }) => ({
    type: SET_TIMESTAMP,
    timestamp: timestamp,
    timestampLastChanged: timestampLastChanged
})

export const sendTimestamp = () => ({
    type: SEND_TIMESTAMP
})

export const setVideoLink = link => ({
    type: SET_VIDEO_LINK,
    link: link
})

export default reducer