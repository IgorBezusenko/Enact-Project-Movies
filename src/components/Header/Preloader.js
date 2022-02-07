import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {AppLoading} from "../AppLoading/AppLoading";

export const Preloader = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        // history.push("/main")
        history.push("/auth-form")
        // history.push("/search-panel")
        setLoading(false)

    }, [])
    return (
        <>
            {loading && <AppLoading/>}
        </>
    )
}
