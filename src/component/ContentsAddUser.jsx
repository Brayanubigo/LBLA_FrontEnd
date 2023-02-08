import {  Table} from 'antd';
import { useState, useEffect } from 'react';
import { AiFillEye,AiFillEyeInvisible  } from "react-icons/ai";
import axios from 'axios';
import Alerta from '../component/Alerta'
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
const ContentsAddUser = (props) => {
  const [open, setOpen] = useState(false)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [datos, setDatos] = useState()
  const [nombre, setNombre] = useState('')
  const [alerta, setAlerta] = useState({})

  const [mostrar , setMostrar] = useState(false)
  
  useEffect(() => {
    obtenerUsuarios()
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

const confirmar= async(token) =>{
  console.log(token)
  try {
    const url = `/user/confirmar/${token}`
    const res = await clienteAxios.get(url)
    Toast.fire({
      icon: 'success',
      title: 'Usuario confirmado exitosamente'
    })
obtenerUsuarios()
  } catch (error) {
    Toast.fire({
      icon: 'error',
      title: 'Usuario ya fue confirmado'
    })
  }
 
}

const resetForm = ()   =>{
  setNombre(''),
  setEmail(''),
  setPassword('')
  
}

const obtenerUsuarios = async (e) =>{
  const url = '/user/perfiles'
    const res = await clienteAxios.get(url)

    setDatos(res.data)
}


async function  eliminar(id) { 
  const res = await clienteAxios.get(`/user/eliminar/${id}`).then((res) =>{
    console.log(id)
    
    
    Toast.fire({
      icon: 'success',
      title: 'Usuario eliminado exitosamente'
    })
    obtenerUsuarios()
    
  }).catch((err)=>{
    
  })
  
}

 const handleSubmit = async (e) => {
  e.preventDefault()
  if([nombre, password, email].includes('')){
      setAlerta({msg:'Todos los campos son obligatorios', error:true})
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
            obtenerUsuarios()
         
        }catch(error){
          setAlerta({
            msg: error.response.data.msg,
            error:true
          })
          console.log(error)
    
     
        }

  
};


  
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Confirmado',
      dataIndex: 'confirmado',
      key: 'entregado',
      render: val => (val ? 'Confirmado' : 'No Confirmado'),
      filters: [{
        text: 'Confirmado',
        value: true,
      }, {
        text: 'No Confirmado',
        value: false,
      }],
 
    },
    {
      title: 'Accion',
      dataIndex: 'accion',
      key: 'accion',
      render: (fila,row) => <>   <button type="submit"  className={`font-mono h-12 w-full
      hover:cursor-pointer   bg-blue-500 hover:bg-blue-700  font-bold  rounded mt-1 ml-1  text-white uppercase`} onClick={() => confirmar(row.token)}> Confirmar </button>
       <button type="submit"  className={` font-mono h-12 w-full
       hover:cursor-pointer   bg-red-500 hover:bg-red-400  font-bold  rounded mt-1 ml-1  text-white uppercase`} onClick={() => eliminar(row._id)}> Eliminar </button> </>
    },
   
  ];
  const {msg} = alerta
  return (
    
  
<>
     <div className={`duration-400 ${props.open ? "pl-[7rem] pt-7": "p-12"}`}>
     <button type="submit" onClick={handleClick} className={` font-mono h-12 w-full
       hover:cursor-pointer   bg-blue-500 hover:bg-blue-700  font-bold  rounded mt-1 ml-1  text-white uppercase `}>{open ? " Ocultar " : "Agregar usuario" } </button>
     <div className={`bg-slate-100 duration-700 my-5 border-black p-5 pt-8 ${open ? "block w-full" : "hidden" }
     `}>
        {msg && <Alerta 
          alerta={alerta}/>}
       <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 lg:grid-cols-4 mt-5'>
        
          <div>
          <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Nombre</label>
          
          <input className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type="text"
           placeholder='Nombre' value={nombre} onChange={ e => setNombre(e.target.value)} />
          </div>
          <div>
          <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Email</label>
          
          <input className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type="text"
           placeholder='Email' value={email} onChange={ e => setEmail(e.target.value)} />
          </div>
          <div>
          <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Contraseña</label>
          
          <input className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type={mostrar ? "text": "password"}
           placeholder='Contraseña' value={password} onChange={ e => setPassword(e.target.value)} />
           <div className='inline-flex absolute ' onClick={() => setMostrar(!mostrar) }>
            {mostrar ? <AiFillEyeInvisible className='  mt-5 cursor-pointer  
            items-center text-2xl leading-5'/> :<AiFillEye className=' mt-5 cursor-pointer  items-center text-2xl leading-5'/>}
            </div>
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
     <Table dataSource={datos} columns={columns} />
      </div>
     </div>
    
    </>
      
    
 


  )
}

export default ContentsAddUser