import React from 'react'
import Header from '../Header/Header.jsx';




const LayOut = ({ children }) => {
  return (
    <div style={{ overflow: 'visible'}}>
      <Header />
        {children}
    </div>
  )
}

export default LayOut