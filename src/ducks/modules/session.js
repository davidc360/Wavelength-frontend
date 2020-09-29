import produce from 'immer'

export const SET_LINK = 'SET_LINK'

const initialState = {
    token: '1232D',
    link: 'https://www.youtube.com/watch?v=9EYZnSXEla0'
}

const reducer = produce((draft, action = {}) => {
    switch (action.type) {
        case SET_LINK:
            draft.link = action.link
            return
    }
}, initialState)

export const setLink = link => ({
    type: SET_LINK,
    link: link
})

export default reducer