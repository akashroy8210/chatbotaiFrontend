import axios from "axios"

const api=axios.create({
    baseURL:"http://localhost:8081/api"
})
api.interceptors.request.use((req)=>{
    const token=localStorage.getItem("token")
    if(token){
        req.headers.Authorization=`Bearer ${token}`
    }
    return req
})

api.interceptors.response.use(
    (res)=>res,
    (err)=>{
        if(err.response?.status===401){
            localStorage.removeItem("token")
            window.location.href="/"
        }
        return Promise.reject(err)
    }
)

export default api