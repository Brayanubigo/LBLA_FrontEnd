
import { useState } from 'react';
import Slider from '../../component/Sidebar';
import Footers from '../../component/Footers';
import ContentsAddCur from '../../component/ContentsAddCur';
import Nav from '../../component/Nav';

function AñadirCurso() {
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
     <ContentsAddCur open={open} handleClick={handleClick} />
     </div>
   
     <Footers/>
   

  </div>
   </>
  )
}

export default AñadirCurso;