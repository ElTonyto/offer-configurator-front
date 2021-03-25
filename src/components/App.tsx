import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from '../routes/Routes'
import Header from './header/Header'

const App: React.FC = () => (
    <BrowserRouter>
        <Header />
        <div className="container sm:w-7/12 px-3 sm:px-0 container-padding">
            <Routes />
        </div>
    </BrowserRouter>
)

export default App
