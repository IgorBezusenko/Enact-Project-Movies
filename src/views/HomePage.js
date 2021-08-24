import {Redirect, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";

export const HomePage = ()=>{
    const history = useHistory()
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        // if (history.location.pathname ==="/"){
        //     console.log(history.location.pathname);
        //     setLoading(false)
        //     history.push("/main")
        // }
        // history.push("/main")
        console.log(history.location.pathname,redirect)
        setRedirect(true)
        console.log(history.location.pathname,redirect)
    }, [history.location.pathname])
    console.log(history.location.pathname,redirect)
    return(
        <>
            {redirect && <Redirect to={"/main"}/>}

        </>
    )
}
