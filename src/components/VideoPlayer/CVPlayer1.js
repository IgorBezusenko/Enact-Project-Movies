import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import {hot} from 'react-hot-loader'
import screenfull from 'screenfull'

import css from './VideoPlayer.module.less'
import './VideoPlayer.module.less'
import ReactPlayer from 'react-player'
import {CustomControls} from "./CustomControls";


class CVPlayer extends Component {
    state = {
        url: null,
        pip: false,
        playing: true,
        controls: true,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
        visibleControls: true,
        error:""
    }

    componentDidMount() {
        this.setState({
            url: this.props.url
        })
    }

    load = url => {
        this.setState({
            url,
            played: 0,
            loaded: 0,
            pip: false
        })
    }

    handlePlayPause = () => {
        this.setState({playing: !this.state.playing})
    }

    handleStop = () => {
        this.setState({url: null, playing: false})
    }

    handleToggleControls = () => {
        const url = this.state.url
        this.setState({
            controls: !this.state.controls,
            url: null
        }, () => this.load(url))
    }

    handleToggleLight = () => {
        this.setState({light: !this.state.light})
    }

    handleToggleLoop = () => {
        this.setState({loop: !this.state.loop})
    }

    handleVolumeChange = e => {
        this.setState({volume: parseFloat(e.target.value)})
    }

    handleToggleMuted = () => {
        this.setState({muted: !this.state.muted})
    }

    handleSetPlaybackRate = e => {
        this.setState({playbackRate: parseFloat(e.target.value)})
    }

    handleTogglePIP = () => {
        this.setState({pip: !this.state.pip})
    }

    handlePlay = () => {
        console.log('onPlay')
        this.setState({playing: true})
    }

    handleEnablePIP = () => {
        console.log('onEnablePIP')
        this.setState({pip: true})
    }

    handleDisablePIP = () => {
        console.log('onDisablePIP')
        this.setState({pip: false})
    }

    handlePause = () => {
        console.log('onPause')
        this.setState({playing: false})
    }

    handleSeekMouseDown = e => {
        this.setState({seeking: true})
    }

    handleSeekChange = e => {
        this.setState({played: parseFloat(e.target.value)})
    }

    handleSeekMouseUp = e => {
        this.setState({seeking: false})
        this.player.seekTo(parseFloat(e.target.value))
    }
    handleTogglePlus = (val) => {
        this.handleSeekMouseDown()
        this.setState({
            played: this.state.played + val
        })
        this.handleSeekMouseUp1(this.state.played + val)
    }

    handleToggleMinus = (val) => {
        this.handleSeekMouseDown()
        this.setState({
            played: this.state.played - val
        })
        this.handleSeekMouseUp1(this.state.played - val)
    }

    handleSeekMouseUp1 = value => {
        this.setState({seeking: false})
        this.player.seekTo(parseFloat(value))
    }

    handleProgress = state => {
        // console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }

    handleEnded = () => {
        console.log('onEnded')
        this.setState({playing: this.state.loop})
    }

    handleDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({duration})
    }

    handleClickFullscreen = () => {
        screenfull.request(findDOMNode(this.player))
    }

    renderLoadButton = (url, label) => {
        return (
            <button onClick={() => this.load(url)}>
                {label}
            </button>
        )
    }

    ref = player => {
        this.player = player
    }
    onHandleError=(e)=>{
        console.log('onError', e)
        this.setState({error:e})
    }
    onHandleSeek=(e)=>{
        console.log('onSeek', e)
    }
    onHandleReady=()=>{
        console.log('onReady')
    }
    onHandleStart=()=>{
        console.log('Start')
    }
    onHandleBuffer=() => {
        console.log('onBuffer')
    }

    render() {

        const {
            url,
            playing,
            controls,
            light,
            volume,
            muted,
            loop,
            played,
            loaded,
            duration,
            playbackRate,
            pip,
        } = this.state
        const SEPARATOR = ' · '

        return (
            < div className={css.player}
            >
                <CustomControls handlePlayPause={this.handlePlayPause}
                                handleSeekMouseDown={this.handleSeekMouseDown}
                                handleSeekChange={this.handleSeekChange}
                                handleSeekMouseUp={this.handleSeekMouseUp}
                                handleTogglePlus={this.handleTogglePlus}
                                handleToggleMinus={this.handleToggleMinus}
                                playing={playing}
                                played={played}
                                duration={duration}
                />

                {/*<div>*/}
                {/*    Error log {this.state.error && this.state.error}*/}
                {/*</div>*/}

                <ReactPlayer
                    ref={this.ref}
                    className='react-player'
                    width='100%'
                    height='100%'
                    url={url}
                    pip={pip}
                    playing={playing}
                    // controls={controls}
                    light={light}
                    loop={loop}
                    playbackRate={playbackRate}
                    volume={volume}
                    muted={muted}
                    onReady={this.onHandleReady}
                    onStart={this.onHandleStart}
                    onPlay={this.handlePlay}
                    onEnablePIP={this.handleEnablePIP}
                    onDisablePIP={this.handleDisablePIP}
                    onPause={this.handlePause}
                    onBuffer={this.onHandleBuffer}
                    onSeek={this.onHandleSeek}
                    onEnded={this.handleEnded}
                    onError={this.onHandleError}
                    onProgress={this.handleProgress}
                    onDuration={this.handleDuration}
                />

            </div>

        )
    }
}

export default hot(module)(CVPlayer)
