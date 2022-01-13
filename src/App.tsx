import React from 'react';
import './App.css';
import LoginPage from './page/LoginPage';
import {Route, Routes} from 'react-router-dom';
import Dashboard from './page/Dashboard';
import {AuthProvider, RequireAuth} from './provider/AuthProvider';

/**
  * Main entrance of app.
  * @return {ReactElement} caption here
  */
function Main() {
    return (
        <div className='w-full'>
            <Dashboard />
        </div>
    );
}

/**
  * Main entrance of app.
  * @return {ReactElement} caption here
  */
function App() {
    return (
        <div className="w-full h-screen flex items-center ">
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/*"
                        element={
                            <RequireAuth>
                                <Main />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
