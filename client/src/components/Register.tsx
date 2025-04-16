import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Context } from '../main';
import '../styles/common.css'

interface RegisterProps {
    backfn: React.MouseEventHandler
}

const Register = (props: RegisterProps) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [checkPassword, setCheckPassword] = useState<string>('');
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [validPassword, setValidPassword] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const { store } = useContext(Context);

    function showPassword () {
        setPasswordShown(!passwordShown);
    }

    function handleCheckPassword (input: string) {
        setCheckPassword(input);
        if (input !== password) {
            setValidPassword(false);
        } else { 
            setValidPassword(true)
        };
    }

    async function handleRegister () {
        if (password === checkPassword) {
            const response = await store.registration(email, password);
            setError(response);
        }
        else setValidPassword(false);
    }

    return (
        <div className='main'>
            <h1>Введите свой email и придумайте пароль</h1>
            <div className='inputGroup'>
                <h2>Введите email</h2>
                    <input
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type='text'
                        placeholder='Email'
                    />
                <h2>Введите пароль</h2>
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type={passwordShown ? 'text' : 'password'}
                    placeholder='Password'
                />
                <h2>Введите пароль ещё раз</h2>
                <input
                    onChange={e => handleCheckPassword(e.target.value)}
                    value={checkPassword}
                    type={passwordShown ? 'text' : 'password'}
                    placeholder='Password'
                />
                <p className='error passwordError' style={{display: validPassword ? 'none' : 'block'}}>Пароли не совпадают</p>
                <button className='passwordButton' onClick={showPassword}>Показать пароль</button>
            </div>
            {(error.length > 0) && <p className='error'>Ошибка! {error}</p>}
            <div className='buttonGroup'>
                <button onClick={handleRegister}>Зарегистрироваться</button>
                <button onClick={props.backfn}>Назад</button>
            </div>
            
        </div>
    )
}

export default observer(Register)