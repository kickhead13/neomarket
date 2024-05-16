import React from 'react'
import "./styles/Chatstyles.css"
import {useSearchParams} from "react-router-dom"
import {useState} from "react"

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
            return <div className='mesaj' style={{background: '#41C9E2',textAlign: 'right'}}>{item.body}</div>
          } else {
             return <div className='mesaj'>{item.sender}: {item.body}</div>
          }
        })
      }
    </>
  )
}

const sendMessage = async (searchParams, body) => {
  const username1 = searchParams.get('user');
  const username2 = searchParams.get('other');
  console.log(body);
  let host = window.location.hostname;
  const url = "http://" + host + ":8080/api/send_message?username1="+username1+"&username2="+username2+"&body="+body+"&tail=0";
  await fetch(url);
}

const Chat = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [body, setBody] = useState('');
  return (
    <>
    {GenConvo()}
    <div className='typing' >
      <input  className="mesaj" placeholder="Scrie un mesaj" onChange={event => {setBody(event.target.value)}} value={body} />
      <button className="trimite" type="submit" onClick={()=>sendMessage(searchParams, body)}>Send</button>
    </div>
    </>
  )
}

export default Chat;
