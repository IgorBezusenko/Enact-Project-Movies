const initialState = {

    url: null,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false

}

export const playerReducer = (state = initialState, action) => {
    switch (action.type) {


        default :
            return state
    }
}

