import { Outlet, Navigate } from "react-router-dom"
import useAuthUser from "../hooks/useAuthUser";


const RutaProtegidaUser = () => {
  const {authu, cargando } = useAuthUser();
  console.log(authu)
  
  if(cargando) return 'cargando...'
  return (
    <> 

    {authu?._id? <Outlet/> : <Navigate to="/user"/>}
    </>
  )
}

export default RutaProtegidaUser