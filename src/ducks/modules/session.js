import produce from 'immer'

export const SET_LINK = 'SET_LINK'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_SOCKET = 'SET_SOCKET'
export const PLAY_VIDEO = 'PLAY_VIDEO'
export const PAUSE_VIDEO = 'PAUSE_VIDEO'

const initialState = {
    // token: '1232D',
    link: 'https://www.youtube.com/watch?v=2gQhd0_X5eE'
}

const reducer = produce((draft, action = {}) => {
    switch (action.type) {
        case SET_LINK:
            draft.link = action.link
            return
        
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
    }
}, initialState)

export const setLink = link => ({
    type: SET_LINK,
    link: link
})

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

export default reducer