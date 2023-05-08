import { createContext } from "react";

interface contextProps {
    isOpenMenu: boolean
    //methods
    toggleSideMenu: () => void
}

export const UiContext = createContext({} as contextProps)