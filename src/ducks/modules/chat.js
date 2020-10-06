import produce from 'immer'

export const SEND_MESSAGE = 'SEND_MESSAGE'
export const SET_NAME = 'SET_NAME'
export const SET_PHOTO_URL = 'SET_PHOTO_URL'
export const SET_SHOW_MODAL = 'SET_SHOW_MODAL' 
export const SYNC_CHAT = 'SYNC_CHAT'

const localUsername = localStorage.getItem('username') ?? 'Anonymous'
const localPhotoURL = localStorage.getItem('photo_url') ?? 'https://i.imgur.com/mCHMpLT.png'

const initialState = {
    messages: [
    ],
    userInfo: {
        username: localUsername,
        photo_url: localPhotoURL,
    },
    showSettingsModal: false
}

const reducer = produce((draft, action = {}) => { 
    switch (action.type) {
        case SET_NAME:
            const { username } = action
            draft.userInfo.username = username
            localStorage.setItem('username', username)
            return

        case SET_PHOTO_URL:
            const { photo_url } = action
            draft.userInfo.photo_url = photo_url
            localStorage.setItem('photo_url', photo_url)
            return 

        case SET_SHOW_MODAL:
            draft.showSettingsModal = action.show
            return
        
        case SEND_MESSAGE:
            draft.messages.push({
                username: action.username,
                photo_url: action.photo_url,
                message: action.message,
            })
            return

        case SYNC_CHAT:
            draft.messages = [...action.messages, ...draft.messages]
            return
    }
}, initialState)

export const setName = name => ({
    type: SET_NAME,
    username: name
})

export const setPicture = url => ({
    type: SET_PHOTO_URL,
    photo_url: url
})

export const setShowModal = show => ({
    type: SET_SHOW_MODAL,
    show: show 
})

export const sendMessage = ({ message, username, photo_url }) => ({
    type: SEND_MESSAGE,
    message: message,
    username: username,
    photo_url: photo_url
})

export const syncChat = messages => ({
    type: SYNC_CHAT,
    messages: messages
})

export default reducer