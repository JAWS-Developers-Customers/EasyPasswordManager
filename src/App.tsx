import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainStack } from './navigation/MainStack'
import { ToastContainer } from 'react-toastify';

function App() {
    const [count, setCount] = useState(0)

    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={
                    <>
                        <ToastContainer />
                        <Routes>
                            <Route path='*' element={<MainStack />} />
                        </Routes>
                    </>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default App
