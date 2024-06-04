import React from 'react'
import "./styles/Chatstyles.css"
import {useSearchParams} from "react-router-dom"
import {useState, useEffect} from "react"
import DocumentMeta from 'react-document-meta'
import Helmet from 'react-helmet'

const Chat = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [llist, setLlist] = useState([]);
  const [body, setBody] = useState('');
  let texts = [];
  const [clock, setClock] = useState(0);

async function getTexts(user, other) {
  let host = window.location.hostname;
  const url = "http://" + host + ":8080/api/fetch_messages?username1="+user+"&username2="+other+"&body=&tail=0";
  let ffetch = await fetch(url);
  let json = await ffetch.json();
  let list = json.list;
  //console.log(ffetch);
  /*ffetch.then(values =>{
      values.json().then(mess => {
        texts = mess.list;
        console.log(mess.list);
      }).catch(err => console.log(err));
    }
  ).catch(err => console.log(err));
  */
  return list;
}

const GenConvo = (user, other) => {
  const test = [
    {message_body:"hei wasup", sender:"alex"},
    {message_body:"hei bn", sender:"teo"},
    {message_body:"iesim?", sender:"teo"},
    {message_body:"da sure!", sender:"alex"}
  ];
  const llistgen = () => getTexts(user, other).then(
    data => setLlist(data)
  );

  useEffect(() => {
    llistgen()
  }, []);
  //console.log(list);
  if(llist != undefined) {
    console.log('bau');
    llist.map((item,i) => console.log(item));
    return (
    <>
      {
          llist.sort((l1,l2) => l1.time.localeCompare(l2.time)).map((item, i) => {
            console.log(item.message_body);
            if(item.sender === user) {
              return <div className='mesaj' style={{background: '#41C9E2',textAlign: 'right'}}>{item.message_body}</div>
            } else {
              return <div className='mesaj'>{item.sender}: {item.message_body}</div>
            }
          })
      }
    </>
    )
  } else {
    return (
      <></>
    )
  }
}

const sendMessage = async (searchParams, body) => {
  console.log('test');
  const username1 = searchParams.get('user');
  const username2 = searchParams.get('other');
  console.log(body);
  let host = window.location.hostname;
  const url = "http://" + host + ":8080/api/send_message?username1="+username1+"&username2="+username2+"&body="+body+"&tail=0";
  await fetch(url);
  setBody('test');
} 
  const meta = {
    meta: {
      httpEquiv: "Refresh",
      content: "1"
    }
  }

  return (
    <>
    {GenConvo(searchParams.get('user'), searchParams.get('other'))}
    <div className='typing' >
      <input  className="mesaj" placeholder="Scrie un mesaj" onChange={event => {setBody(event.target.value)}} value={body} />
      <button className="trimite" type="submit" onClick={()=>sendMessage(searchParams, body)}>Send</button>
    </div>
    </>
  )
}

export default Chat;
