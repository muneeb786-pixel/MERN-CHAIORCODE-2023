import React, { useState } from 'react'
import authService from '../../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import {Button, Input,Logo} from '../index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login } from '../../store/authSlice'


function Signup() {
    const {register,handleSubmit} = useForm()
    const navigate = useNavigate();
    const [error,setError]= useState('')
    const dispatch = useDispatch()
    const singup = async (data) =>{
        setError('')
        try {
            const userData = await authService.creatAccount(data)
            if(userData){
                const userData= await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate('/')
            }       
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='flex  items-center justify-center w-full'>
        <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10'>
            <div className='mb-2 flex- justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%'/>
                </span>
            </div>
            <h2 className='mt-2 text-center text-base text-black/60'>Sign Up to create account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Already have any account?&nbsp;
                <Link
                to="/login"
                className='font-medium transition-all duration-200 hover:underline'
                >
                    Sign In
                </Link>
            </p>
            {
                error &&  <p className='text-red-600 mt-8 text-center'>{error}</p>
            }
            <form onSubmit={handleSubmit(singup)} className='mt-8'>
                <div className='space-y-5'>
                    <Input 
                    label="Name:" 
                    placeholder="Enter your name"  
                    type="text" 
                    {...register('name',{
                        require:true,
                    })} 
                    />
                      <Input 
                    label="Email:" 
                    placeholder="Enter your email"  
                    type="email" 
                    {...register('email',{
                        require:true,
                        // validate:{
                        //     matchPatern : (value) =>   /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(value) || "Email address must be a valid address",
                        // }
                    })} 
                    />
                      <Input 
                    label="Password:" 
                    type="password" 
                    {...register('password',{
                        require:true,
                    })} 
                    />
                    <Button type="submit" bgColor='bg-blue-400' className='w-full'>Sign Up</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup