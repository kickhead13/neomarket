import React from 'react'
import "./styles/Itemstyles.css"
import { Link } from 'react-router-dom'
const Item = (props) => {
  return (
    <div className='item'><Link to={`/product/${props.link}`}>
        <img src={props.image} alt="" />
        <p>{props.title}</p>
        <div className='description'>
            {props.description}
        </div>
        <div className='item-price'>
            {props.price} RON
        </div>
        </Link>
    </div>
  )
}

export default Item