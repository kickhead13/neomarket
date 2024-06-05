import React from 'react'
import "./UserProduct.css"

const UserProduct = ({comment}) => {
    return (
    
        <div key={comment.id} className="comment">
          <div className="comment-image-container">
            <img src={comment.image} />
          </div>
          <div className="comment-right-part">
            <div className="comment-content">
              <div className="comment-author">{comment.product}</div>
            </div>
              <div className="comment-text">
                {comment.body}
              </div>
          </div>
        </div>
      );
}

export default UserProduct