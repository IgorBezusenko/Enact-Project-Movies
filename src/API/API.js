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
    },
    logout(){
        return instance.get(`logout`).then(r => r.data)
    },
    setAuthToken(token) {
        // debugger
        if (token) {
            //applying token
            instance.defaults.headers["HTTP-X-TOKEN"] = reactLocalStorage.set("token", token) ;
        } else {
            //deleting the token from header
            delete instance.defaults.headers["HTTP-X-TOKEN"];
        }
    }
}


export const MainAPI = {
    main(token) {
        AuthAPI.setAuthToken(token)
        return instance.get('/main').then(r => r.data)
    },
    movieFile(id) {
        return instance.get(`/file/${id}`).then(r => r.data)
    },
    videoUrl(file) {
        return instance.get(`/file/url/${file}`).then(r => r.data)
    },
    category(cid, currentPage="1", idSort="1") {
        return instance.get(`/file/category/${cid}/15?page=${currentPage}&id_sort=${idSort}`).then(r => r.data)
    },
    categoryFilter() {
        return instance.get(`/listFilter`).then(r => r.data)
    },
    searchFilter(genre='', country='',year='',typeContent=''){
        return instance.get(`/searchExt/15?genre=${genre}&country=${country}&year=${year}&type_content=${typeContent}`).then(r => r.data)
    },
    searchMovie(query){
        return instance.get(`/searchExt/15?query=${query}`).then(r => r.data)
    },
    history(){
        return instance.get(`/history/15`).then(r => r.data)
    },
    bookmark(){
        return instance.get(`/bookmark/15`).then(r => r.data)
    },
 bookmarkToggle(id){
        return instance.get(`bookmark/change/${id}`).then(r => r.data)
    },


}
export const MoviesPreview = {
    putLike(id, vote) {
        return instance.get(`/like/${id}/${vote}`).then(r => r.data)
    }
}

// const res =()=> AuthAPI.logout()
// res().then(r=>console.log(r.data))
