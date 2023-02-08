import { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Logo from '../assets/Insignia_Las_Acacias.png';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../component/Alerta'
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import validator from 'validator'
import { AiFillEye,AiFillEyeInvisible  } from "react-icons/ai";
import clienteAxios from '../config/axios';

const Registrar = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [alerta, setAlerta] = useState({})
  const [mostrar , setMostrar] = useState(false)
  
  const [emailError, setEmailError] = useState('')
  
  const resetForm = ()   =>{
    setNombre(''),
    setEmail(''),
    setPassword(''),
    setRepetirPassword('')
  }
  
  
  const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError('Email valido')
    } else {
      setEmailError('Ingresa un email valido!')
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    if([nombre, password, email,repetirPassword].includes('')){
        setAlerta({msg:'Todos los campos son obligatorios', error:true})
        return
    }
    if(password !== repetirPassword){
        setAlerta({msg: 'Las contraseñas no son iguales', error:true})
        return
    }
    
  
    
        try{
          
            const url = '/user'
            const {data} = await clienteAxios.post(url, {nombre,email, password})
            Swal.fire({
                title:'Cuenta creada!',
                text:'Revisa tu email para confirmar la cuenta',
                icon:'success'
            }
               
              )

              resetForm()
            console.log(data)
          }catch(error){
            setAlerta({
              msg: error.response.data.msg,
              error:true
            })
      
       
          }

    
  };
  
 

  const {msg} = alerta
  return (
    <>
   
    <div className=' min-h-screen py-[3rem] bg-gradient-to-r from-sky-500 to-indigo-500'>
      <div className=' container mx-auto  '>
        <div className='flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-2lg overflow-hidden drop-shadow-2xl '>
        <div className='w-full lg:w-1/2 flex flex-col items-center justify-center' >
        <div>
        <h2  className='text-3xl mb-5 font-bold text-center'>Bienvenido  <span className=' font-bold text-blue-600'>LBLA Solicitud</span></h2>
        </div>
          <img className= ' object-center object-cover ' src={Logo} alt="" />
   
        
       
        </div>
        <div className='w-full lg:w-1/2 py-16 px-10 border-l-2 '>
          <h2  className='text-3xl mb-4 font-bold text-center'>Registra tu  <span className=' font-bold text-blue-600'>Cuenta</span></h2>
         
          {msg && <Alerta 
          alerta={alerta}/>}

        <form onSubmit={handleSubmit}>
          <div className=' mx-2 '>
          <div className='my-5'>
          <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Nombre completo:</label>
          
          <input className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type="text"
           placeholder='Tu Nombre' value={nombre} onChange={e => setNombre(e.target.value)} />
          
        </div>


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

        <div className='my-5'>
          <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Contraseña:</label>
          
          <input className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type={mostrar ? "text": "password"}
           placeholder='Tu Contraseña' value={password} onChange={e => setPassword(e.target.value)} />
                  <div className='inline-flex absolute ' onClick={() => setMostrar(!mostrar) }>
            {mostrar ? <AiFillEyeInvisible className='  mt-5 cursor-pointer  
            items-center text-2xl leading-5'/> :<AiFillEye className=' mt-5 cursor-pointer  items-center text-2xl leading-5'/>}
            </div>
        </div>
        <div className='my-5 real '>
          <label className=' uppercase text-gray-600 block  font-mono ' htmlFor="">Repetir contraseña:</label>
          
          <input className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type={mostrar ? "text": "password"}
           placeholder='Tu Contraseña' value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} />
            <div className='inline-flex absolute ' onClick={() => setMostrar(!mostrar) }>
            {mostrar ? <AiFillEyeInvisible className='  mt-5 cursor-pointer  
            items-center text-2xl leading-5'/> :<AiFillEye className=' mt-5 cursor-pointer  items-center text-2xl leading-5'/>}
            </div>
           
        
    
         
        
        </div>
        <div className='grid grid-cols-2 mt-2'>
    <Link className='flex justify-center  hover:text-blue-300 duration-150 ' to="/user">¿Ya tienes cuenta? Iniciar Sesión</Link>
      <Link className='flex justify-center  hover:text-blue-300 duration-150 ml-2' to='/olvide-password'>¿Olvidaste la contraseña?</Link>
              </div>
        <div className='flex justify-center mt-5'>
        
        <input type="submit" value="Registrar" className=' duration-150   hover:bg-indigo-400 border-blue-600 border-2
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

export default Registrar