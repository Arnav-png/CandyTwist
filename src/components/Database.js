import React, { useState, useEffect } from 'react'


const Database = () => {

  const [DATA, setDATA] = useState({
    User: "ARNAV",
    Score: 45
  })

  const [inpData, setinpData] = useState("")


  return (
    <div>
      {console.log(inpData)}
      <input type="text" onChange={e => setinpData(e.target.value)} />
      <button> click me</button>
    </div>
  )
}

export default Database
