import  Thunk from "redux-thunk";   //asyncronico!
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer } from "../Reducers/index";

const composedEnhancer = composeWithDevTools(
  applyMiddleware(Thunk)

)

const store = createStore(reducer, composedEnhancer)
export default store