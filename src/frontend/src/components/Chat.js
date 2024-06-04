import React from 'react'
import "./styles/Chatstyles.css"
const Chat = () => {
  return (
    <>
    <div className='chat'>
    
    </div>

    <div className='typing' >

      <input  className="mesaj" placeholder="Scrie un mesaj" />

      <button className="trimite" type="submit">Send</button>

    </div>
    
  </>
  )
}

export default Chat;