import React, { createContext, ReactElement, useContext } from 'react';
import hook from "./hooks/useMenu";

type Values = {
    left: string,
    icon: ReactElement,
    closeMenu: () => void,
}

const defaultValues = {
    left: "",
    icon: <h1>default</h1>,
    closeMenu: () => ""
}

const MenuContext = createContext<Values>(defaultValues);

export const MenuProvider: React.FC = ({ children }) => {
    const { left, icon, closeMenu } = hook();

    return(
        <MenuContext.Provider value={{ left, icon, closeMenu }}>
            {children}
        </MenuContext.Provider>
    );
}

export const useMenu = () => useContext(MenuContext);