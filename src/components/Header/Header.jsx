import React from "react";
import PageNavigation from "../PageNavigation";
import './Header.styles.css';

function Header() {
  
  return (
    <div className="header">
      <h1>Library Management System</h1>
      <PageNavigation />
    </div>
  )
}

export default Header;