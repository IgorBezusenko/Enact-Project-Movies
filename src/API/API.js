import  axios from "axios"
import {reactLocalStorage} from "reactjs-localstorage";

const instance = axios.create({
    baseURL:"https://api.portal.idc.md/api/",
    header:{
        // "HTTP-X-TOKEN": localStorage.getItem('my-token') || ""
        "HTTP-X-TOKEN":reactLocalStorage.get("token") || ""
    }
})

export const AuthAPI = {
    login(login,password){
        return instance.post(`/get_token`,{login,password})
    }
}


export const MainAPI={
    main(){
        return instance.get('/main').then(r=>r.data)
    },
    movieFile(id){
        return instance.get(`/file/${id}`,).then(r=>r.data)
    }
}