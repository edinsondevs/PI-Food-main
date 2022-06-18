import  Thunk from "redux-thunk";   //asyncronico!
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../Reducers'

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(Thunk)))
