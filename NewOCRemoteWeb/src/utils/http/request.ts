import axios from "axios";
import { toast } from "vue-sonner";

export const baseUrl = "http://192.168.31.196:125"

const http = axios.create({
    baseURL:baseUrl,
    timeout: 10*1000
})

http.interceptors.response.use((response)=>{
    //response wiht 2xx
    return response;
},(error)=>{
    //response with not 2xx
    toast.error("网络请求失败",error.message);
    return {}
})

export default http;