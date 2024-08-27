import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.jsx'
import ThemeProvider from './components/ThemeProvider.jsx'
import StoreContextProvider from './context/Store.jsx'
import './index.css'
import { persistor, store } from './redux/store.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <PersistGate loading={null} persistor={persistor}>
      
      <Provider  store={store}>

        <StoreContextProvider>

          <ThemeProvider>

            <App />
          
          </ThemeProvider>

          </StoreContextProvider>

      </Provider>

    </PersistGate>

  </StrictMode>,
)
