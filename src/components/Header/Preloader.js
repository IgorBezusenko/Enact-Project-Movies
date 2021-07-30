import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";

export const Preloader = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(false)

        history.push("/main")
    }, [])
    return (
        <>
            {loading && <div >Loading</div>}
        </>
    )
}
