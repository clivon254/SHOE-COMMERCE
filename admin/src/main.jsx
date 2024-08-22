import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import App from './App.jsx'
import './index.css'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from './components/ThemeProvider.jsx'
import  StoreContextProvider  from './context/Store.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider  store={store}>

      <PersistGate loading={null} persistor={persistor}>
        
        <StoreContextProvider>

          <ThemeProvider>

            <App />
          
          </ThemeProvider>

         </StoreContextProvider>
      
      </PersistGate>

    </Provider>

  </StrictMode>,
)
