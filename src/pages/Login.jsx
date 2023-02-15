import { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Logo from '../assets/Insignia_Las_Acacias.png';
import Logo2 from '../assets/Electrónica.png'
import Logo3 from '../assets/Párvulo.png'
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../component/Alerta'

import useAuthUser from '../hooks/useAuthUser';
import clienteAxios from '../config/axios';

const Login = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  
  const {setAuthu } = useAuthUser()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
   

  
   try{
      const url = '/user/login'
      const {data} = await clienteAxios.post(url, {email, password})
      localStorage.setItem('token', data.token)
      setAuthu(data)
      
      navigate('/usuario')
      
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
   
    <div className=' min-h-screen py-52 bg-gradient-to-r from-sky-500 to-indigo-500'>
      <div className=' container mx-auto  '>
        <div className='flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-2lg overflow-hidden drop-shadow-2xl '>
        <div className='w-full lg:w-1/2 flex flex-col items-center justify-center' >
        <div className='mt-6'>
        <h2 className='text-3xl mb-5 font-bold text-center'>Bienvenido </h2>
        <h2  className='text-3xl mb-5 font-bold text-center'>  <span className=' font-bold text-blue-600'>Solicitud de Insumos</span></h2>
        </div>
          <div>
          <img className= ' object-center object-cover ' src={Logo} alt="" />
          </div>
          <div className='grid grid-cols-2 mb-6'>
          <img className= ' object-center object-cover w-[8rem] ' src={Logo2} alt="" />
          <img className= ' object-center object-cover justify-end w-[8rem]  lg:ml-5' src={Logo3} alt="" />
          </div>
         
         
       
        </div>
        <div className='w-full lg:w-1/2 py-16 px-12 border-l-2 '>
          <h2  className='text-3xl mb-4 font-bold text-center'>Inicio de  <span className=' font-bold text-blue-600'>sesión</span></h2>
         
          {msg && <Alerta 
          alerta={alerta}/>}

<div className=' flex lg:my-10 '>
<Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="username"
        rules={[{ required: true, message: 'Porfavor ingresa un Email!' }]}
        
      >
        <Input value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="password"
        rules={[{ required: true, message: 'Porfavor ingresa una Contraseña!' }]}
      >
        <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Item>
              <div className='grid grid-cols-2'>
              <Link className='flex justify-center ' to="/registrarUsuario">¿No tienes cuenta? Crear cuenta</Link>
      <Link className='flex justify-center ml-2' to="/olvide-password">¿Olvidaste la contraseña?</Link>
              </div>
    
<div className='mt-5 xl:ml-[6rem]'>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" ghost htmlType="submit">
            Entrar
        </Button>
      </Form.Item>
      </div>
    </Form>
</div>



       
        </div>
        </div>
      </div>
    </div>
  
    </>
  )
}

export default Login