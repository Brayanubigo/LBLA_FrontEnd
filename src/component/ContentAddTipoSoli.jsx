import { Space, Table, Tag } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alerta from './Alerta';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';




const ContentAddATipoSoli = (props) => {
  const [open, setOpen] = useState(false)
  const [nombre, setNombre] = useState('')
  const [stock, setStock] = useState(0)
  const [profesor, setProfesor] = useState('')
  const [datos, setDatos] =useState([])
  const [pageSize, setPageSize] = useState(10);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [alerta, setAlerta] = useState({})
  const [gridData, setGridData] = useState([])

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
  setNombre("")

}


async function  eliminar(id) { 
  const res = await clienteAxios.get(`/tipo/eliminar/${id}`).then((res) =>{
    
    
    
    Toast.fire({
      icon: 'success',
      title: 'Eliminado exitosamente'
    })
    obtenerDatos()
    
  }).catch((err)=>{
    
  })
  
}


const obtenerDatos = async (e) =>{
  const url = '/tipo/perfil'
    const res = await clienteAxios.get(url)

    setDatos(res.data)
}

function handleEditCell(params,event){
 
  const { id, field, value } = params;
 
  clienteAxios.put(`/tipo/actualizar/${id}`, { [field]: value })
  .then(response => console.log(response.data))
  
  .catch(error => console.error(error));
 
};


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
      const url = '/tipo'
     const res = await clienteAxios.post(url, {nombre,stock})
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
       title: 'Insumo ya registrado',
       icon:'error',
       timer: 3000
     }
       
     )
 
 
    }

  }
  

   
 };
 


  
 const columns = [
  
  { field: 'nombre', headerName: 'Nombre', width: 130,flex:1, align:"center", editable:true, type: String },
  { field: 'stock', headerName: 'Stock', width: 130,flex:1, align:"center", editable:true, type: Number },
 
  { field: '', flex:1, headerName: '',align:"center"  ,width: 130, 
  renderCell:(params)=><Button color="error" style={{marginLeft:8}} 
  variant="outlined" startIcon={<DeleteIcon />} onClick={() => 
  eliminar(params.row._id)}>
  Eliminar</Button> }
   
];
const {msg} = alerta
  return (
    
  
<>
     <div className={`duration-400 ${props.open ? "pl-[7rem] pt-7": "p-12"}`}>
     
     <Button variant="contained" endIcon={open ? "" : <NoteAddIcon/>} type="submit" onClick={handleClick} className={` font-mono h-12 w-full
       hover:cursor-pointer  rounded mt-1 ml-1   uppercase `}>{open ? " Ocultar " : "Agregar Tipo de Insumo" } </Button>
     <div className={` border-black  ${open ? "block w-full" : "hidden" }
     `}>
        {msg && <Alerta 
          alerta={alerta}/>}
       <Box component="form" onSubmit={handleSubmit}>
        
        <div className='grid grid-cols-1 lg:grid-cols-3 bg-white mt-2 shadow-2xl border items-center '>
        
          <div className='m-5'>
         
    
      <TextField 
      required 
      label="Nombre" 
      variant="outlined" 
      value={nombre} onChange={e => setNombre(e.target.value)} />
      
 
          </div>
         
          <div className='m-5'>
         
    
         <TextField 
         required 
         label="Stock" 
         variant="outlined" 
         value={stock} onChange={e => setStock(e.target.value)} />
         
    
             </div>
     
           <div className='m-5 '>
           <Button variant="contained" endIcon={<NoteAddIcon />} type="submit">
        Agregar Tipo de Insumo
      </Button>
           
           </div>
          
      

        </div>
        </Box>
     </div>
     
     
     
     
     <div style={{ height: 600, width: '100%' }} className="mt-5">
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
        onCellEditCommit={(params, event) => handleEditCell(params, event)}
      />
      </div>
     </div>
    
    </>
      
    
 


  )
}

export default ContentAddATipoSoli