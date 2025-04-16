import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { observer } from 'mobx-react-lite';
import '../styles/common.css'

interface LoginProps {
    backfn: React.MouseEventHandler
}

const Login = (props: LoginProps) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { store } = useContext(Context);

    async function handleLogin() {
        const response = await store.login(email, password);
        setError(response);
    }

    return (
        <div className='main'>
            <h1>Введите логин и пароль</h1>
            <div className='inputGroup'>
                <input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type='text'
                    placeholder='Email'
                />
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type='text'
                    placeholder='Password'
                />
            </div>
            {(error.length > 0) && <p className='error'>Ошибка! {error}</p>}
            <div className='buttonGroup'>
                <button onClick={handleLogin}>Войти</button>
                <button onClick={props.backfn}>Назад</button>
            </div>
            
        </div>
    )
}

export default observer(Login)