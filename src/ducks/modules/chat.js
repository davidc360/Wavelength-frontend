import produce from 'immer'

export const SEND_MESSAGE = 'SEND_MESSAGE'
export const SET_NAME = 'SET_NAME'
export const SET_PICTURE_URL = 'SET_PICTURE_URL'
export const SET_SHOW_MODAL = 'SET_SHOW_MODAL' 

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
            const { name } = action
            draft.userInfo.username = name
            localStorage.setItem('username', name)
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
    }
}, initialState)

export const setName = name => ({
    type: SET_NAME,
    username: name
})

export const setPicture = url => ({
    type: SET_PICTURE_URL,
    url: url
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

export default reducer