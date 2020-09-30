import produce from 'immer'

export const SET_LINK = 'SET_LINK'
export const SET_TOKEN = 'SET_TOKEN'

const initialState = {
    token: '1232D',
    link: 'https://www.youtube.com/watch?v=9EYZnSXEla0'
}

const reducer = produce((draft, action = {}) => {
    switch (action.type) {
        case SET_LINK:
            draft.link = action.link
            return
        
        case SET_TOKEN:
            draft.token = action.token
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

export default reducer