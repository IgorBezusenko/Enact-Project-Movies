import React from "react";
import {Link} from "react-router-dom";
import {ButtonMovie} from "../../Buttons/ButtonMovie";


export const MovieFilm = ({movieFile}) => {

    return (
        <>

            <div>
                {movieFile.media && movieFile.media.map(sel => {
                    return (
                        <>
                            {
                                sel.items.map(item => {
                                    return (
                                        <>
                                            <Link to={"/player?file=" + item.file}>
                                                <ButtonMovie/>
                                            </Link>

                                        </>
                                    )
                                })
                            }
                        </>
                    )
                })
                }
            </div>
        </>
    )

}