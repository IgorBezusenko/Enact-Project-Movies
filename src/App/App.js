import {BrowserRouter as Router, Route} from "react-router-dom";
import MainPanel from "../components/Main/MainPanel";
import {Header} from "../components/Header/Header";
import {Form} from "../components/Form/Form";
import css from "./App.less"
import {MoviesPreview} from "../components/Main/Movies/MoviesPreview";
import {VideoPlayer} from "../components/VideoPlayer/VideoPlayer";
import {MoviesDescription} from "../components/Main/Movies/MoviesDescription";
import React from "react";

const App = () => {
    return (
        <Router>

            <Header/>
            <Route exact path={"/"} component={MainPanel}/>
            <Route path={"/auth"} component={Form}/>
            <Route path={"/detail"} component={MoviesPreview}/>
            <Route path={"/series"} component={VideoPlayer}/>
            <Route path={"/description"} component={MoviesDescription}/>


        </Router>
    )
}
export default App