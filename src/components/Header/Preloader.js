import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";

export const Preloader =()=>{
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        console.log(history)
        setLoading(false)
        history.push("/")
    },[])
    return(
       <>
           { loading &&  <div>Loading</div>}
       </>
    )
}
