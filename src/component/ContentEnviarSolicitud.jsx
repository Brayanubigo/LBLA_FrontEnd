import { Select, Table, Tag } from 'antd';
import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';
import useAuthUser from "../hooks/useAuthUser";

import moment from 'moment/moment';
import 'moment/locale/es';
import clienteAxios from '../config/axios';



const ContentEnviarSolicitud = (props) => {
  const {authu } = useAuthUser();
  const [nombre, setNombre] = useState(authu.nombre)
  const [tipo, setTipo] = useState('')
  const [curso,setCurso] = useState('')
  const [datosCurso, setDatosCurso] =useState([])
  const [datosSoli, setDatosSoli] = useState([])
  const [datosAsignatura, setDatosAsignatura] = useState([])
  const [datosTipo, setDatosTipo] = useState([])
  const [cantidad,setCantidad] = useState(1)
  const [identificador, setIdentificador] = useState(authu._id)
  const [asignatura, setAsignatura] = useState('')
  const [descripcion, setDescipcion] = useState('')
  const [email,setEmail] = useState('brayan@gmail.com')
  const [fechaPedido, setfechaPedido]= useState("")
  const [time, setTime] = useState("")




  const handleChange = event => {
    console.log(event.target.value);
    setCurso(event.target.value);
  };

  
  const handleChangeAsig = event => {
    console.log(event.target.value);
    setAsignatura(event.target.value);
  };

  const handleChangeTipo = event => {
    console.log(event.target.value);
    setTipo(event.target.value);
  };
 
  
  useEffect(() => {
    obtenerCurso()
    obtenerSoli()
    obtenerAsignatura()
    obtenerTipo()
    }, []);

    const obtenerSoli = async () =>{
      const id = authu._id
      
      const url = `/soli/perfiluser/${id}`
        const res = await clienteAxios.get(url)
      console.log(res.data)
      setDatosSoli(res.data)
    }


    const obtenerCurso = async (e) =>{
      const url = '/curso/perfil'
        const res = await clienteAxios.get(url)
      console.log(res.data)
      setDatosCurso(res.data)
    }
    const obtenerTipo = async (e) =>{
      const url = '/tipo/perfil'
        const res = await clienteAxios.get(url)
      console.log(res.data)
      setDatosTipo(res.data)
    }

    const obtenerAsignatura = async (e) =>{
      const url = '/asig/perfil'
        const res = await clienteAxios.get(url)
      console.log(res.data)
      setDatosAsignatura(res.data)
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
  setCantidad(1)
  setDescipcion('')
}


 const handleSubmit = async (e) => {
    e.preventDefault()
  
    if([nombre , tipo,curso, asignatura].includes("")){
    Swal.fire({
      title: 'Todos los campos obligatorios',
      icon:'error',
      timer: 1500
    }
    )
      
   
  } else{

    try{
      const fechaHoraPedido ="Lo solicita para el dia "+ moment(fechaPedido).format('LL')+ " a las " + time
      const fecha =  moment(Date.now()).format('LLL') 
      
      const url = '/soli'
     const res = await clienteAxios.post(url, {email,nombre, tipo, curso, cantidad, identificador,asignatura, descripcion, fecha,fechaHoraPedido})
      console.log(res.data)
      
      resetForm()
      obtenerSoli()
     
      Swal.fire({
        title: 'Solicitud enviada!',
        text: 'Espere a que el admin confirme la Solicitud',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

    }
    catch(error){
 
     Swal.fire({
       title: 'Hubo un error con la Solicitud',
       icon:'error',
       timer: 3000
     }
       
     )
 
 
    }

  }
  

   
 };
 




  const columns = [
 
    {
      title: 'Solicitud',
      dataIndex: 'tipo',
      key: 'tipo',
    },
    {
      title: 'Curso',
      dataIndex: 'curso',
      key: 'curso',
    },
    {
      title: 'Asignatura',
      dataIndex: 'asignatura',
      key: 'asignatura',
    },

    {
      title: 'Cantidad',
      dataIndex: 'cantidad',
      key: 'cantidad',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
    },
  
    {
      title: 'Entregado',
      dataIndex: 'entregado',
      key: 'entregado',
      render: val => (val ? 'Entregado' : 'No entregado'),
      filters: [{
        text: 'Entregado',
        value: true,
      }, {
        text: 'No entregado',
        value: false,
      }],
      onFilter: (value, record) => 
      record.entregado ===value,
 
    },
   
  
  
  ];
  
  return (
    
  
<>
     <div className={`duration-400 ${props.open ? "pl-[7rem] pt-7": "p-12"} `}>
    
       <form onSubmit={handleSubmit}>
        <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 '>
        
          <div>
          <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Nombre Completo:</label>
          
          <input className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type="text"
           placeholder='Nombre' value={authu.nombre} onChange={ (e) => setNombre(e.target.value)} disabled={true} />
          </div>
      
         
        

           <div>
           <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Tipo de Insumo:</label>
          
           <select className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' value={tipo} onChange={handleChangeTipo}>
           <option  value="" >Seleccione Insumo</option>
        {datosTipo.map(option => (
          <option key={option.nombre} value={option.nombre} >
            {option.nombre}
          </option>
        ))}
      </select>
           </div>
           

           <div>
          <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Cantidad:</label>
          
          <input className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type="number"
           placeholder='Cantidad' value={cantidad} onChange={ e => setCantidad(e.target.value)} />
          </div>

           <div className='mt-7'>
         <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Curso:</label>
           <select className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' value={curso} onChange={handleChange} >
           <option  value="" >Seleccione Curso</option>
        {datosCurso.map(option => (
          <option key={option.nombre} value={option.nombre} >
          
            {option.nombre}
          </option>
        ))}
      </select>
           </div>
        
          

      
           <div className='mt-7'>
          <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Asignatura</label>
          
          <select className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' value={asignatura} onChange={handleChangeAsig} >
           <option  value="" >Seleccione Asignatura</option>
        {datosAsignatura.map(option => (
          <option key={option.nombre} value={option.nombre} >
          
            {option.nombre}
          </option>
        ))}
      </select>
          </div>
           
          <div className='mt-7'>
          <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Descripción:</label>
          
          <textarea className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type="text" rows="3"
           placeholder='Opcional' value={descripcion} onChange={ e => setDescipcion(e.target.value)} />
           
          </div>
          
          <div className=''>
          <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Hora de pedido:</label>
          <input className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type="date" 
          value={fechaPedido} onChange={ e => setfechaPedido(e.target.value)} format="dd/mm/yyyy"/>
          <input className='block border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type="time" id="appt" 
       min="08:00" max="18:00" value={time} onChange={ e => setTime(e.target.value)} />
           
          </div>
          

          <div className=''>
          <label className=' uppercase text-gray-600 block font-mono text-center' htmlFor="">Accion:</label>
      <button type="submit"  className={` font-mono h-12 w-full
       hover:cursor-pointer   bg-blue-500 hover:bg-blue-700  font-bold  rounded mt-1 ml-1  text-white uppercase `}> Enviar </button>

 
          </div>
        </div>
        </form>

      
        </div>
        <div className={`duration-400 ${props.open ? "pl-[7rem] pt-7": "pl-12"}`}>
     <div className='duration-400'>
     <Table dataSource={datosSoli} columns={columns}  />
      </div>
 
      </div>
    </>
      
    
 


  )
}

export default ContentEnviarSolicitud