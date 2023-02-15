import { useState, useEffect } from 'react';

import Logo from '../assets/Insignia_Las_Acacias.png';
import { Link, useNavigate, useParams} from 'react-router-dom';
import Alerta from '../component/Alerta'
import axios from 'axios';
import clienteAxios from '../config/axios';

const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})
    const params = useParams()
  const {id} = params


    useEffect(() =>{
        const confirmarCuenta = async () =>{
            try {
                const url=  `/user/confirmar/${id}`
               const {data} = await clienteAxios(url)
               setCuentaConfirmada(true)
               setAlerta({
                msg:data.msg
               })
            } catch (error) {
                // setAlerta
                // ({msg:error.response.data.msg,
                // error:true})
            }
            setCargando(false)
        }
        confirmarCuenta();
  },[])
  
   

 

  const {msg} = alerta
  return (
    <>
   
    <div className=' min-h-screen py-[4rem] lg:py-[14rem] bg-gradient-to-r from-sky-500 to-indigo-500'>
      <div className=' container mx-auto '>
        <div className='flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-2lg overflow-hidden drop-shadow-2xl '>
        <div className='w-full lg:w-1/2 flex flex-col items-center justify-center' >
        <div>
        <h2  className='text-3xl mb-5 lg:mt-20 font-bold text-center'>Bienvenido <span className=' font-bold text-blue-600'>LBLA Solicitud</span></h2>
        </div>
          <img className= ' object-center object-cover lg:mb-20 ' src={Logo} alt="" />
   
        
       
        </div>
        <div className='w-full lg:w-1/2 py-16 px-10 border-l-2 '>
          <h2  className='text-3xl mb-4 lg:mt-20 font-bold text-center'>Confirma tu   <span className=' font-bold text-blue-600'>Cuenta</span></h2>
         
          {!cargando && <Alerta 
          alerta={alerta}/>}

          {cuentaConfirmada && (
            <Link className='mt-5 flex justify-center font-bold' to="/user">Iniciar Sesión </Link>
          )}
           </div>
            </div>
    </div>
    </div>
  
    </>
  )
}

export default ConfirmarCuenta