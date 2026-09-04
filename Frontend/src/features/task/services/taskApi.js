import api from "../../../../shared/api/axios";


export async function createTask(taskData){
   const response = await api.post('/api/task/create',taskData);
   return response.data
}

export async function getAllTasks(){
   const response = await api.get('/api/task/tasks');
   return response.data
}


export async function getTaskById(taskId){
   const response = await api.get(`/api/task/tasks/${taskId}`);
   return response.data
}


export async function updateTask(taskId,taskData){
   const response = await api.patch(`/api/task/tasks/update/${taskId}`,taskData);
   return response.data
}


export async function deleteTask(taskId){
   const response = await api.delete(`/api/task/tasks/delete/${taskId}`);
   return response.data
}


//generate task with ai
export async function generateTask({goal}){
   const response = await api.post('/api/ai/generate-tasks',{goal});
   return response.data
}
