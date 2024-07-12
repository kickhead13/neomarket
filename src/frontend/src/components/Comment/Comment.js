import React from 'react'
import "./Comment.css"
import { Link, useSearchParams, useNavigate } from 'react-router-dom'

const Comment = ({comment}) => {
  return (
    
      <div key={comment.user} className="comment">
        <div className="comment-right-part">
          <div className="comment-content">
            <div className="comment-author">
              <Link to={"/account?user="+comment.user+"&profile="+comment.user}>{comment.user}</Link>
            </div>
            <div className="comment-text">
              {comment.body}
            </div>
          </div>
        </div>
      </div>
    );
  
}

export default Comment
