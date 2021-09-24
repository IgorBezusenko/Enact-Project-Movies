import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import css from "./VideoPlayer.module.less";
import {NavOnBack} from "../NavOnBack/NavOnBack";
import {ItemBase} from "../Buttons/ItemBase";
import {FastForward, PauseCircle, PlayCircle, SkipBack, SkipForward} from "react-feather";
import Duration from "./DurationT";

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
                               }) => {
    const history = useHistory()
    const [keycode, setKeycode] = useState(null)
    const [hideControls, setHideControls] = useState(6)
    const movieFile = useSelector(state => state.mainReducer.movieFile)
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

        if (hideControls <= 1) {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [hideControls])

    const SEEK15 = 1 / duration * 15;
    const SEEK120 = 1 / duration * 120;

    const onGoPath = (path) => history.push(path)
    const onSelect = (e,path) => {
        if (e.code === "ArrowUp") {
            onGoPath(path)
        }
    }
    const genre = movieFile.genre && movieFile.genre.map((genre, i) => {
        return (<span key={i}>
            {i !== 0 && ", "}{genre.name}
        </span>)
    })

    let path = "/detail"
    if(movieFile.serial){
        path = "/series"
    }

    return <>
        {
            hideControls > 1 &&
            <div>
                <div className={css.title_controls}>
                    <NavOnBack className={css.on__back}
                               title={movieFile.title && movieFile.title}
                               subTitle={genre}
                               year={movieFile.year}
                               onClick={() => onGoPath(path)}
                               onKeyDown={(e=>onSelect(e,path))}
                    />
                </div>
                <div className={css.controls}>
                    <div className={css.btn_group}>
                        <ItemBase className={css.btn_controls} onClick={() => {
                            handleToggleMinus(SEEK120)
                        }}>
                            <FastForward className={css.p_controls} style={{transform: "rotate(180deg)"}}/>
                        </ItemBase>
                        <ItemBase className={css.btn_controls} onClick={() => {
                            handleToggleMinus(SEEK15)
                        }}>
                            <SkipBack className={css.p_controls}/>
                        </ItemBase>
                        <ItemBase className={css.btn_controls} onClick={handlePlayPause}>
                            {playing ? <PauseCircle/> : <PlayCircle/>}
                        </ItemBase>
                        <ItemBase className={css.btn_controls} onClick={() => {
                            handleTogglePlus(SEEK15)
                        }}><SkipForward
                            className={css.p_controls}/></ItemBase>
                        <ItemBase className={css.btn_controls} onClick={() => {
                            handleTogglePlus(SEEK120)
                        }}><FastForward
                            className={css.p_controls}/></ItemBase>
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
