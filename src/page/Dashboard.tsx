import React, {Fragment} from 'react';
import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import Sidebar from '../componment/Sidebar';
import {getUserInfo} from '../features/auth/authSlice';
import {useAppDispatch} from '../hook/useApp';
import OrderPage from './OrderPage';
import PlatePage from './PlatePage';
import SimulatePage from './SimulatePage';
import UserPage from './UserPage';
/**
  * Dashboard.
  * @return {ReactElement} caption here
  */
export default function Dashboard() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getUserInfo());
    }, []);
    return (
        <Routes>
            <Route path="/" element={
                <Fragment>
                    <Sidebar/>
                </Fragment>
            }>
                <Route index element={<p>Home Page</p>} />
                <Route path="User" element={<UserPage/>} />
                <Route path="Order" element={<OrderPage/>} />
                <Route path="Plate" element={<PlatePage/>} />
                <Route path="Simulate" element={<SimulatePage/>} />
                <Route path="*" element={<p>找不到頁面</p>} />
            </Route>
        </Routes>
    );
};
