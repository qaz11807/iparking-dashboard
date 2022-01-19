import React from 'react';
import './App.css';
import {useEffect} from 'react';
import LoginPage from './page/LoginPage';
import {Route, Routes} from 'react-router-dom';
import Dashboard from './page/Dashboard';
import {RequireAuth} from './provider/AuthProvider';
import {updateAllRepoToken} from './api/service';
import {useToken} from './hook/useToken';
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
    const {token} = useToken();

    useEffect(() => {
        updateAllRepoToken(token);
    });

    return (
        <div className="w-full h-screen flex items-center ">
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
        </div>
    );
}

export default App;
