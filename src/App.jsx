import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  AuthLayout  from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'
import RutaProtegidaUser from './layout/RutaProtegidaUser'

import LoginAdm from './pages/admin/LoginAdm'
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import AdministrarSolicitud from './pages/admin/AdministrarSolicitud'
import { AuthProvider } from './context/AuthProvider'
import { AuthProviderUser } from './context/AuthProviderUser'
import AñadirUsuario from './pages/admin/AñadirUsuario'
import AñadirCurso from './pages/admin/AñadirCurso'
import AdminSolicitudes from './pages/admin/Solicitudes'
import AñadirAsignatura from './pages/admin/AñadirAsignatura'
import AñadirTipoSoli from './pages/admin/AñadirTipoSoli'

import SolicitudUser from './pages/Solicitud'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import ResetPassword from './pages/ResetPassword'
import NuevoPassword from './pages/NuevoPassword'
import Historial from './pages/Historial'

function App() {


  return (
    
     <BrowserRouter>
     <AuthProvider>
      <Routes>
        <Route path='/' element={<AuthLayout/>}>
            <Route index element={<LoginAdm/>}/>
            
            <Route path='registrarUsuario' element={<Registrar/>}/>
            <Route path='confirmar/:id' element={<ConfirmarCuenta/>}/>
            <Route path='olvide-password' element={<ResetPassword/>}/>
            <Route path='olvide-password/:token' element={<NuevoPassword/>}/>
        </Route>

        <Route path='/admin' element={<RutaProtegida />}>
            <Route index element={<AdministrarSolicitud />} />
            <Route path='add-user' element={<AñadirUsuario />} />
            <Route path='add-curso' element={<AñadirCurso />} />
            <Route path='add-asigna' element={<AñadirAsignatura />} />
            <Route path='add-tipo' element={<AñadirTipoSoli />} />
            <Route path='ver-soli' element={<AdminSolicitudes />} />
           
          </Route>
          </Routes>
          </AuthProvider>
          
          <AuthProviderUser>
          <Routes>
          <Route path='/user' element={<AuthLayout/>}>
          <Route index element={<Login/>}/>
          </Route>
          <Route path='/usuario' element={<RutaProtegidaUser />}>
            <Route index element={<SolicitudUser />} />
            <Route path='historial'element={<Historial />} />
           
           
          </Route>
          </Routes>
          </AuthProviderUser>
      
    

      
     </BrowserRouter>
  )
}

export default App
