import { SET_SOCKET, SET_TOKEN } from './modules/session'
import { sendMessage } from './modules/chat'

export default (store) => (next) => (action) => {
    const { dispatch, getState } = store
    next(action)

    switch (action.type) {
        
    }
}