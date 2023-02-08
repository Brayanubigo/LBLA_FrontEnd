
import { useState } from 'react';
import Slider from '../../component/Sidebar';
import Footers from '../../component/Footers';
import ContentSolicitudAdmin from '../../component/ContenSolicitudAdmin';
import Nav from '../../component/Nav';

function Solicitudes() {
  const [open, setOpen] = useState(false);
    
  const handleClick = () =>{
    setOpen(!open);
 }

  return (
    <> 

 <Slider  open={open} handleClick={handleClick} />
 <div className={`flex flex-col  h-screen w-full ${open ? "pl-22 ": "pl-16 md:pl-[18rem]"}`}>
 <Nav/>
     <div className='flex-grow '>
     <ContentSolicitudAdmin open={open} handleClick={handleClick} />
     </div>
   
     <Footers/>
   

  </div>
   </>
  )
}

export default Solicitudes;