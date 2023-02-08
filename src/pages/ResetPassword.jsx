import { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Logo from '../assets/Insignia_Las_Acacias.png';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../component/Alerta';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import validator from 'validator'
import { AiFillEye,AiFillEyeInvisible  } from "react-icons/ai";
import clienteAxios from '../config/axios';

const ResetPassword = () => {
  
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})
  
  const [emailError, setEmailError] = useState('')
  
  const resetForm = ()   =>{

    setEmail('')
    
  }
  
  
  const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError('')
    } else {
      setEmailError('Ingresa un email valido!')
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    if(email===''|| email.lengthh < 6 ){
        setAlerta({msg:'El Email es obligatorio', error:true})
        return
    }
    try {
        const {data} = await clienteAxios.post('/user/olvide-password', {email})
      
        setAlerta({
            msg:data.msg
        })
    } catch (error) {
        setAlerta({
            msg:error.response.data.msg,
            error:true
        })
    }
    


  };
  
 

  const {msg} = alerta
  return (
    <>
   
    <div className=' min-h-screen py-[2rem] lg:py-[10rem] bg-gradient-to-r from-sky-500 to-indigo-500'>
      <div className=' container mx-auto  '>
        <div className='flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-2lg overflow-hidden drop-shadow-2xl '>
        <div className='w-full lg:w-1/2 flex flex-col items-center justify-center' >
        <div>
        <h2  className='text-3xl mb-5 font-bold text-center'>Bienvenido  <span className=' font-bold text-blue-600'>LBLA Solicitud</span></h2>
        </div>
          <img className= ' object-center object-cover ' src={Logo} alt="" />
   
        
       
        </div>
        <div className='w-full lg:w-1/2 py-16 px-10 border-l-2 '>
          <h2  className='text-3xl mb-4 font-bold text-center'>Olvide mi <span className=' font-bold text-blue-600'>Contraseña</span></h2>
         
          {msg && <Alerta 
          alerta={alerta}/>}

        <form onSubmit={handleSubmit}>
          <div className=' mx-2 '>
       


        <div className='my-5'>
          <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Email:</label>
          
          <input className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type="text"
           placeholder='Email' value={email} onChange={e => {setEmail(e.target.value); validateEmail(e)}}  />
          <div>
          <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{emailError}</span>
          </div>
          
        </div>

     

        <div className='grid grid-cols-2 mt-2'>
    <Link className='flex justify-center hover:text-blue-300 duration-150' to="/user">¿Ya tienes cuenta? Iniciar Sesión</Link>
      <Link className='flex justify-center hover:text-blue-300 duration-150 ml-2' to='/registrarUsuario'>¿No tienes cuenta? Registrare</Link>
              </div>
        <div className='flex justify-center mt-5'>
        
        <input type="submit" value="Enviar" className='duration-150   hover:bg-indigo-400 border-blue-600 border-2
         w-full font-mono lg:w-[10rem] py-3 rounded-xl hover:cursor-pointer text-blue-600 hover:text-white uppercase'/>
        
        </div>
        
        
    </div>
    </form>
        </div>
        </div>
      </div>
    </div>
  
    </>
  )
}

export default ResetPassword