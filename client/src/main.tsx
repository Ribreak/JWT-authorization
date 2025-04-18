import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Store from './store/store.ts'

interface State {
  store: Store
}

const store = new Store();

export const Context = createContext<State>({store})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Context.Provider value={{store}}>
      <App />
    </Context.Provider>
  </StrictMode>
)
