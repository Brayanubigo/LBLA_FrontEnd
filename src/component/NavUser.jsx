import { Breadcrumb, Layout, Menu, theme } from 'antd';
import useAuthUser from '../hooks/useAuthUser';
const { Header, Content, Footer, Sider } = Layout;

const NavUser = () => {
  const {authu } = useAuthUser();

  return (
    
    <>
    <div>
    <header className='   bg-gradient-to-r from-cyan-500 to-blue-500 shadow-2xl  '>
      <div className='text-end font-bold flex flex-col  mr-6 justify-center h-20'>
      <h2 className=' uppercase text-sm lg:text-xl'>Bienvenid@ {authu.nombre}</h2>
        </div>
    </header>
    </div>
    
      </>
      
    
  )
}

export default NavUser