import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Routes from '../routes/Routes'
import Header from './header/Header'
import "react-toastify/dist/ReactToastify.css"
import "../assets/css/Notification.css"


const App: React.FC = () => (
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
        <div className="container sm:w-7/12 px-3 sm:px-0 container-padding">
            <Routes />
        </div>
    </>
)

export default App
