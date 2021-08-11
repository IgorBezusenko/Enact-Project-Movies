import axios from "axios"
import {reactLocalStorage} from "reactjs-localstorage";

const instance = axios.create({
    baseURL: "https://api.portal.idc.md/api/",
    headers: {
        "HTTP-X-TOKEN": reactLocalStorage.get("token") || ""
    }
})

export const AuthAPI = {
    login(login, password) {
        return instance.post(`/get_token`, {login, password})
    }
}


export const MainAPI = {
    main() {
        return instance.get('/main').then(r => r.data)
    },
    movieFile(id) {
        return instance.get(`/file/${id}`).then(r => r.data)
    },
    videoUrl(file) {
        return instance.get(`/file/url/${file}`).then(r => r.data)
    },
    category(cid, currentPage=1, idSort=1) {
        return instance.get(`/file/category/${cid}/15?page=${currentPage}&id_sort=${idSort}`).then(r => r.data)
    },


}
export const MoviesPreview = {
    putLike(id, vote) {
        return instance.get(`/like/${id}/${vote}`).then(r => r.data)
    }
}

// const res =()=> MainAPI.category(102)
// res().then(r=>console.log(r.data))
