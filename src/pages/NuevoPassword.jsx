import { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Logo from '../assets/Insignia_Las_Acacias.png';
import { Link, useParams } from 'react-router-dom';
import Alerta from '../component/Alerta';
import axios from 'axios';
import Password from 'antd/es/input/Password';
import { AiFillEye,AiFillEyeInvisible  } from "react-icons/ai";
import clienteAxios from '../config/axios';

const NuevoPassword = () => {
  
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [mostrar , setMostrar] = useState(false)
  
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  const {token}= params
  useEffect(() =>{
    const comprobrarToken = async() =>{
      try {
        await clienteAxios(`/user/olvide-password/${token}`)
        setAlerta({
          msg: 'Coloca tu nueva Nueva contraseña'
        })
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg:'Hubo un error con el enlace',
          error: true
        })
      }
    } 
    comprobrarToken()
  },[])
  
  const resetForm = ()   =>{

    setEmail('')
    
  }
  


  const handleSubmit = async (e) => {
    e.preventDefault()
    if(password.length< 4 ){
        setAlerta({msg:'La Contraseña debe ser minimo 4 caracteres', error:true})
        return
    }
    try {
      const url =`/user/olvide-password/${token}`
      const {data} = await clienteAxios.post(url, {password})
      console.log(data)
      setAlerta({
        msg:data.msg
      })
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({msg:error.response.data.msg, error:true})
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
          <h2  className='text-3xl mb-4 font-bold text-center'>Restablece tu <span className=' font-bold text-blue-600'>Contraseña</span></h2>
         
          {msg && <Alerta 
          alerta={alerta}/>}
          {tokenValido  && (
 <form onSubmit={handleSubmit}>
 <div className=' mx-2 '>



<div className='my-5'>
 <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Nueva Contraseña:</label>
 
 <input className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type={mostrar ? "text": "password"}
  placeholder='Nueva Contraseña' value={password} onChange={e => setPassword(e.target.value)}  />
  <div className='inline-flex absolute ' onClick={() => setMostrar(!mostrar) }>
            {mostrar ? <AiFillEyeInvisible className='  mt-5 cursor-pointer  
            items-center text-2xl leading-5'/> :<AiFillEye className=' mt-5 cursor-pointer  items-center text-2xl leading-5'/>}
            </div>
 
</div>




<div className='flex justify-center mt-5'>

<input type="submit" value="Guardar nueva Contraseña" className=' duration-150   hover:bg-indigo-400 border-blue-600 border-2
w-full font-mono lg:w-[15rem] py-3 rounded-xl hover:cursor-pointer text-blue-600 hover:text-white uppercase'/>

</div>
{passwordModificado && 
(<Link className='flex justify-center  hover:text-blue-300 duration-150 mt-5 '
 to="/user">Iniciar Sesión</Link>)}


</div>
</form>
          )}

       
        </div>
        </div>
      </div>
    </div>
  
    </>
  )
}

export default NuevoPassword