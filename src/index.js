import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import i18n from './i18n';
import {ModalProvider} from "./components/ModalContext/ModalContext"; // Import the i18n configuration
import { ApolloProvider } from '@apollo/client';
import {client} from './apolloClient';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
    <BrowserRouter>
        <ModalProvider>
            <App/>
        </ModalProvider>
    </BrowserRouter>
    </ApolloProvider>
);