import { sendMessage, SEND_MESSAGE } from './modules/chat'

export default (store) => (next) => (action) => {
    const { dispatch, getState } = store
    next(action)

    switch (action.type) {
        
    }
}