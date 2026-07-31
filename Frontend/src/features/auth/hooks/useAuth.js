import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { loginUser, logoutUser, registerUser } from "../services/authApi";


export const useAuth = () =>{
    const context = useContext(AuthContext);
    const{user,setUser,loading,setLoading} = context;

    const register = async({username,email,password}) =>{
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



    const login = async({email,password}) =>{
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


    const logout = async () =>{
        setLoading(true);
        try{
            const data = await logoutUser();
            setUser(null);
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)

        }
    }


    return (user,loading,register,login,logout)
}



