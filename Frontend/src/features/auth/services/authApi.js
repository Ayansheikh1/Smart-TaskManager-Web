import api from '../../../../shared/api/axios';




export async function registerUser(userData){
 
    const response = await api.post('/api/auth/register',userData);
    return response.data;

 
}//communicate between backend and return the response 




export async function loginUser(userData){
    const response = await api.post('/api/auth/login',userData)
    return response.data
}


export async function logoutUser(){
    const response = await api.post('/api/auth/logout')
    return response.data
}




