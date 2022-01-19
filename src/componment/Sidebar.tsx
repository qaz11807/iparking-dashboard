import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import {useAppSelector} from '../hook/useApp';
import {MessageQueue} from './MessageQueue';
import Navbar from './Navbar';
/**
  * Sidebar.
  * @return {ReactElement} caption here
  */
export default function Sidebar() {
    const msgQueue = useAppSelector((state) => state.message.msgQueue);
    return (
        <div className="bg-base-100 drawer drawer-mobile h-screen">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle"></input>
            <div className="flex flex-col items-center justify-center drawer-content">
                <Navbar/>
                <Outlet/>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu overflow-y-auto xl:w-60 lg:w-full bg-base-300 text-base-content p-6">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/User">User</Link>
                    </li>
                    <li>
                        <Link to="/Order">Order</Link>
                    </li>
                    <li>
                        <Link to="/Plate">Plate</Link>
                    </li>
                    <li>
                        <Link to="/Simulate">Simulate</Link>
                    </li>
                </ul>
            </div>
            <MessageQueue messages={msgQueue}/>
        </div>
    );
};
