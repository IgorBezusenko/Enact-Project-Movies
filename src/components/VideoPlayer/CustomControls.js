import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import css from "./VideoPlayer.module.less";
import {NavOnBack} from "../NavOnBack/NavOnBack";
import {ItemBase} from "../Buttons/ItemBase";
import {FastForward, PauseCircle, PlayCircle, SkipBack, SkipForward} from "react-feather";
import Duration from "./DurationT";
import {ItemBaseRef} from "./ItemBaseRef";
import {ARROW_DOWN, ARROW_ENTER, ARROW_LEFT, ARROW_RIGHT, ARROW_UP} from "../../redux/reducers/playerReducer";
import {setFocusRef, togglePlayingSeasonAndSeries} from "../../redux/actions";
import {REMOTE_KEYS} from "../../API/constKey";
import {useEventListener} from "../../hooks/useEventListener";

export const CustomControls = ({
                                   handlePlayPause,
                                   handleSeekChange,
                                   handleSeekMouseDown,
                                   handleSeekMouseUp,
                                   handleTogglePlus,
                                   handleToggleMinus,
                                   playing,
                                   played,
                                   duration,
                                   loaded,
                                   loop
                               }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [keycode, setKeycode] = useState(null)
    const [hideControls, setHideControls] = useState()
    const [path, setPath] = useState("/detail")
    const movieFile = useSelector(state => state.mainReducer.movieFile)
    const {playingSeasonAndSeries} = useSelector(state => state.seriesReducer)

    useEffect(() => {
        if (movieFile.serial) setPath("/series")
        return () => {
            dispatch(togglePlayingSeasonAndSeries({}))
        }
    }, [])

    useEffect(() => {
        setHideControls(6)
        const funcEvent = (e) => {
            setKeycode(e.timeStamp)
        }
        document.addEventListener("keydown", funcEvent);
        document.addEventListener("mousemove", funcEvent);
        return () => {
            document.removeEventListener("keydown", funcEvent)
            document.removeEventListener("mousemove", funcEvent);
        }
    }, [keycode])

    useEffect(() => {
        const interval = setInterval(() => {
            setHideControls(value => --value)
        }, 1000)

        const funcEvent = (e) => {
            if (e.key === ARROW_LEFT) {
                dispatch(setFocusRef(ARROW_LEFT))
            }
            if (e.key === ARROW_RIGHT) {
                dispatch(setFocusRef(ARROW_RIGHT))
            }
            if (e.key === ARROW_UP || e.key === ARROW_DOWN || e.key === ARROW_ENTER) {
                dispatch(setFocusRef(ARROW_ENTER))
            }
        }

        if (hideControls <= 1) {
            clearInterval(interval)
            document.addEventListener("keydown", funcEvent);
        }

        return () => {
            clearInterval(interval)
            document.removeEventListener("keydown", funcEvent)
        }
    }, [hideControls])

    useEffect(() => {
        if (played === 1) history.push(path)
    }, [played])

    const fullTime = 1 / duration
    const SEEK15 = fullTime * 15;
    const SEEK120 = fullTime * 120;

    function fastForward15() {
        // console.log({
        //     duration, playing,
        //     played, lll: (1 - SEEK15), SEEK15
        // })
        if (played < (1 - SEEK15)) {
            handleTogglePlus(SEEK15)
        }
    }

    function fastForward120() {
        if (played < (1 - SEEK120)) {
            handleTogglePlus(SEEK120)
        }
    }

    function fastForwardBack15() {
        if (played > SEEK15) {
            handleToggleMinus(SEEK15)
        }
    }

    function fastForwardBack120() {
        if (played > SEEK120) {
            handleToggleMinus(SEEK120)
        }
    }

    const onGoPath = (path) => history.push(path)
    const onSelect = (e, path) => {
        if (e.code === "ArrowUp") {
            onGoPath(path)
        }
    }
    const funcEventKEY = (e) => {
        switch (e.keyCode) {

            case REMOTE_KEYS.Stop:
                onGoPath(path);
                break;
            case REMOTE_KEYS.Play:
                handlePlayPause();
                break;
            case REMOTE_KEYS.Pause:
                handlePlayPause();
                break;
            case REMOTE_KEYS.FastForward:
                fastForward15()
                break;
            case REMOTE_KEYS.Rewind:
                fastForwardBack15()
                break;
            default:
                break;
        }
    }
    useEventListener("keydown", funcEventKEY)

    const genre = movieFile.genre && movieFile.genre.map((genre, i) => {
        return (<span key={i}>
            {i !== 0 && ", "}{genre.name}
        </span>)
    })

    // console.log({actualCurrentSeason, currentSeries})

    return <>
        {
            hideControls > 1 &&
            <div>
                <div className={css.title_controls}>
                    <NavOnBack className={css.on__back}
                               title={movieFile.title && movieFile.title}
                               subTitle={genre}
                               year={movieFile.year}
                               playingSeason={playingSeasonAndSeries?.playingSeason}
                               playingSeries={playingSeasonAndSeries?.playingSeries}
                               onClick={() => onGoPath(path)}
                               onKeyDown={(e => onSelect(e, path))}
                    />
                </div>
                <div className={css.controls}>
                    <div className={css.btn_group}>
                        <ItemBase className={css.btn_controls + " " + css.btn_controls_arrow}
                                  onClick={fastForwardBack120}
                        >
                            <FastForward className={css.p_controls} style={{transform: "rotate(180deg)"}}/>
                        </ItemBase>
                        <ItemBaseRef itemFocus={ARROW_LEFT}
                                     className={css.btn_controls + " " + css.btn_controls_arrow}
                                     onClick={fastForwardBack15}>
                            <SkipBack className={css.p_controls}/>
                        </ItemBaseRef>

                        <ItemBaseRef itemFocus={ARROW_ENTER}
                                     className={css.btn_controls}
                                     onClick={handlePlayPause}>
                            {playing ? <PauseCircle/> : <PlayCircle/>}
                        </ItemBaseRef>

                        <ItemBaseRef itemFocus={ARROW_RIGHT + " " + css.btn_controls_arrow}
                                     className={css.btn_controls + " " + css.btn_controls_arrow}
                                     onClick={fastForward15}><SkipForward
                            className={css.p_controls}/></ItemBaseRef>

                        <ItemBase className={css.btn_controls + " " + css.btn_controls_arrow}
                                  onClick={fastForward120}>
                            <FastForward className={css.p_controls}/>
                        </ItemBase>
                    </div>
                    <div className={css.btn_group}>
                        <div className={css.time_controls}><Duration seconds={duration * played}/></div>
                        <input className={css.input_control}
                               type='range' min={0} max={0.999999} step='any'
                               value={played}
                               onMouseDown={handleSeekMouseDown}
                               onChange={(e) => {
                                   handleSeekChange(e)
                               }}
                               onMouseUp={handleSeekMouseUp}
                        />
                        <div className={css.time_controls}><Duration seconds={duration * (1 - played)}/></div>
                    </div>
                </div>
            </div>
        }
    </>
}
