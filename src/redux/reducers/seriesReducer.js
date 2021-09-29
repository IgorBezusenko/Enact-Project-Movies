import {CLEAR_ITEM_FOCUS, SET_CURRENT_SEASON, SET_CURRENT_SERIES, SET_ITEM_FOCUS, SET_MEDIA_FILES} from "../actions";

const initialState = {
    mediaFiles: [],
    actualCurrentSeason: null,
    currentSeries: null,
    inItemFocus: true
}
export const seriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MEDIA_FILES : {

            return {
                ...state,
                mediaFiles: [...action.mediaFiles],

            }
        }
        case SET_CURRENT_SEASON: {
            const actualCurrentSeason = state.mediaFiles.find((item) => item.isActive === true)
            console.log("actualCurrentSeason", actualCurrentSeason)
            return {
                ...state,
                actualCurrentSeason: actualCurrentSeason
            }
        }
        case SET_CURRENT_SERIES: {
            const actualCurrentSeries = state.actualCurrentSeason.items.find(item => item.isActive === true)
            console.log("actualCurrentSeries", actualCurrentSeries.title)
            return {
                ...state,
                currentSeries: actualCurrentSeries.title
            }
        }
        case SET_ITEM_FOCUS:
            return {
                ...state,
                inItemFocus: false
            }
        case CLEAR_ITEM_FOCUS:
            return {
                ...state,
                mediaFiles: [],
                actualCurrentSeason: null,
                currentSeries: null,
                inItemFocus: true
            }

        default:
            return state
    }
}
