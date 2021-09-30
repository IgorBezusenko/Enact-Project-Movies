import {ButtonSpotTable} from "../../../Buttons/ButtonSpotTable";
import css from "./MovieSeries.module.less";
import React from "react";

export const SeasonList = ({mediaItems, onClickToSeason, currentSeason}) => {
    return mediaItems.map((media, index) => {
            return media.title
                && <ButtonSpotTable key={index}
                                    className={css.btn + " " + css.btn__season
                                    + " " + `${media.title === currentSeason && css.btn__season_focus} `}
                                    onFocus={() => onClickToSeason(media.title)}
                >{media.title}</ButtonSpotTable>
        }
    )
}
