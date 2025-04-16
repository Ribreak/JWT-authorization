import { useContext, useState } from 'react'
import { Context } from '../main';
import UserService from '../services/UserService';
import { IUser } from '../models/IUser';
import { observer } from 'mobx-react-lite';
import '../styles/common.css'

const Profile = () => {
    const {store} = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    async function getUsers() {
        try {
          const response = await UserService.fetchUsers();
          setUsers(response.data);
        }  catch (e) {
          console.log(e);
        }
      }

    return (
        <div className='main'>
            <h1>{store.user.isActivated ? 'Аккаунт активирован' : 'Аккаунт не активирован'}</h1>
            <div className='buttonGroup'>
                <button onClick={() => store.logout()}>Выйти</button>
                <button onClick={getUsers}>Получить пользователей</button>
            </div>
            {users.map(user => <div key={user.email}>{user.email}</div>)}
        </div>
    )
}

export default observer(Profile)