import { useState } from 'react';

import Logo from '../assets/Insignia_Las_Acacias.png';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../component/Alerta';

import validator from 'validator'

import clienteAxios from '../config/axios';
import {Box, Button, TextField } from '@mui/material';
const ResetPassword = () => {
  
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    error: false,
    message:""
  })
  
const validateEmail=(email) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regex.test(email);
};

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  


  const handleSubmit = async (e) => {
  
    e.preventDefault()
    if (!validateEmail(email)) {
      setError({
        error: true,
        message: "El email no es valido",
      });
      return;
    }else{
      setError({
        error: false,
        message: "",
      });
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

        <Box component="form" onSubmit={handleSubmit}>
          <div className=' mx-2 '>
       


        <div className='my-5'>
        
          
          <TextField   label="Email" variant="outlined" 
        value={email}
        onChange={e => setEmail(e.target.value.toLowerCase())} 
        helperText={error.message}
        type="email"
        required
        
        error={error.error}/>
          <div>
          </div>
          
        </div>

     

        <div className='grid grid-cols-2 mt-2'>
    <Link className='flex justify-center hover:text-blue-300 duration-150' to="/user">¿Ya tienes cuenta? Iniciar Sesión</Link>
      <Link className='flex justify-center hover:text-blue-300 duration-150 ml-2' to='/registrarUsuario'>¿No tienes cuenta? Registrare</Link>
              </div>
        <div className='flex justify-center mt-5'>
        
        <Button variant="contained" type='submit' size="large">Enviar</Button>
        
        </div>
        
        
    </div>
    </Box>
        </div>
        </div>
      </div>
    </div>
  
    </>
  )
}

export default ResetPassword