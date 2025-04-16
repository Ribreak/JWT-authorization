import { useContext, useEffect } from 'react'
import './App.css'
import { Context } from './main';
import { observer } from 'mobx-react-lite';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';

function App() {
  const {store} = useContext(Context);
  
  useEffect(() => {
    if(localStorage.getItem('token')) {
        store.checkAuth();
    }
  }, [])

  if (store.isLoading) {
    return <div>Загрузка...</div>
  }

  if (!store.isAuth) {
    return (
      <LoginForm />
    )
  }
   
  return (
    <Profile />
  )
}

export default observer(App)
