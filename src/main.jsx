import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import ReactDOM from "react-dom/client"
import './index.css'
import App from './App.jsx'
import { DataProvider } from './components/DataProvider/DataProvider'
// import { reducer, initialState } from './Utility/reducer.js';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </StrictMode>
);
