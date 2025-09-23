import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client"
import './index.css'
import App from './App.jsx'
import { DataProvider } from '../src/components/DataProvider/DataProvider.jsx'
// import  { initialState } from '../src/Utility/reducer.js'
// import { reducer } from './Utility/reducer.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider >
      <App />
    </DataProvider>
  </StrictMode>,
)
