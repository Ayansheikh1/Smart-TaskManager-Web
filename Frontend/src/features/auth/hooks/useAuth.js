import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { loginUser, registerUser } from "../services/authApi";


export const useAuth = () =>{
    const context = useContext(AuthContext);
    const{user,setUser,loading,setLoading} = context;

    const handleRegister = async({username,email,password}) =>{
        setLoading(true);
        try {
            const data = await registerUser({username,email,password});
            setUser(data.user);
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false);
        }
    }



    const handleLogin = async({email,password}) =>{
        setLoading(true);
        try{
            const data = await loginUser({email,password});
            setUser(data.user);

        }catch(error){
            console.log(error)
        }finally{
            setLoading(false);
        }
    }

    
}



