import Spottable from "@enact/spotlight/Spottable";
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setItemFocus} from "../../../../redux/actions";

const ButtonBase = ({itemFocusable, children, ...rest}) => {
    const itemRef = useRef(null)
    const dispatch = useDispatch()
    const {inItemFocus, currentSeries} = useSelector(state => state.seriesReducer)

    useEffect(() => {
        onSelectSeriesRef(currentSeries)
    }, [currentSeries])
    const onSelectSeriesRef = (currentSeries) => {
        if (itemFocusable === currentSeries && inItemFocus === true) {
            dispatch(setItemFocus())
            itemRef.current.focus();
        }
    }
    return (
        <button ref={itemRef} {...rest}>{children}</button>
    )
}

export const ButtonSeries = Spottable(ButtonBase)
