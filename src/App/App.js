import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import MainPanel from "../components/Main/MainPanel";
import {Form} from "../components/Form/Form";
import {MoviesPreview} from "../components/Main/Movies/MoviesPreview";
import {VideoPlayer} from "../components/VideoPlayer/VideoPlayer";
import {MoviesDescription} from "../components/Main/Movies/MoviesDescription";
import {MovieSeries} from "../components/Main/Movies/MovieSeries";
import ThemeDecorator from "@enact/sandstone/ThemeDecorator";
import {Preloader} from "../components/Header/Preloader";

const App = () => {


    return (

        <Router basename={process.env.PUBLIC_URL}>
            <Preloader/>

            <Route  path={"/main"} component={MainPanel}/>

            <Route path={"/auth"} component={Form}/>
            <Route path={"/detail"} component={MoviesPreview}/>
            <Route path={"/player"} component={VideoPlayer}/>
            <Route path={"/description"} component={MoviesDescription}/>
            <Route path={"/series"} component={MovieSeries}/>


        </Router>
    )
}




export default ThemeDecorator(App);
