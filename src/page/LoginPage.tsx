import React from 'react';
import {useState, useEffect} from 'react';
import Logo from '../logo.svg';
import {AlertParams, MessageAlert} from '../componment/MessageAlert';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../hook/useAuth';
import {InputText} from '../componment/Form/FormInputs';

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
    const auth = useAuth();
    const [form, setForm] = useState<LoginForm>({
        username: '',
        password: '',
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState<AlertParams>({
        type: '',
        message: '',
    });

    useEffect(() => {
        if (auth.token) {
            navigate('/', {replace: true});
            setShowAlert(false);
        }
        return () => {
        };
    }, [auth.token]);

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        auth.signin(form.username, form.password, ({type, message}: AlertParams) => {
            setAlert({type, message});
            setShowAlert(true);
        });
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
            {showAlert && <MessageAlert type={alert.type} message={alert.message} />}
            <div className='flex justify-center m-2'>
                <button className="btn btn-sm btn-primary btn-outline" onClick={onClick}>Login</button>
            </div>
        </form>
    );
}
