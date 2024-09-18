import React from "react";
import './Header.styles.css';

function Header() {
  
  return (
    <div className="header">
      <h1>Library Management System</h1>
      <ul className="navigation">
        <li>Books</li>
        <li>Categories</li>
        <li>Publishers</li>
        <li>Borrowing</li>
        <li>Authors</li>
      </ul>
    </div>
  )
}

export default Header;