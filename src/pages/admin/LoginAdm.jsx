import { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Logo from '../../assets/Insignia_Las_Acacias.png';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../../component/Alerta'
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import Logo2 from '../../assets/Electrónica.png'
import Logo3 from '../../assets/Párvulo.png'
import clienteAxios from '../../config/axios';
const LoginAdm = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  
  const {setAuth } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
   

  
   try{
      const url = '/admin/login'
      const {data} = await clienteAxios.post(url, {email, password})
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/admin')
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
   
    <div className=' min-h-screen py-52 bg-gradient-to-r from-sky-500 to-indigo-500'>
      <div className=' container mx-auto  '>
        <div className='flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-2lg overflow-hidden drop-shadow-2xl '>
        <div className='w-full lg:w-1/2 flex flex-col items-center justify-center' >
        <div className='mt-6'>
          <h2 className='text-3xl mb-5 font-bold text-center'>Bienvenido </h2>
        <h2  className='text-3xl mb-5 font-bold text-center'>  <span className=' font-bold text-blue-600'>Solicitud de Insumos</span></h2>
        </div>
          <img className= ' object-center object-cover ' src={Logo} alt="" />
          <div className='grid grid-cols-2 mb-6'>
          <img className= ' object-center object-cover w-[8rem] ' src={Logo2} alt="" />
          <img className= ' object-center object-cover justify-end w-[8rem]  lg:ml-5' src={Logo3} alt="" />
          </div>
        
       
        </div>
        <div className='w-full lg:w-1/2 py-16 px-12 border-l-2'>
          <h2  className='text-3xl mb-4 font-bold text-center'>Inicio de sesión <span className=' font-bold text-blue-600'>Admin</span></h2>
         
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

      <Link className='flex justify-center xl:ml-[6rem]'>¿Olvidaste la contraseña?</Link>
<div className='mt-5 xl:ml-[6rem]'>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" ghost htmlType="submit">
            Entrar
        </Button>
      </Form.Item>
      </div>
    </Form>
</div>


{/* 
        <form onSubmit={handleSubmit}>
          <div className='  lg:mt-[2rem] lg:ml-[3rem]'>
      
        <div className='my-5'>
          <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Email</label>
          
          <input className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type="text"
           placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
          
        </div>

        <div className='my-5'>
          <label className=' uppercase text-gray-600 block font-mono' htmlFor="">Contraseña</label>
          
          <input className='border lg:w-[15rem] w-full p-2 mt-3 bg-gray-50 rounded-xl' type="password"
           placeholder='Tu Contraseña' value={password} onChange={e => setPassword(e.target.value)} />
          
        </div>
        <input type="submit" value="Entrar" className=' bg-indigo-700 hover:bg-indigo-800 w-full font-mono lg:w-[10rem] py-3 rounded-xl hover:cursor-pointer text-white uppercase'/>
        
    </div>
    </form> */}
        </div>
        </div>
      </div>
    </div>
  
    </>
  )
}

export default LoginAdm