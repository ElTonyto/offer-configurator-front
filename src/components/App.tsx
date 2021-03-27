import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Routes from '../routes/Routes'
import Header from './header/Header'
import "react-toastify/dist/ReactToastify.css"
import "../assets/css/Notification.css"
import { useLocation } from 'react-router-dom';


const App: React.FC = () => {
    const location = useLocation()
    return (
        <>
            <ToastContainer
                position={toast.POSITION.TOP_RIGHT}
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />
            <Header />
            <div className={`${location.pathname !== "/not-found" ? "container sm:w-7/12 px-3 sm:px-0 container-padding" : ""}`}>
                <Routes />
            </div>
        </>
    )
}

export default App
