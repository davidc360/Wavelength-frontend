import { createStore, applyMiddleware, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import chat from "./modules/chat"
import session from "./modules/session"

const reducer = combineReducers({
    chat,
    session
})

export default createStore(
    reducer,
    composeWithDevTools()
)
