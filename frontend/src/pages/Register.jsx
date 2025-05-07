import React, {useState, useContext} from 'react'

import { Link, useNavigate } from 'react-router-dom'
import {AiOutlineUserAdd} from "react-icons/ai"

import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'

export const Register = () => {
  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined
  })

  const handleChange = e =>{
    setCredentials(prev =>({...prev, [e.target.id]:e.target.value}) )
  }

  const handleClick = async e =>{
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers:{
          "content-type": "application/json"
        }, 
        body: JSON.stringify(credentials)
      })
      const result = await res.json();
      if(!res.ok){
        alert(result.message);
        navigate("/register");
        return;
      } 
      dispatch({type:"REGISTER_SUCCESS"});
      navigate("/login")
    } catch (err) {
      alert(err.message)
    };
  }

  return (
    <div className='w-full custom-height flex items-center justify-center text-white font-light bg-gradient-to-b from-lightGreen to-white'>       
        <div className="authContainer">
            <AiOutlineUserAdd className='h-14 w-auto'/>
            <h2>Đăng ký</h2>
            <p>Bạn đã có tài khoản? <Link to="/login" className='text-white font-bold no-underline'>Đăng nhập</Link></p>
            <form className='flex flex-col'>
              <input type="text" name="name" id="username" placeholder='Tên đăng nhập' onChange={handleChange} className='my-3 rounded p-2 bg-lightGreen'/>
              <input type="email" name="email" id="email" placeholder='Email' onChange={handleChange}/>
              <input type="password" name="password" id="password" placeholder='Mật khẩu' onChange={handleChange}/>
              <button type="submit" onClick={handleClick} className='submitButton'>Đăng ký</button>
            </form>
        </div>
    </div>    
  )
}
