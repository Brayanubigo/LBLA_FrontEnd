
import { useState } from 'react';
import Slider from '../../component/Sidebar';
import Footers from '../../component/Footers';
import Contents from '../../component/Contents';
import Nav from '../../component/Nav';

function AdministrarSolicitud() {
  const [open, setOpen] = useState(false);
    
  const handleClick = () =>{
    setOpen(!open);
 }

  return (
    <> 
 
 <Slider  open={open} handleClick={handleClick} />
 <div className={`flex flex-col duration-200  h-screen w-full ${open ? "pl-22 ": "pl-16 md:pl-[18rem]"}`}>
 <Nav/>
     <div className='flex-grow '>
     <Contents open={open} handleClick={handleClick} />
     </div>
   
     <Footers/>
   

  </div>
   </>
  )
}

export default AdministrarSolicitud