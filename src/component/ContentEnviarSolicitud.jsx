
import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';
import useAuthUser from "../hooks/useAuthUser";
import TextField from '@mui/material/TextField';
import moment from 'moment/moment';
import 'moment/locale/es';
import clienteAxios from '../config/axios';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

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
  const [email,setEmail] = useState('brayan.ubigo@gmail.com')
  const [fechaPedido, setfechaPedido]= useState("")
  const [time, setTime] = useState("")  
  
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedStock, setSelectedStock] = useState([]);  

  const handleChange = event => {
   
    setCurso(event.target.value);
  };

  
  const handleChangeAsig = event => {
   
    setAsignatura(event.target.value);
  };

  const handleChangeTipo = async (event) => {
  
    setTipo(event.target.value)
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
      
      setDatosSoli(res.data)
    }


    const obtenerCurso = async (e) =>{
      const url = '/curso/perfil'
        const res = await clienteAxios.get(url)
      
      setDatosCurso(res.data)
      
    }
    const obtenerTipo = async (e) =>{
      const url = '/tipo/perfil'
        const res = await clienteAxios.get(url)
      
      setDatosTipo(res.data)

     
      
    }

    const obtenerAsignatura = async (e) =>{
      const url = '/asig/perfil'
        const res = await clienteAxios.get(url)
      
      setDatosAsignatura(res.data)
    }

  

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
      console.log('hola from res ', res);
      
      resetForm()

      obtenerTipo()

      Swal.fire({
        title: res.data.msg,
        text: 'Espere a que el admin confirme la Solicitud',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

    }
    catch(error){
      console.log('errorrr ', error);
     Swal.fire({
       title: error.response.data.msg,
       icon:'error',
       timer: 3000
     }
       
     )
 
 
    }

  }
  

   
 };
 



 
  
  return (
    
  
<>
     <div className={`duration-400 ${props.open ? "pl-[7rem] pt-7": "p-12"} `}>
    
       <form onSubmit={handleSubmit}>
        <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 '>
        
          <div>
        
          
          <TextField id="filled-basic" label="Nombre Completo"  value={authu.nombre} onChange={ (e) => setNombre(e.target.value)} disabled={true} />
          {/* <input className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type="text"
           placeholder='Nombre' value={authu.nombre} onChange={ (e) => setNombre(e.target.value)} disabled={true} /> */}
          </div>
      
         
        

           <div className='mt-5 lg:mt-0'>
          
           <FormControl variant="filled" sx={{ m: 0, minWidth: 230, maxWidth:100 }}>
        <InputLabel id="demo-simple-select-filled-label">Tipo de insumo y "Stock"</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={tipo}
          onChange={handleChangeTipo}
        >
          <em>Seleccina el tipo de insumo</em>
          {datosTipo.map(option => (
           <MenuItem value={option.nombre}>
          
          {option.nombre} - {option.stock}
        
         </MenuItem>
         
        ))}
          
        
        </Select>
      </FormControl>

    
           
      
           </div>
           

           <div className='mt-5 lg:mt-0'>
           <TextField
          id="filled-basic"
          label="Cantidad"
          variant="filled"
          type="number"
          value={cantidad} 
          onChange={ e => setCantidad(e.target.value)}
        />
         
          </div>

           <div className='mt-5 lg:mt-7'>
        
           <FormControl variant="filled" sx={{ m: 0, minWidth: 230, maxWidth: 100 }}>
        <InputLabel id="demo-simple-select-filled-label">Curso</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={curso}
          onChange={handleChange}
        >
          <em>Seleccina Curso</em>
          {datosCurso.map(option => (
           <MenuItem value={option.nombre}>
          
          {option.nombre}
         </MenuItem>
         
        ))}
          
        
        </Select>
      </FormControl>

      
           </div>
        
          

      
           <div className='mt-5 lg:mt-7 max-w-md'>
          
           <FormControl variant="filled" sx={{ m: 0, minWidth: 230, maxWidth:100 }}>
        <InputLabel id="demo-simple-select-filled-label">Asignatura</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={asignatura}
          onChange={handleChangeAsig}
        >
          <em>Seleccine Asignatura</em>
          {datosAsignatura.map(option => (
           <MenuItem value={option.nombre}>
          
          {option.nombre}
         </MenuItem>
         
        ))}
          
        
        </Select>
      </FormControl>
     
          </div>
           
          <div className='mt-7'>
          
          <TextField
          id="filled-multiline-static"
          label="Descripción"
          multiline
          rows={3}
          variant="filled"
          value={descripcion} onChange={ e => setDescipcion(e.target.value)}
        />
          {/* <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Descripción:</label>
          
          <textarea className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type="text" rows="3"
           placeholder='Opcional' value={descripcion} onChange={ e => setDescipcion(e.target.value)} />
            */}
          </div>
          
          <div className='mt-5 lg:m-0'>
        
          <TextField
        id="date"
        label="Fecha de pedido"
        type="date"
        defaultValue={Date.now()}
        variant="filled"
        value={fechaPedido}
        onChange={e => setfechaPedido(e.target.value)}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
     <div className='mt-2'>
     <TextField
        id="time"
        label="Hora de pedido"
        type="time"
        defaultValue="08:00"
       
        value={time}
        onChange={e => setTime(e.target.value)}
        variant='filled'
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150, marginLeft:2 }}
      />
     </div>
        
          
          {/* <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Hora de pedido:</label>
          <input className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type="date" 
          value={fechaPedido} onChange={ e => setfechaPedido(e.target.value)} format="dd/mm/yyyy"/>
          <input className='block border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type="time" id="appt" 
       min="08:00" max="18:00" value={time} onChange={ e => setTime(e.target.value)} />
            */}
          </div>
          

          <div className='mt-5'>

          <Button style={{width:150, height:55}} variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>
        Enviar
      </Button>
          {/* <label className=' uppercase text-gray-600 block font-mono text-center' htmlFor="">Accion:</label>
      <button type="submit"  className={` font-mono h-12 w-full
       hover:cursor-pointer   bg-blue-500 hover:bg-blue-700  font-bold  rounded mt-1 ml-1  text-white uppercase `}> Enviar </button> */}

 
          </div>
        </div>
        </form>

      
        </div>
        <div className={`duration-400 ${props.open ? "pl-[7rem] pt-7": "pl-12"}`}>
     <div className='duration-400'>
     {/* <Table dataSource={datosSoli} columns={columns}  /> */}
      </div>
 
      </div>
    </>
      
    
 


  )
}

export default ContentEnviarSolicitud