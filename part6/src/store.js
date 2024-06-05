import { configureStore } from "@reduxjs/toolkit"
// import { legacy_createStore as createStore, combineReducers } from 'redux'

import noteReducer from "./reducers/noteReducer"
import filterReducer from "./reducers/filterReducer"

const store = configureStore({
    reducer: {
        notes: noteReducer,
        filter: filterReducer
    }
})

export default store