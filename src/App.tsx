import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainStack } from './navigation/MainStack'
import LoadingProvider from './contexts/loadingContext';
import NotificationProvider from './contexts/notificationContext';
import { AuthProvider, RequireAuth } from './contexts/authContext';
import Login from './screens/other/LoginScreen';
import AuthLogic from './screens/other/AuthLogic';

function App() {
    return (
        <BrowserRouter>
            <LoadingProvider>
                <NotificationProvider>
                    <AuthProvider>
                        <Routes>
                            {/* Route per il login */}
                            <Route path="/auth" element={<AuthLogic />} />
                            <Route path="/login" element={<Login />} />
                            {/*<Route path="/dev-info" element={<InfoPage />} />*/}
                            {/* Route protette con RequireAuth */}
                            <Route
                                path="*"
                                element={
                                    <RequireAuth>
                                        <MainStack />
                                    </RequireAuth>
                                }
                            />
                        </Routes>
                    </AuthProvider>
                </NotificationProvider>
            </LoadingProvider>
        </BrowserRouter>
    )
}

export default App
