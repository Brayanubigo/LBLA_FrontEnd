import { Outlet, Navigate } from "react-router-dom"
import useAuthUser from "../hooks/useAuthUser";


const RutaProtegidaUser = () => {
  const {authu, cargando } = useAuthUser();
 
  
  if(cargando) return 'cargando...'
  return (
    <> 

    {authu?._id? <Outlet/> : <Navigate to="/user"/>}
    </>
  )
}

export default RutaProtegidaUser