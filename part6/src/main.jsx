import React from 'react'
import ReactDOM from 'react-dom/client'

// import { legacy_createStore as createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

    // configureStore() allows to skip combineReducers()
const store = configureStore({
    reducer: {
        notes: noteReducer,
        filter: filterReducer
    }
})

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)

// Provider allows every App subcomponent to access the same store
