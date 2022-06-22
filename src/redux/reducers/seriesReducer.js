import {
    CLEAR_ITEM_FOCUS,
    CLEAR_MEDIA_FILES,
    SET_CURRENT_SEASON,
    SET_CURRENT_SERIES,
    SET_ITEM_FOCUS,
    SET_MEDIA_FILES,
    SET_PLAYING_SEASON_AND_SERIES
} from "../actions";

const initialState = {
    mediaFiles: [],
    actualCurrentSeason: null,
    currentSeries: null,
    isItemFocus: true,
    playingSeasonAndSeries: {}
}
export const seriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLAYING_SEASON_AND_SERIES : {
            return {
                ...state,
                playingSeasonAndSeries: {...action.payload},
            }
        }
        case SET_MEDIA_FILES : {
            return {
                ...state,
                mediaFiles: [...action.mediaFiles],
            }
        }

        case CLEAR_MEDIA_FILES : {
            return {
                ...state,
                mediaFiles: [],
            }
        }
        case SET_CURRENT_SEASON: {
            const actualCurrentSeason = state.mediaFiles.find((item) => item.isActive === true)
            const actualCurrentSeriesOfFilm = state.mediaFiles.find((item) => item.title === "Серии")
            return {
                ...state,
                actualCurrentSeason: actualCurrentSeason || actualCurrentSeriesOfFilm
            }
        }
        case SET_CURRENT_SERIES: {
            const actualCurrentSeries = state.actualCurrentSeason.items.find(item => item.isActive === true)
            return {
                ...state,
                currentSeries: actualCurrentSeries.title
            }
        }
        case SET_ITEM_FOCUS:
            return {
                ...state,
                isItemFocus: false
            }
        case CLEAR_ITEM_FOCUS:
            return {
                ...state,
                // mediaFiles: [],
                actualCurrentSeason: null,
                currentSeries: null,
                isItemFocus: true
            }

        default:
            return state
    }
}
