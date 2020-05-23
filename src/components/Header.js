import React from 'react'
import {Link} from 'react-router-dom'


const Header = () => (
    <header className="header">
     
       
      <Link  to="/">
      <h1 className="title">Expensify</h1>
      </Link>
      
     
    </header>
  )

  export default Header