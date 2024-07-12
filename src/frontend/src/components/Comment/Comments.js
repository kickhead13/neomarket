import React from 'react'
import "./Comment.css"
import CommentForm from './CommentForm';
import { useState, useEffect } from "react";
import Comment from './Comment';

const Comments = (pId, state, setState) => {

  console.log('heeeeui '+pId.pId);
  const getComments = async () => {
    var data_products=[];
    var api_data;
    var data;
    const apiUrl='https://'+window.location.hostname+':8443/api/fetch_comms_from_post?post='+pId.pId.replace("+","!");
    api_data = await fetch(apiUrl).catch(function(err){console.log(err);});
    if(!api_data){
        return false;
    }
    data= await api_data.json().catch(function(err){console.log(err);return false;});
    if(!data){
        return false;
    }
    let comms=data['list'];
    console.log(comms);
    return comms;
 
  }
  const [backendComments, setBackendComments] = useState([]);
  useEffect(() => {
    getComments().then((data) => {
      setBackendComments(data);
    });
  }, []);

  console.log("????" + pId.pId);
    return (
      <>
        <div className="comments">
          <h3 className="comments-title">{"Comments("+backendComments.length+")"}</h3>
          {backendComments.map((comm, i) => (
            <Comment key={comm.user} comment={comm}/>
          ))}
          <div className="comment-form-title">Write comment</div>
          <CommentForm submitLabel="Send" pId={pId} state={state} setState={setState}/>
          <div className="comments-container">
          
          </div>
        </div>
        </>
      )
}

export default Comments
