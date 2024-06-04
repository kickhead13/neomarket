import React from 'react'
import "./Comment.css"
import { useState } from "react";

const CommentForm = ({submitLabel, initialText = ""}) => {

    const [text, setText] = useState(initialText);
    return (
       <>
       <div className='commentform'>
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="comment-form-button" >
        {submitLabel}
      </button>
      </div>
       </>
      );
}

export default CommentForm