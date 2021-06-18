import {createStore, combineReducers} from 'redux'

import article from "./article/index"
import token from "./login/index"

const reducers = combineReducers({
    article,
    token
})

const store= createStore(reducers)

export default store

