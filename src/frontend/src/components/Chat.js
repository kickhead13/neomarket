import React from 'react'
import "./styles/Chatstyles.css"
const Chat = () => {
  return (
    <>
    
    <div className='mesaj' style={{background: '#41C9E2','text-align': 'right'}}>test</div>
    <div className='mesaj'>test2</div>
    <div className='typing' >

      <input  className="mesaj" placeholder="Scrie un mesaj" />

      <button className="trimite" type="submit">Send</button>

    </div>
    
  </>
  )
}

export default Chat;
