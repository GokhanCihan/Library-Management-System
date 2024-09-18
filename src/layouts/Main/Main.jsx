import React from "react";
import Header from "../../components/Header";

function Main({children}) {
  
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Main