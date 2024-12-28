import React from 'react'

function Demo({setView}) {
  return (
    <div>
        <button onClick={()=>setView(false)}>Hide</button>
    </div>
  )
}

export default Demo
