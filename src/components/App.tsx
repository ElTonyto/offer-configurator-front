import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from '../routes/Routes';
import Header from './header/Header';

const App: React.FC = () => (
    <BrowserRouter>
        <Header />
        <Routes />
    </BrowserRouter>
)

export default App
