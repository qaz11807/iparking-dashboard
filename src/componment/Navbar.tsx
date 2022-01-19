import React from 'react';
import {signout} from '../features/auth/authSlice';
import {useAppSelector, useAppDispatch} from '../hook/useApp';
import EditIcon from '../images/logout.png';
/**
 * @return {ReactElement}
 */
export default function Navbar() {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    return (
        <div className="fixed top-0 right-0 navbar mb-2 shadow-lg bg-neutral text-neutral-content w-full justify-end ">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost" onClick={()=>{
                    dispatch(signout());
                }}>
                    <img className="h-6 w-6 hover:cursor-pointer" src={EditIcon}></img>
                </button>
            </div>
            <div className="avatar placeholder p-2">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-8 h-8">
                    <span className="text-xl">{user?.username.substring(0, 1).toUpperCase()}</span>
                </div>
            </div>
        </div>
    );
}
