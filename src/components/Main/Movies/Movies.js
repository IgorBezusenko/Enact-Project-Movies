import React from "react";
import {
    useParams,
    useLocation,
    useHistory,
    useRouteMatch,
} from "react-router-dom";

export const Movies=()=>{
    const params = useParams()
    const location = useLocation()
    const history = useHistory()
    const match = useRouteMatch()
    console.log(params)
    console.log(location)
    console.log(history)
    console.log(match)
    return(
        <>
            <div> {params.id} </div>
        <div>Movies</div>
        </>
    )
}