
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React from 'react';
import Alerta from '../component/Alerta'
import Swal from 'sweetalert2';
import FormControl from '@mui/material/FormControl';
import clienteAxios from '../config/axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import { DataGrid } from '@mui/x-data-grid';
import { DataObjectSharp } from '@mui/icons-material';
const ContentsAddUser = (props) => {
  const [open, setOpen] = useState(false)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [datos, setDatos] = useState([])
  const [nombre, setNombre] = useState('')
  const [alerta, setAlerta] = useState({})
  const [showPassword, setShowPassword] = useState(false);
  const [textoError, setTextoError] = useState("")
  const [errorEmail , setErrorEmail] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [pageSize, setPageSize] = useState(5);


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    obtenerUsuarios()
    }, []);
  const handleClick = () =>{
    setOpen(!open);
 }

 const handleEmailChange = (event) => {
  setEmail(event.target.value);
  // Validar correo electrónico con expresión regular
  const regex = /\S+@\S+\.\S+/;
  setValidEmail(regex.test(event.target.value));
};

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
  setAlerta('')
}

const obtenerUsuarios = async (e) =>{
  const url = '/user/perfiles'
    const res = await clienteAxios.get(url)

    setDatos(res.data.reverse())
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
  if(email.length < 6 ){
    setAlerta({msg:'Email no valido', error:true})
    return
  }
  if (!validEmail) {
    console.log("Correo electrónico no válido");
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
  
  { field: 'nombre', headerName: 'Nombre', width: 200, align:'center', },
  { field: 'email', headerName: 'Email', width: 240,align:'center' },
  { field: 'confirmado',type: 'boolean',flex:1, headerName: 'Confirmacion', width: 160 ,align:'center'},
  { field: 'confirmar', headerName: 'Confirmar', width: 150,align:'center', renderCell:params=> { return (
    <Button color="success" variant="outlined" startIcon={<CheckIcon />} onClick={() => confirmar(params.row.token)}>
    Confirmar</Button> )  
    }
    },
  { field: 'Accion', headerName: 'Eliminar', width: 130, renderCell:params=> { return (
  <Button color="error" variant="outlined" 
  startIcon={<DeleteIcon />} onClick={() => eliminar(params.row._id)}>
  Eliminar</Button>  )  
  }
  }

];
  
 
  const {msg} = alerta

  return (
    
  
<>
     <div className={`duration-400 ${props.open ? "pl-[7rem] pt-7": "p-12"} `}>
     <Button variant="contained" endIcon={open ? "" : <PersonAddIcon/>} type="submit" onClick={handleClick} className={` font-mono h-12 w-full
       hover:cursor-pointer  rounded mt-1 ml-1   uppercase `}>{open ? " Ocultar " : "Agregar usuario" } </Button>
     <div className={` border-black p-5 pt-8 ${open ? "block w-full" : "hidden" }
     `}>
        {msg && <Alerta 
          alerta={alerta}/>}
       <form onSubmit={handleSubmit}>
        
        <div className='grid grid-cols-1 lg:grid-cols-4 bg-white mt-2 shadow-2xl border'>
        
          <div className='m-5'>
         
    
      <TextField id="outlined-basic" label="Nombre Completo" variant="outlined" value={nombre} onChange={e => setNombre(e.target.value)} />
      
 
          </div>
          <div className='m-5'>
            <TextField  label="Email" 
            type="email" 
            variant="outlined" 
            value={email} 
            onChange={(e) => {setEmail(e.target.value); if(email.length<5){
              setErrorEmail(true)
              setTextoError("Email no Valido")
            }else{
              setErrorEmail(false)
              setTextoError("")
            }
          }
          } 
            error={errorEmail}
            helperText={textoError}
            
            />
            
          
          </div>
          <div className='m-5 w-full'>
        
          
          <FormControl sx={{   borderColor: "red" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password" value={password} onChange={e => setPassword(e.target.value)} 
          />
        </FormControl>
          
          </div>
          
     
           <div className=' m-5'>
           <Button style={{width:150, height:55}} variant="contained" endIcon={<PersonAddIcon />} onClick={handleSubmit}>
        Agregar Usuario
      </Button>
           
           </div>
          
      

        </div>
        </form>
 
     </div>
     
     <div  style={{ height: 500, width: '100%' }} className="mt-5">
     
     
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
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Confirmacion</TableCell>
            <TableCell align="center">Acción</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
              <TableCell align="center">{row.nombre}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.confirmado ? 'Confirmado' : 'No Confirmado'}</TableCell>
              <TableCell align="center" >
              <Button color="success" variant="outlined" startIcon={<CheckIcon />} onClick={() => confirmar(row.token)}>
                  Confirmar</Button>
                <Button color="error" style={{marginLeft:8}} variant="outlined" startIcon={<DeleteIcon />} onClick={() => eliminar(row._id)}>
                  Eliminar</Button>
                  
                  </TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
     </div>
     
     {/* <div className='mt-[1rem] duration-400'>
     <Table dataSource={datos} columns={columns} />
      </div> */}
     </div>
    
    </>
      
    
 


  )
}

export default ContentsAddUser