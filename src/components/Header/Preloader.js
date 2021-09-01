import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";

export const Preloader = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        history.push("/main")
        setLoading(false)

    }, [history.location.pathname==="/"])
    return (
        <>
            {loading && <div>Loading....</div>}
        </>
    )
}
