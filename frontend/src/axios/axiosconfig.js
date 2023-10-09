import axios from "axios"
import Cookies from "js-cookie"

const axiosInstance=axios.create(
    {
        baseURL:"http://127.0.0.1:8000/",
        headers:{
            'Content-Type':'application/json',
            //Authorization:Cookies.get("accessToken-C")? `Bearer ${JSON.parse(Cookies.get("accessToken-C"))}`  :null,
            accept:'application/json'
        }
    }
)

export default axiosInstance