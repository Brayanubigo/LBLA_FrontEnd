import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import clienteAxios from '../config/axios';
import axios from 'axios';
ChartJS.register(ArcElement, Tooltip, Legend);
const Contents = (props) => {
  const [datos, setDatos] = useState([])
  const [tipo, setTipo] = useState([])
  const [cantidad, setCantidad] = useState([])
  const [count, setCount] = useState([])
  useEffect(() => {
    obtenerDatos()
    }, []);
  
   
    const obtenerDatos = async () =>{
       await clienteAxios.get('/soli/perfil').then(response =>{
        const res = response.data
        setDatos(res.data)
        console.log(res.data)
        var auxtipo=[], auxCantidad=[];
        
        setCount(res.length)
        
        res.map(elemento=>{
          auxtipo.push(elemento.tipo)
          auxCantidad.push(elemento.cantidad)
        })
        setTipo(auxtipo)
        setCantidad(auxCantidad)
       }) 
      console.log(tipo)
      console.log(cantidad)
     

      }

      const withoutDuplicates = [...new Set(tipo)];
      const withoutDuplicatesCant =  [...new Set(cantidad)]
      console.log(withoutDuplicates)
      console.log(withoutDuplicatesCant)
      

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
     <div className='lg:w-[25rem] bg-slate-200 border shadow-2xl'>
      <h2 className='text-center font-bold'>Productos más solicitados</h2>
     <Pie data={data} />
     </div>
    <div className='mt-5 border h-16 w-full lg:w-[19rem] shadow-xl flex justify-center items-center'>
      <h1 className='text-center font-bold'>Solicitudes totales: {count}</h1>
     
    </div>
     </div>
    
    
     
     </div>
    
    </>
      
    
 


  )
}

export default Contents