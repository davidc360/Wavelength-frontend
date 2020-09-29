import produce from 'immer'

export const SEND_MESSAGE = 'SEND_MESSAGE'
export const SET_NAME = 'SET_NAME'
export const SET_PICTURE_URL = 'SET_PICTURE_URL'
export const SET_SHOW_MODAL = 'SET_SHOW_MODAL' 

const initialState = {
    messages: [
        {
            name: 'David',
            picture: 'https://i.imgur.com/Jvh1OQm.jpg',
            message: 'this movies sucks🤬'
        },
        {
            name: 'Joe',
            picture: 'https://i.imgur.com/XgbZdeA.jpeg',
            message: 'YEah who picked it🤬'
        },
        {
            name: 'Jess',
            picture: 'https://i.imgur.com/AD3MbBi.jpeg',
            message: 'Not me!!!!'
        },
    ],
    userInfo: {
        name: 'David',
        picture: 'https://i.imgur.com/Jvh1OQm.jpg',
    },
    showSettingsModal: false
}

const reducer = produce((draft, action = {}) => { 
    switch (action.type) {
        case SET_NAME:
            draft.userInfo.name = action.name
            return

        case SET_SHOW_MODAL:
            draft.showSettingsModal = action.show
            return
        
        case SEND_MESSAGE:
            draft.messages.push({
                name: action.name,
                picture: action.picture,
                message: action.message,
            })
            return
    }
}, initialState)

export const setName = name => ({
    type: SET_NAME,
    name: name
})

export const setPicture = url => ({
    type: SET_PICTURE_URL,
    url: url
})

export const setShowModal = show => ({
    type: SET_SHOW_MODAL,
    show: show 
})

export const sendMessage = (payload) => ({
    type: SEND_MESSAGE,
    message: payload.message,
    name: payload.name,
    picture: payload.picture
})

export default reducer