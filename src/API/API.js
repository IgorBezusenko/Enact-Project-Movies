import  axios from "axios"

const instance = axios.create({
    baseURL:"https://api.portal.idc.md/api/",
    header:{
        // "HTTP-X-TOKEN": localStorage.getItem('my-token') || ""
        "HTTP-X-TOKEN": null
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
    }
}