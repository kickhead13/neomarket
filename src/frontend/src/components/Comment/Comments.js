import React from 'react'
import "./Comment.css"
import CommentForm from './CommentForm';
import { useState, useEffect } from "react";
import Comment from './Comment';

const Comments = () => {


  const getComments = async () => {
    return [
      {
        id: "1",
        body: "First comment",
        username: "Jack",
        parentId: null,
       
      },
      {
        id: "2",
        body: "Second comment",
        username: "John",
        parentId: null,
        
      },
      {
        id: "1",
        body: "First comment",
        username: "Jack",
        parentId: null,
       
      },
      {
        id: "2",
        body: "Second comment",
        username: "John",
        parentId: null,
       
      },
    ];
  };

  const [backendComments, setBackendComments] = useState([]);
  useEffect(() => {
    getComments().then((data) => {
      setBackendComments(data);
    });
  }, []);

  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );


    return (
      <>
        <div className="comments">
          <h3 className="comments-title">Comments</h3>
          {rootComments.map((rootComments) => (
            <Comment key={rootComments.id} comment={rootComments}/>
          ))}
          <div className="comment-form-title">Write comment</div>
          <CommentForm submitLabel="Send" />
          <div className="comments-container">
          
          </div>
        </div>
        </>
      )
}

export default Comments
