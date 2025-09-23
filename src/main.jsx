import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from '../src/components/DataProvider/DataProvider.jsx'
import  { initialState } from '../src/Utility/reducer.js'
import { reducer } from './Utility/reducer.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider initialState={initialState} reducer={reducer}>
      <App />
    </DataProvider>
  </StrictMode>,
)
