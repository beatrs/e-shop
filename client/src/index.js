import './styles.scss'
import App from './App'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'

import { PersistGate } from 'redux-persist/integration/react'
import { createRoot } from 'react-dom/client'

// ALERT
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    
    <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
        </AlertProvider>
    </Provider>
)
