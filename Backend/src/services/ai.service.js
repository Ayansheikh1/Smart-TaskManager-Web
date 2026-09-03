const { GoogleGenAI } = require('@google/genai');
const { z } = require('zod')




const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });




const taskSchema = z.object({
    title: z.string().min(3).max(100).describe("Title of the task"),
    description:z.string().describe("Description of the task"),
    priority:z.enum(["Low", "Medium", "High"]).describe("Priority of the task"),
    status:z.enum(["Todo"]).describe("Status of the task"),
    dueDate: z.string().describe("Due date of the task in YYYY-MM-DD format")
})


async function generateTasks({goal}){
        const prompt = `Generate a task based on this goal : ${goal}`
        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents:prompt,
            config: {
           
            responseMimeType: "application/json",
            responseSchema: z.toJSONSchema(taskSchema),
           
        }
        })
        

        const task = taskSchema.parse(JSON.parse(response.text));
        return task;
}



module.exports = { generateTasks }







//Test
// require("dotenv").config();

// console.log("Key loaded:", Boolean(process.env.GEMINI_API_KEY));
// console.log("Key length:", process.env.GEMINI_API_KEY?.length);

// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });

// async function test() {
//     try {
//         const response = await ai.models.generateContent({
//             model: "gemini-3.6-flash",
//             contents: "Reply with exactly: Gemini works"
//         });

//         console.log(response.text);
//     } catch (error) {
//         console.error(error);
//     }
// }

// test();
