
import { useState } from 'react';
import Slider from '../component/SidebarUser';
import Footers from '../component/Footers';
import ContentEnviarSolicitud from '../component/ContentEnviarSolicitud';
import NavUser from '../component/NavUser';

function Solicitud() {
  const [open, setOpen] = useState(false);
    
  const handleClick = () =>{
    setOpen(!open);
 }

  return (
    <> 

 <Slider  open={open} handleClick={handleClick} />
 <div className={`flex flex-col  h-screen w-full ${open ? "pl-22 ": "pl-16 md:pl-[18rem]"}`}>
 <NavUser/>
      
     <div className='flex-grow '>
     <ContentEnviarSolicitud open={open} handleClick={handleClick} />
     </div>
   
     <Footers/>
   

  </div>
   </>
  )
}

export default Solicitud;