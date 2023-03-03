import { useState } from 'react';

import Logo from '../assets/Insignia_Las_Acacias.png';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../component/Alerta'
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';

import Button from '@mui/material/Button';
import clienteAxios from '../config/axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
const Registrar = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [alerta, setAlerta] = useState({})
  const [mostrar , setMostrar] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    error: false,
    message:""
  })
  
const validateEmail=(email) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regex.test(email);
};

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const resetForm = ()   =>{
    setNombre(''),
    setEmail(''),
    setPassword(''),
    setRepetirPassword('')
  }
  
  
  function toLower(str) {
    return str.toLowerCase();
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
   
    if (!validateEmail(email)) {
      setError({
        error: true,
        message: "El email no es valido",
      });
      return;
    }else{
      setError({
        error: false,
        message: "",
      });
    }
   
   
    if([nombre, password, email,repetirPassword].includes('')){
        setAlerta({msg:'Todos los campos son obligatorios', error:true})
        return
    }
  
    if(password !== repetirPassword){
        setAlerta({msg: 'Las contraseñas no son iguales', error:true})
        return
    }

 
 
  
    
        try{
         
            const url = '/user'
            const {data} = await clienteAxios.post(url, {nombre,email, password})
            Swal.fire({
                title:'Cuenta creada!',
                text:'Revisa tu email para CONFIRMAR la cuenta',
                icon:'success'
            }
               
              )

              resetForm()
            console.log(data)
          }catch(error){
            setAlerta({
              msg: error.response.data.msg,
              error:true
            })
      
       
          }

    
  };
  
 

  const {msg} = alerta
  return (
    <>
   
    <div className=' min-h-screen py-[6rem] bg-gradient-to-r from-sky-500 to-indigo-500'>
      <div className=' container mx-auto  '>
        <div className='flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-2lg overflow-hidden drop-shadow-2xl '>
        <div className='w-full lg:w-1/2 flex flex-col items-center justify-center' >
        <div>
        <h2  className='text-3xl mb-5 font-bold text-center'>Bienvenido  <span className=' font-bold text-blue-600'>LBLA Solicitud</span></h2>
        </div>
          <img className= ' object-center object-cover ' src={Logo} alt="" />
   
        
       
        </div>
        <div className='w-full lg:w-1/2 py-16 px-10 border-l-2 '>
          <h2  className='text-3xl mb-4 font-bold text-center'>Registra tu  <span className=' font-bold text-blue-600'>Cuenta</span></h2>
         
          {msg && <Alerta 
          alerta={alerta}/>}

        <Box component="form"  
        onSubmit={handleSubmit}>
          <div className=' mx-2 '>
          <div className='my-5'>
          <TextField 
           label="Nombre Completo" 
           variant="outlined" 
           value={nombre} 
           onChange={e => setNombre(e.target.value)}
           required />
    
          
        </div>


        <div className='my-5 '>
        <TextField   label="Email" variant="outlined" 
        value={email}
        onChange={e => setEmail(e.target.value.toLowerCase())} 
        helperText={error.message}
        type="email"
        required
        error={error.error}/>
      
          <div>
   
          </div>
          
        </div>

        <div className='my-5'>
          
          
        <FormControl sx={{   borderColor: "red" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
          <OutlinedInput
            required
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
        <div className='my-5 real '>
          
        <FormControl sx={{   borderColor: "red" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Repita Contraseña</InputLabel>
          <OutlinedInput
           
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
            label="Password" value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} 
            
          />
        </FormControl>
          
          
      
        
    
         
        
        </div>
        <div className='grid grid-cols-2 mt-2'>
    <Link className='flex justify-center  hover:text-blue-300 duration-150 ' to="/user">¿Ya tienes cuenta? Iniciar Sesión</Link>
      <Link className='flex justify-center  hover:text-blue-300 duration-150 ml-2' to='/olvide-password'>¿Olvidaste la contraseña?</Link>
              </div>
        <div className='flex justify-center mt-5'>
        <Button variant="contained" type='submit' size="large">Registrar</Button>
      
        
        </div>
        
        
    </div>
    </Box>
        </div>
        </div>
      </div>
    </div>
  
    </>
  )
}

export default Registrar