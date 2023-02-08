import { useContext } from "react";
import AuthContextUser from "../context/AuthProviderUser";

const useAuthUser = () =>{
    return useContext(AuthContextUser)
}

export default useAuthUser