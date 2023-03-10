import { useState } from 'react';
import { BsArrowLeftShort } from "react-icons/bs";
import { MdLogout, MdOutlineContentPaste, MdOutlineSpaceDashboard, MdChromeReaderMode,MdTextSnippet
,MdNoteAdd } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import logo from '../assets/Insignia_Las_Acacias.png'
import { Link, NavLink } from 'react-router-dom';

import useAuth from '../hooks/useAuth';





 

const Sidebar = (props) => {

  const {cerrarSesion} = useAuth()
   
   const Menus = [
      {tittle: "Dashboard", icon:<MdOutlineSpaceDashboard/>, link: "/admin" },
      {tittle:"Agregar Usuario",icon:<FiUserPlus/>, link:"/admin/add-user" },
      {tittle:"Agregar Curso ", icon:<MdChromeReaderMode/>, link:"/admin/add-curso" },
      {tittle:"Agregar Asignatura ", icon:<MdTextSnippet/>, link:"/admin/add-asigna" },
      {tittle:"Agregar Tipo de Insumo ", icon:<MdNoteAdd/>, link:"/admin/add-tipo" },
      {tittle:"Solicitudes", icon:<MdOutlineContentPaste/>, spacing: true, link:"/admin/ver-soli" },
      {tittle:"Cerrar Sesión", icon:<MdLogout/>, danger:true,  onClick: cerrarSesion},
    ]
 
 
    return (
      
      
        
<>
<div className='flex '>
    <div  className={`bg-slate-100  border-r border-black h-full p-5 pt-8 ${props.open ? "w-20" : "w-20 md:w-72 lg:w-72" }
     fixed duration-300 `}>
      <BsArrowLeftShort  className={`text-black bg-white 
      rounded-full text-3xl absolute -right-3 top-9 border
       border-black cursor-pointer ${props.open?  "rotate-180 max-sm:hidden": "max-md:hidden"}  `}
      onClick={props.handleClick}/>
     <div className='inline-flex'>
        <img className={`object-center duration-500  ${props.open ? "ml-0  " && "rotate-[360deg] "  : "md:ml-7 lg:ml-7 "} `} src={logo} alt="" />
      </div>
     
      <ul className='pt-2'>
      {Menus.map((menu, index)=>(
        <>
         <Link key={index} to={menu.link} onClick={menu.onClick}>
        <li   className={`text-black text-sm flex items-center gap-x-4 cursor-pointer 
        p-2 hover:bg-gray-500 rounded-md ${menu.spacing ? "mt-9": "mt-2"} ${menu.danger && "text-red-500"}`}>
        <span className='text-2xl block float-left'>
           {menu.icon}
          </span>
          <span className={`text-base font-medium flex-1 duration-200 ${props.open ?  " hidden hover:bg-black  hover:visible" : "max-md:hidden "} ${menu.danger && "text-red-400"}`}>
           {menu.tittle} </span>
           
    
   

        </li>
        </Link>
        </>
      ))}

      </ul>

    </div>
     
     
      {/* <div className={`flex flex-col  h-screen w-full ${open ? "pl-24 pt-2": "pl-[19rem]"}`}>
        
     <div className='flex-grow bg-black'>
     
     </div>
 
    
    <footer className='bg-gray-300  text-center p-4'>
   LBLB &copy; Creado por brayan
   </footer> */}
   
   {/* </div> */}
   </div>

  
</>

     
      
    )
}

export default Sidebar;