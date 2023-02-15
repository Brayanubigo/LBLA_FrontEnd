
import { useState, useEffect, createContext} from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import clienteAxios from "../config/axios";
const AuthContextUser = createContext()

const AuthProviderUser = ({children}) =>{
    const [authu, setAuthu] = useState({})
    const [cargando , setCargando] = useState(true)

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setCargando(false)
                return
            }
            const config = {
                headers:{
                        "Cotent-Type": "application/json",
                        Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await clienteAxios.get('/user/perfil' ,config)
            
                setAuthu(data)
                
            } catch (error) {
                console.log(error.response.data.msg)
                setAuthu({})
            }
            setCargando(false)
        }
        autenticarUsuario()
    },[])

    const cerrarSesionU = () =>{
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Cerrarás la sesión actual" ,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            errorButtonText:"Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title:'Sesion concluida',
                icon:'success'
              }
               
              )
              localStorage.removeItem('token')
              setAuthu({})
            }
          })
      

    }
    return(
        <AuthContextUser.Provider
        value={{
            authu,
            setAuthu,
            cargando,
            cerrarSesionU
           
        }}>
            
            {children}

        </AuthContextUser.Provider>
    )
}



export {
    AuthProviderUser
}

export default AuthContextUser