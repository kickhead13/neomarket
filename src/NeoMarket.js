import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onButtonClick = () => {
   navigate('/login')
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome to NeoMarket!</div>
      </div>
      <div className='buttonContainer2'>
        <input
          className='inputButton2'
          type="button"
          onClick={onButtonClick}
          value={'Get Started'}
        />
    
      </div>
    </div>
  )
}

export default Home