import React, { createContext, useReducer, useContext } from 'react'

type GlobalContext = {
    state: State
    dispatch: React.Dispatch<Action>
}

type State = {
    data?: object
}

type Action = { type: 'start' } | { type: 'end' }

const initialState = {
    data: {},
}

const Context = createContext<GlobalContext>({
    state: initialState,
    dispatch: () => {},
})

export const useGlobalContext = () => useContext<GlobalContext>(Context)

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'start':
            return {
                ...state,
            }
        default:
            return state
    }
}

const StoreProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <Context.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default StoreProvider
