import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [modalIsOpen, setIsOpen] = useState(false);

    return (
        <ModalContext.Provider value={{ modalIsOpen, setIsOpen }}>
            {children}
        </ModalContext.Provider>
    );
};
