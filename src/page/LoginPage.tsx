import React from 'react';
import {useState, useEffect} from 'react';
import Logo from '../logo.svg';
import {useNavigate} from 'react-router-dom';
import {InputText} from '../componment/Form/FormInputs';
import {useAppSelector, useAppDispatch} from '../hook/useApp';
import {signIn} from '../features/auth/authSlice';
import {MessageQueue} from '../componment/MessageQueue';
interface LoginForm {
    username: string;
    password: string;
}
/**
  * login page.
  * @return {ReactElement} caption here
  */
export default function LoginPage() {
    const navigate = useNavigate();
    const msgQueue = useAppSelector((state) => state.message.msgQueue);
    const token = useAppSelector((state) => state.auth.token);
    const isFetching = useAppSelector((state) => state.auth.isFetching);
    const dispatch = useAppDispatch();
    const [form, setForm] = useState<LoginForm>({
        username: '',
        password: '',
    });

    useEffect(() => {
        if (token) {
            navigate('/', {replace: true});
        }
    }, [token]);

    const onClick = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        await dispatch(
            signIn({
                username: form.username,
                password: form.password,
            }),
        );
    };

    return (
        <form className="p-6 max-w-sm mx-auto rounded-xl shadow-lg items-center bg-white">
            <div className='flex justify-center'>
                <img className="h-14 w-14" src={Logo} alt="Logo"/>
            </div>
            <InputText
                label='Username'
                placeholder='username'
                value={form.username}
                onChange={(e)=>setForm({...form, username: e.target.value})}
            ></InputText>
            <InputText
                type='password'
                label='Password'
                placeholder='username'
                value={form.password}
                onChange={(e)=>setForm({...form, password: e.target.value})}
            ></InputText>
            <div className='flex justify-center m-2'>
                <button
                    className={`btn btn-sm btn-primary btn-outline ${isFetching? 'loading' : ''}`}
                    onClick={onClick}
                >Login</button>
            </div>
            <MessageQueue messages={msgQueue}/>
        </form>
    );
}
