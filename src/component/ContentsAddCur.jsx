
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import Alerta from './Alerta';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';





const ContentsAddCur = (props) => {
  const [open, setOpen] = useState(false)
  const [nombre, setNombre] = useState('')
  const [profesor, setProfesor] = useState('')
  const [datos, setDatos] =useState([])
  const [alerta, setAlerta] = useState({})
  const [pageSize, setPageSize] = useState(5);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  
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
 
    setDatos(res.data.reverse())
}


 const handleSubmit = async (e) => {
    e.preventDefault()
  
    if([nombre].includes("")){
      setAlerta({msg:'Todos los campos son obligatorios', error:true})
      return
      
    
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
  
  { field: 'nombre', headerName: 'Nombre', width: 130,flex:1, align:"center" },
  { field: 'Accion', flex:1, headerName: 'Accion',align:"center"  ,width: 130, 
  renderCell:params=><Button color="error" style={{marginLeft:8}} 
  variant="outlined" startIcon={<DeleteIcon />} onClick={() => 
  eliminar(params.row._id)}>
  Eliminar</Button> }
];



 const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};


 const {msg} = alerta

  
  return (
    
  
<>
     <div className={`duration-400 ${props.open ? "pl-[7rem] pt-7": "p-12"}`}>
     
     <Button variant="contained" endIcon={open ? "" : <ImportContactsIcon/>} type="submit" onClick={handleClick} className={` font-mono h-12 w-full
       hover:cursor-pointer  rounded mt-1 ml-1   uppercase `}>{open ? " Ocultar " : "Agregar Curso" } </Button>
     <div className={` border-black  ${open ? "block w-full" : "hidden" }
     `}>
        {msg && <Alerta 
          alerta={alerta}/>}
       <Box component="form" onSubmit={handleSubmit}>
        
        <div className='grid grid-cols-1 lg:grid-cols-2 bg-white mt-2 shadow-2xl border items-center '>
        
          <div className='m-5'>
         
    
      <TextField required id="outlined-basic" label="Nombre Completo" variant="outlined" value={nombre} onChange={e => setNombre(e.target.value)} />
      
 
          </div>
         
        
     
           <div className='m-5 '>
           <Button variant="contained" type='submit' endIcon={<ImportContactsIcon />} >
        Agregar Curso
      </Button>
           
           </div>
          
      

        </div>
        </Box>
 
     </div>
     
     
     
     <div style={{ height: 500, width: '100%' }} className="mt-5">
    
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
    
    
    
     {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Acción</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (

            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
              <TableCell align="center">{row.nombre}</TableCell>
           
              <TableCell align="center" >
             
                <Button color="error" style={{marginLeft:8}} variant="outlined" startIcon={<DeleteIcon />} onClick={() => eliminar(row._id)}>
                  Eliminar</Button>
                  
                  </TableCell>
            
            </TableRow>
          ))}
        </TableBody>
        <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={datos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      </Table>
    </TableContainer> */}
     </div>
     



     {/* <div className='mt-[4rem] duration-400'>
     <Table dataSource={datos} columns={columns}  />
      </div> */}
     </div>
    
    </>
      
    
 


  )
}

export default ContentsAddCur