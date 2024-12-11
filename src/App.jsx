import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import EntriesList from "./components/databaseTable";

function App() {
  const [count, setCount] = useState(0)


  const idk = ()=>{
    return(
      <>
      <p>good stuff...</p>
      </>
    )
  }
  return (
    <>
    <Routes>
          <Route path="/" exact element={idk()} />
          <Route path="/database" exact element={<EntriesList/>} />
        </Routes>
    </>
  )
}

export default App