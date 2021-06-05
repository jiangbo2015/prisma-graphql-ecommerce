import React, { createContext, useReducer, useContext } from 'react'

type GlobalContext = {
    state: State
    dispatch: React.Dispatch<Action>
}

type State = typeof initialState

type Action =
    | { type: 'start' }
    | { type: 'end' }
    | { type: 'showToast'; payload: State['toast'] }
    | { type: 'toggleDarwer' }

const initialState = {
    data: {},
    toast: {
        open: false,
        message: '',
    },
    openDrawer: true,
}

const Context = createContext<GlobalContext>({
    state: initialState,
    dispatch: () => {},
})

export const useGlobalContext = () => useContext<GlobalContext>(Context)

const reducer = (state: State, action: Action) => {
    console.log(action, 'action')
    switch (action.type) {
        case 'start':
            return {
                ...state,
            }
        case 'showToast':
            return {
                ...state,
                toast: action.payload,
            }
        case 'toggleDarwer':
            return {
                ...state,
                openDrawer: !state.openDrawer,
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
