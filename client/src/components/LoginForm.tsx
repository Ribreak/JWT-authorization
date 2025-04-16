import { useState } from "react"
import Login from "./Login";
import Register from "./Register";
import '../styles/common.css'

const LoginForm = () => {
    const [option, setOption] = useState<string>('');

    if (option === 'login') return (<Login backfn={returnBack}></Login>);

    if (option === 'registration') return (<Register backfn={returnBack}></Register>);

    function returnBack() {
        setOption('');
    }

    return (
        <div className='main'>
            <h1>Выберите действие</h1>
            <div className="buttonGroup">
                <button onClick={() => setOption('login')}>Вход</button>
                <button onClick={() => setOption('registration')}>Регистрация</button>
            </div>
        </div>
    )
}

export default LoginForm