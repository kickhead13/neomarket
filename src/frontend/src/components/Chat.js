import React from 'react'
import "./styles/Chatstyles.css"

const GenConvo = () => {
  const test = [
    {body:"hei wasup", sender:"alex"},
    {body:"hei bn", sender:"teo"},
    {body:"iesim?", sender:"teo"},
    {body:"da sure!", sender:"alex"}
  ];
  return (
    <>
      {
        test.map((item, i) => {
          if(item.sender === "alex") {
            return <div className='mesaj' style={{background: '#41C9E2','text-align': 'right'}}>{item.body}</div>
          } else {
             return <div className='mesaj'>{item.sender}: {item.body}</div>
          }
        })
      }
    </>
  )
}

const Chat = () => {
    return (
    <>
    {GenConvo()}
    <div className='typing' >

      <input  className="mesaj" placeholder="Scrie un mesaj" />

      <button className="trimite" type="submit">Send</button>

    </div>
    
  </>
  )
}

export default Chat;
