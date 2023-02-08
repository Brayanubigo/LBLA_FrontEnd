import { Button, Table, Input } from 'antd';
import { useState, useEffect } from 'react';
import {SearchOutlined} from "@ant-design/icons"
import axios from 'axios';
import Swal from 'sweetalert2';
import { render } from 'react-dom';
import XLSX from "xlsx"
import clienteAxios from '../config/axios';
const ContentSolicitudAdmin = (props) => {
  const [open, setOpen] = useState(false)
  const [datos, setDatos] =useState([])



  useEffect(() => {
    obtenerDatos()
    }, []);

 
const handleOnExport = () =>{
  const title=[{A:"Solicitudes totales"}];
  let table=[{
    A:"Nombre",
    B:"Tipo de Insumo",
    C:"Curso",
    D:"Asignatura",
    E:"Cantidad",
    F:"Fecha Solicitada",
    G:"Fecha Requerido",
    H:"Descripcion",
    I:"Recibido"
  }];

  datos.forEach(row =>{
    const nombreSolicitud = row.nombre;
    const Tipo = row.tipo;
    const Curso = row.curso;
    const Cantidad = row.cantidad;
    const Asignatura= row.asignatura;
    const fechaSolicitada = row.fecha;
    const fechaRequerido=row.fechaHoraPedido;
    const Descripcion = row.descripcion;
    const Entregado = row.entregado;

    table.push({

      A:nombreSolicitud,
      B:Tipo,
      C:Curso,
      D:Asignatura,
      E:Cantidad,
      F:fechaSolicitada,
      G:fechaRequerido,
      H:Descripcion? Descripcion: "No hay descripcion",
      I:Entregado ? "Entregado" : "No entregado"

    })
  })
    table = [{A: "Solicitudes"}].concat(table)
    console.log(table)
    const finalData = [...title,...table]
  
  var wb= XLSX.utils.book_new(),
  ws= XLSX.utils.json_to_sheet(finalData,{
    skipHeader:true,
  });

  XLSX.utils.book_append_sheet(wb,ws,"Reporte de solicitudes");

  XLSX.writeFile(wb,"Solicitudes.xlsx")
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


async function  estadoSi(id) { 
  const url = `/soli/estadosi/${id}`
  const res = await clienteAxios.get(url).then((res) =>{
    Toast.fire({
      icon: 'success',
      title: 'Modificado exitosamente'
    })
 
  obtenerDatos() 
  }).catch((err)=>{
    console.log(err)
  })

}

async function  estadoNo(id) { 
  
  const res = await clienteAxios.get(`/soli/estadono/${id}`).then((res) =>{
    Toast.fire({
      icon: 'success',
      title: 'Modificado exitosamente'
    })
  
  obtenerDatos() 
  }).catch((err)=>{
    console.log(err)
  })

}


async function  eliminar(id) { 

  const res = await clienteAxios.get(`/soli/eliminar/${id}`).then((res) =>{
    
    
    
    Toast.fire({
      icon: 'success',
      title: 'Eliminado exitosamente'
    })
    obtenerDatos()
    
  }).catch((err)=>{
    
  })
 
}


const obtenerDatos = async (e) =>{
  const url = '/soli/perfil'
    const res = await clienteAxios.get(url)
  
    setDatos(res.data)
    
}




  
  const columns = [
    {
      title: 'Profesor',
      dataIndex: 'nombre',
      key: 'nombre',
      filterDropdown:({setSelectedKeys, selectedKeys, confirm, clearFilters})=> {
        return <>
        <Input autoFocus placeholder='Escribe un texto aqui' 
        value={selectedKeys[0]}
        onChange={(e) =>{ setSelectedKeys(e.target.value?[e.target.value]:[]); 
          confirm({closeDropdown:false}) }}
        onPressEnter={() =>{ confirm() }} 
        onBlur={()=> {
          confirm()
        }}></Input>
        <div className='grid grid-cols-2'>
        <Button type='primary' ghost onClick={()=> {confirm(); }}> Buscar</Button >
        <Button type='primary' danger ghost  onClick={()=> { clearFilters({closeDropdown:false}); confirm({closeDropdown:false}) }}> Reset</Button >
        </div>
        
        </>
      },
    filterIcon:()=>{
      return < SearchOutlined />;
    }, 
    onFilter:(value,record) =>{
      return record.nombre.toLowerCase().includes(value.toLowerCase())
    }
    },
    {
      title: 'Tipo',
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
      title: 'Fecha Solicitado',
      dataIndex: 'fecha',
      key: 'fecha',
    },  {
      title: 'Fecha de requerimiento',
      dataIndex: 'fechaHoraPedido',
      key: 'fechaHoraPedido',
    },
    {
      title: 'Descipcion',
      dataIndex: 'descripcion',
      key: 'descripcion',
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
    {
      title: 'Accion',
      dataIndex: 'accion',
      key: 'accion',
      render: (fila,row) => <>  
      
      <button type="submit"  className={` font-mono h-12 w-full
       hover:cursor-pointer   bg-blue-500 hover:bg-blue-700  font-bold  rounded mt-1 ml-1  text-white uppercase `} onClick={() => estadoSi(row._id)}> Entregado </button>

<button type="submit"  className={`font-mono h-12 w-full
       hover:cursor-pointer   bg-blue-500 hover:bg-blue-700  font-bold  rounded mt-1 ml-1  text-white uppercase `} onClick={() => estadoNo(row._id)}> No Entregado </button>

<button type="submit"  className={` font-mono h-12 w-full
       hover:cursor-pointer   bg-red-500 hover:bg-red-400  font-bold  rounded mt-1 ml-1  text-white uppercase `} onClick={() => eliminar(row._id)}> Eliminar </button>
       </>
    }
  
  ];
  
  return (
    
  
<>
        
     
<div className={`duration-400 ${props.open ? "pl-[7rem] pt-7": ""}`}>
     <div className=' duration-400'>
     <div className='flex justify-end mr-8 lg:mr-20'>
     <button type="submit"  className={` w-full font-mono lg:w-[8rem] h-12 tex
       hover:cursor-pointer mt-3 ml-10   uppercase bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded inline-flex items-center justify-center `} onClick={handleOnExport}>
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
   Exportar</button>
     </div>
     <div className='p-5'> 
     <Table  dataSource={datos} style={{with:10}} size={'middle'} columns={columns}   />
     </div>
    
      </div>
 
      </div>
           
    </>
      
    
 


  )
}

export default ContentSolicitudAdmin