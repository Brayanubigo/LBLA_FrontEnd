import { Space, Table, Tag } from 'antd';
import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
const ContentsAddCur = (props) => {
  const [open, setOpen] = useState(false)
  const [nombre, setNombre] = useState('')
  const [profesor, setProfesor] = useState('')
  const [datos, setDatos] =useState([])
  
  useEffect(() => {
    obtenerDatos()
    }, []);

  const handleClick = () =>{
    setOpen(!open);
 }

 const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const resetForm = () =>{
  setNombre(""),
  setProfesor("")
}


async function  eliminar(id) { 
  const res = await clienteAxios.get(`/curso/eliminar/${id}`).then((res) =>{
    console.log(id)
    
    
    Toast.fire({
      icon: 'success',
      title: 'Eliminado exitosamente'
    })
    obtenerDatos()
    
  }).catch((err)=>{
    
  })
  
}


const obtenerDatos = async (e) =>{
  const url = '/curso/perfil'
    const res = await clienteAxios.get(url)
  console.log(res.data)
    setDatos(res.data)
}


 const handleSubmit = async (e) => {
    e.preventDefault()
  
    if([nombre].includes("")){
    Swal.fire({
      title: 'Todos los campos obligatorios',
      icon:'error',
      timer: 1500
    }
      
    )
  } else{

    try{
      const url = '/curso'
     const res = await clienteAxios.post(url, {nombre})
      console.log(res.data)
    
      
     
     Toast.fire({
       icon: 'success',
       title: 'Agregado exitosamente'
     })
     resetForm()
   obtenerDatos()
    }
    catch(error){
 
     Swal.fire({
       title: 'Curso ya registrado',
       icon:'error',
       timer: 3000
     }
       
     )
 
 
    }

  }
  

   
 };
 


  
  const columns = [
    {
      title: 'Curso',
      dataIndex: 'nombre',
      key: 'nombre',
    },
  
    {
      title: 'Accion',
      dataIndex: 'accion',
      key: 'accion',
      render: (fila,row) => <>   <button type="submit"  className={`  font-mono h-12 w-full
      hover:cursor-pointer   bg-red-500 hover:bg-red-400  font-bold  rounded mt-1 ml-1  text-white uppercase `} onClick={() => eliminar(row._id)}> Eliminar </button> </>
    }
  
  ];
  
  return (
    
  
<>
     <div className={`duration-400 ${props.open ? "pl-[7rem] pt-7": "p-12"}`}>
     
     <button type="submit" onClick={handleClick} className={` font-mono h-12 w-full
       hover:cursor-pointer   bg-blue-500 hover:bg-blue-700  font-bold  rounded mt-1 ml-1  text-white uppercase `}>{open ? " Ocultar " : "Agregar curso" } </button>
     <div className={`bg-slate-100 duration-700 my-5 border-black p-5 pt-8 ${open ? "block w-full" : "hidden" }
     `}>
       <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
        
          <div>
          <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Nombre</label>
          
          <input className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type="text"
           placeholder='Nombre' value={nombre} onChange={ e => setNombre(e.target.value)} />
          </div>
      
          
          
     
           <div>
           <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Accion</label>
           
           <button type="submit"  className={` font-mono h-12 w-full
      hover:cursor-pointer   bg-blue-500 hover:bg-blue-700  font-bold  rounded mt-1 ml-1  text-white uppercase `}> Agregar </button>
           
           </div>
          
         



        </div>
        </form>
     </div>
     
     
     
     
     <div className='mt-[4rem] duration-400'>
     <Table dataSource={datos} columns={columns}  />
      </div>
     </div>
    
    </>
      
    
 


  )
}

export default ContentsAddCur