import {Redirect, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";

export const Preloader = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        // if (history.location.pathname ==="/"){
        //     console.log(history.location.pathname);
        //     setLoading(false)
        //     history.push("/main")
        // }
        history.push("/main")
        setLoading(false)

    }, [history.location.pathname==="/"])
    return (
        <>
            {loading && <div>Loaasdasd</div>}
        </>
    )
}
