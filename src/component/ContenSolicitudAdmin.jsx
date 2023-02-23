
import { useState, useEffect } from 'react';
import {SearchOutlined} from "@ant-design/icons"
import CancelIcon from '@mui/icons-material/Cancel';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alerta from './Alerta';
import CheckIcon from '@mui/icons-material/Check';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { DataGrid } from '@mui/x-data-grid';
import XLSX from "xlsx"
import clienteAxios from '../config/axios';
const ContentSolicitudAdmin = (props) => {
 
  const [datos, setDatos] =useState([])
  const [pageSize, setPageSize] = useState(10);


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
  
    setDatos(res.data.reverse())
    
}

const columns = [
  
  { field: 'nombre', headerName: 'Profesor', width: 130,align:"center" },
  { field: 'tipo', headerName: 'Tipo de insumo', width: 130, align:"center" },
  { field: 'asignatura', headerName: 'Asignatura', width: 130, align:"center" },
  { field: 'cantidad', headerName: 'Cantidad', width: 130, align:"center" },
  { field: 'fecha', headerName: 'Fecha Solicitud', width: 150, align:"center" },
  { field: 'fechaHoraPedido', headerName: 'Fecha Requerimiento', width: 160, align:"center" },
  { field: 'descripcion', headerName: 'Descripcion', width: 200, align:"center" },
  { field: 'entregado',type: 'boolean', headerName: 'Entregado', width: 120 ,align:'center'},
  { field: 'Entregado', headerName: 'Entregado',align:"center"  ,width: 160, 
  renderCell:params=><Button color="success" style={{marginLeft:8}} 
  variant="outlined" startIcon={<CheckIcon />} onClick={() => 
  estadoSi(params.row._id)}>
  Entregado</Button>  },

{ field: 'No Entregado', headerName: 'No Entregado',align:"center"  ,width: 170, 
renderCell:params=><Button color="error" 
variant="outlined" startIcon={<CancelIcon />} onClick={() => 
estadoNo(params.row._id)}>
No Entregado</Button>  },


  { field: 'Accion', headerName: 'Elminiar',align:"center"  ,width: 130, 
  renderCell:params=><Button color="error" style={{marginLeft:8}} 
  variant="outlined" startIcon={<DeleteIcon />} onClick={() => 
  eliminar(params.row._id)}>
  Eliminar</Button>  }
];


  
//   const columns = [
//     {
//       title: 'Profesor',
//       dataIndex: 'nombre',
//       key: 'nombre',
//       filterDropdown:({setSelectedKeys, selectedKeys, confirm, clearFilters})=> {
//         return <>
//         <Input autoFocus placeholder='Escribe un texto aqui' 
//         value={selectedKeys[0]}
//         onChange={(e) =>{ setSelectedKeys(e.target.value?[e.target.value]:[]); 
//           confirm({closeDropdown:false}) }}
//         onPressEnter={() =>{ confirm() }} 
//         onBlur={()=> {
//           confirm()
//         }}></Input>
//         <div className='grid grid-cols-2'>
//         <Button type='primary' ghost onClick={()=> {confirm(); }}> Buscar</Button >
//         <Button type='primary' danger ghost  onClick={()=> { clearFilters({closeDropdown:false}); confirm({closeDropdown:false}) }}> Reset</Button >
//         </div>
        
//         </>
//       },
//     filterIcon:()=>{
//       return < SearchOutlined />;
//     }, 
//     onFilter:(value,record) =>{
//       return record.nombre.toLowerCase().includes(value.toLowerCase())
//     }
//     },
//     {
//       title: 'Tipo',
//       dataIndex: 'tipo',
//       key: 'tipo',
//     },
//     {
//       title: 'Curso',
//       dataIndex: 'curso',
//       key: 'curso',
//     },
//     {
//       title: 'Asignatura',
//       dataIndex: 'asignatura',
//       key: 'asignatura',
//     },
  
//     {
//       title: 'Cantidad',
//       dataIndex: 'cantidad',
//       key: 'cantidad',
//     },
//     {
//       title: 'Fecha Solicitado',
//       dataIndex: 'fecha',
//       key: 'fecha',
//     },  {
//       title: 'Fecha de requerimiento',
//       dataIndex: 'fechaHoraPedido',
//       key: 'fechaHoraPedido',
//     },
//     {
//       title: 'Descipcion',
//       dataIndex: 'descripcion',
//       key: 'descripcion',
//     },
   
//     {
//       title: 'Entregado',
//       dataIndex: 'entregado',
//       key: 'entregado',
//       render: val => (val ? 'Entregado' : 'No entregado'),
//       filters: [{
//         text: 'Entregado',
//         value: true,
//       }, {
//         text: 'No entregado',
//         value: false,
//       }],
//       onFilter: (value, record) => 
//       record.entregado ===value,
//     },
//     {
//       title: 'Accion',
//       dataIndex: 'accion',
//       key: 'accion',
//       render: (fila,row) => <>  
      
//       <button type="submit"  className={` font-mono h-12 w-full
//        hover:cursor-pointer   bg-blue-500 hover:bg-blue-700  font-bold  rounded mt-1 ml-1  text-white uppercase `} onClick={() => estadoSi(row._id)}> Entregado </button>

// <button type="submit"  className={`font-mono h-12 w-full
//        hover:cursor-pointer   bg-blue-500 hover:bg-blue-700  font-bold  rounded mt-1 ml-1  text-white uppercase `} onClick={() => estadoNo(row._id)}> No Entregado </button>

// <button type="submit"  className={` font-mono h-12 w-full
//        hover:cursor-pointer   bg-red-500 hover:bg-red-400  font-bold  rounded mt-1 ml-1  text-white uppercase `} onClick={() => eliminar(row._id)}> Eliminar </button>
//        </>
//     }
  
//   ];
  
  return (
    
  
<>
        
     
<div className={`duration-400 ${props.open ? "pl-[7rem] pt-7": ""}`}>
     <div className=' duration-400'>
     <div className='flex justify-end mr-8 lg:mr-20 mt-5'>
     <Button 
variant="contained" startIcon={<DownloadForOfflineIcon />} onClick={handleOnExport}>
Exportar </Button> 
     </div>
     <div style={{ height: 750, width: '100%' }} className="mt-5">
     <DataGrid
        rows={datos}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5,10,20]}
        onPageSizeChange={(newPageSize)=>setPageSize(newPageSize)}
        getRowHeight={() => 'auto'}
        getEstimatedRowHeight={() => 100}
          sx={{
          '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
            py: 1,
          },
          '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
            py: '15px',
          },
          '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
            py: '22px',
          },
        }}
       
        getRowSpacing={params =>({
          top:params.isFirstVisible ? 0 : 5,
          bottom:params.isLastVisible ? 0 : 5,
        })}
        
      />
     
     
     {/* <Table  dataSource={datos} style={{with:10}} size={'middle'} columns={columns}   /> */}
     </div>
    
      </div>
 
      </div>
           
    </>
      
    
 


  )
}

export default ContentSolicitudAdmin