import {CornerUpLeft} from "react-feather";
import React from "react";

export const NavOnBack=(props)=>{
    return(
        <>
            <h2 onClick={props.onGoBack}><CornerUpLeft/> {props.title? props.title:null}</h2>
        </>
    )
}