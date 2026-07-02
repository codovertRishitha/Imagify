import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const [state, setState] = useState('Login')
    const {setShowLogin, backendUrl, setToken, setUser}=useContext(AppContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
    e.preventDefault();

    console.log("State:", state);

    try {

        let data;

        if (state === "Login") {

            const response = await axios.post(
                backendUrl + "/api/user/login",
                {
                    email,
                    password
                }
            );

            data = response.data;

        } else {

            const response = await axios.post(
                backendUrl + "/api/user/register",
                {
                    name,
                    email,
                    password
                }
            );

            data = response.data;

        }

        console.log("Response:", data);

        if (data.success) {

            setToken(data.token);
            setUser(data.user);
            localStorage.setItem("token", data.token);
            setShowLogin(false);

        } else {

            toast.error(data.message);

        }

    } catch (error) {

        console.log(error);
        toast.error(error.response?.data?.message || error.message);

    }
};

    useEffect(()=>{
       document.body.style.overflow='hidden'; 
       return ()=>{
        document.body.style.overflow='unset'; 
       }
    },[])
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <motion.form onSubmit={onSubmitHandler} initial={{opacity:0.2, y: 100}} transition={{ duration:1}} whileInView={{opacity: 1, y:0}} viewport={{once:true}}
      className='absolute bg-white p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>Sign Up</h1>
        <p className='text-sm'>Welcome back! Please sign in to continue</p>
        {state!=='Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
            <img src={assets.profile_icon} className='w-8 h-8' alt="" />
            <input onChange={e => setName(e.target.value)} value={name} type="text" className='outline-none text-sm' placeholder='Full Name' required/>
        </div>}
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img src={assets.email_icon} className='w-8 h-8' alt="" />
            <input onChange={e => setEmail(e.target.value)} value={email} type="email" className='outline-none text-sm' placeholder='Email id' required/>
        </div>
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img src={assets.lock_icon} className='w-8 h-8' alt="" />
            <input onChange={e => setPassword(e.target.value)} value={password} type="password" className='outline-none text-sm' placeholder='Password' required/>
        </div>
        <p className='text-sm text-blue-600 my-4'>Forgot Password?</p>
        <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full'>{state==='Login'? 'Login' : 'create account'}</button>
        {state==='Login'? <p className='mt-5 text-ceter'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Sign Up')}>Sign Up</span></p>
        : <p className='mt-5 text-ceter'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Login')}>Login</span></p>}
      <img onClick={()=>setShowLogin(null)} src={assets.cross_icon} alt=""className='absolute top-5 right-5 cursor-pointer'/>

      </motion.form>
    </div>
  )
}

export default Login
