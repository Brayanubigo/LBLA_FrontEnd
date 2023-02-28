import { Breadcrumb, Layout, Menu, theme } from 'antd';
import useAuth from '../hooks/useAuth';
import { Avatar, Badge } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { MdNotifications } from "react-icons/md";
const Nav = () => {
  const [count , setCount] = useState(0)
  const [datos,setDatos] = useState([])
  const {auth } = useAuth();
 
  // useEffect(() => {
  //   obtenerDatos()
  //   }, []);

  //   const obtenerDatos = async (e) =>{
  //     const url = '/soli/perfil'
  //       const res = await axios.get(url)

  //       setDatos(res.data)
  //   }
    
  return (
    
    <>
    <div>
    <header className='  bg-gradient-to-r from-cyan-500 to-blue-500 shadow-2xl w-full '>
      
      <div className='text-end font-bold flex flex-col  mr-6 justify-center h-20'>
      
      <h2 className='text-xl uppercase'> 
      <button type="button" className="mr-4 relative inline-flex items-center p-3 text-sm 
      font-medium text-center text-white bg-blue-700 rounded-lg
       hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <MdNotifications/>
      <span className="sr-only">Notifications</span>
      <div className=" absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">20</div>
          </button>
            Bienvenid@ {auth.nombre}
            
            </h2>
      
        </div>
        <div>
       
        </div>
    </header>
    </div>
    
      </>
      
    
  )
}

export default Nav