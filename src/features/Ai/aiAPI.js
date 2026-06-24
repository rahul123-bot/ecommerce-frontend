import API from "../../api/axios";
 export const sendMessageApi =
 (message)=>API.post("/ai/chat",
    {
        message
    });