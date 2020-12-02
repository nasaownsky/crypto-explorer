import { combineReducers } from "redux"
import coinsReducer from './coins'
import coinReducer from './coin'

const rootReducer = combineReducers({
    coins: coinsReducer,
    coin: coinReducer
})

export default rootReducer