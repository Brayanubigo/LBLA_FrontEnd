import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import clienteAxios from '../config/axios';
import PeopleIcon from '@mui/icons-material/People';
import { MdGroup, MdOutlineContentPaste } from "react-icons/md";

ChartJS.register(ArcElement, Tooltip, Legend);
const Contents = (props) => {
  const [datos, setDatos] = useState([])
  const [datosUser, setDatosUser] = useState([])
  const [tipo, setTipo] = useState([])
  const [cantidad, setCantidad] = useState([])
  const [count, setCount] = useState([])
  const [countUser, setCountUser] = useState([])

  useEffect(() => {
    obtenerDatos(),
    obtenerUsuario()
    }, []);
  
   

    const obtenerUsuario = async () =>{
      await clienteAxios.get('/user/perfiles').then(response =>{
       const res = response.data
       setDatosUser(res.data)       
       setCountUser(res.length)
       
    
      }) 
    
     }

    
    const obtenerDatos = async () =>{
       await clienteAxios.get('/soli/perfil').then(response =>{
        const res = response.data
        setDatos(res.data)
       
        var auxtipo=[], auxCantidad=[];
        
        setCount(res.length)
        
        res.map(elemento=>{
          auxtipo.push(elemento.tipo)
          auxCantidad.push(elemento.cantidad)
        })
        setTipo(auxtipo)
        setCantidad(auxCantidad)
       }) 
     
     

      }

      let withoutDuplicates = [...new Set(tipo)];
      let withoutDuplicatesCant =  [...new Set(cantidad)]
      
      

  var data = {
    labels:withoutDuplicates,
    datasets: [
      {
        label: 'Solicitudes',
        data: cantidad,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };
  return (
    
  
<>
     <div className={`duration-400 ${props.open ? "pl-[7rem] pt-7": "p-7"}`}>
     <div className='grid grid-cols-1 md:grid-cols-1  lg:grid-cols-2 xl:grid-cols-3'>
     <div className='mt-5 border h-[20rem] w-full  lg:w-[20rem] xl:w-[28rem] shadow-xl flex flex-col justify-center items-center '>
      <h1 className='text-center font-bold text-3xl'>Solicitudes totales </h1>
      
      <h1 className='font-bold text-4xl flex  justify-center items-center '> <MdOutlineContentPaste size={150} style={{margin:5}}/> {count}</h1>
   
      
      
    </div>
    <div className='mt-5 border h-[20rem] w-full lg:w-[20rem] xl:w-[28rem] shadow-xl flex flex-col justify-center items-center '>
      <h1 className='text-center font-bold text-3xl'>Usuarios totales </h1>
      
      <h1 className='font-bold text-4xl flex  justify-center items-center '> <MdGroup size={150} style={{margin:5}}/> {countUser}</h1>
   
      
      
    </div>
     <div className='lg:w-[25rem] bg-slate-200 border shadow-2xl mt-5 lg:mt-5'>
      <h2 className='text-center font-bold '>Productos más solicitados</h2>
     <Pie data={data} />
     </div>
 
    
     </div>
    
    
     
     </div>
    
    </>
      
    
 


  )
}

export default Contents