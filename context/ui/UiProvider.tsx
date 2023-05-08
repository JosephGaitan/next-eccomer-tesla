import { FC, useReducer} from 'react'
import { UiContext } from './UiContext'
import { uiReducer } from './uiReducer'

export interface UiState {
    isOpenMenu:boolean
}

interface Props {
    children: React.ReactNode
}

const UI_INITIAL_STATE : UiState = {
    isOpenMenu : false
}

export const UiProvider:FC<Props> = ({children}) =>{

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const toggleSideMenu = () =>{
        dispatch({type: '[Ui] - ToggleMenu'})
    }

    return (
        <UiContext.Provider value={{
            ...state, toggleSideMenu
        }}>
            {children}
        </UiContext.Provider>
    )
}

