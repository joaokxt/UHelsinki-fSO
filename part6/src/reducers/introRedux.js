import React from 'react'
import ReactDOM from 'react-dom/client'

import { legacy_createStore as createStore } from 'redux'
    // createStore is deprecated

const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        case 'ZERO':
            return 0
        default:
            return state
    }
}

const store = createStore(counterReducer)
    // creates states store with counter reducer
    // the store now uses the reducer to handle actions which are sent using .dispatch()
    // it is possible to see the state of the store with .getState()
    // .subscribe() allows to create clbck functions that the store calls whenever an actions is dispatched

store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
})

const App = () => {
    return (
        <div>
            <div>
                {store.getState()}
            </div>
            <button
                onClick={e => store.dispatch({ type: 'INCREMENT' })}
            >
                Plus
            </button>
            <button
                onClick={e => store.dispatch({ type: 'DECREMENT' })}
            >
                Minus
            </button>
            <button
                onClick={e => store.dispatch({ type: 'ZERO' })}
            >
                Zero
            </button>
        </div>
    )
}

/*
const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
*/