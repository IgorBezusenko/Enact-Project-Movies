import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'


import MainPanel from "../components/Main/MainPanel";
import {AuthForm} from "../components/Auth/AuthForm";

import css from "./App.less"
import kind from "@enact/core/kind";
import {Header} from "../components/Header/Header";
import {MoviesPreview} from "../components/Main/Movies/MoviesPreview";
import {VideoPlayer} from "../components/VideoPlayer/VideoPlayer";
import {MoviesDescription} from "../components/Main/Movies/MoviesDescription";
import {MovieSeries} from "../components/Main/Movies/MovieSeries";
import React from "react";

const Home = () => (<>
    <div className={css.bgRed}>
        <MainPanel/>
        <ul>
            <li><Link to={"/auth"}>Login</Link></li>
            <li><Link to={"/panel"}>MainPanel</Link></li>
        </ul>
    </div>
</>)


const App = kind({
    name: 'App',
    render: () => (
        <>
            <Router basename={process.env.PUBLIC_URL}>

                <Header/>
              <Switch>
                  <Route exact path={"/"} component={MainPanel}/>
                  <Route path={"/auth"} component={AuthForm}/>
                  <Route path={"/detail"} component={MoviesPreview}/>
                  <Route path={"/player"} component={VideoPlayer}/>
                  <Route path={"/description"} component={MoviesDescription}/>
                  <Route path={"/series"} component={MovieSeries} />
              </Switch>


            </Router>
            {/*<Router>*/}
            {/*    <Switch>*/}
            {/*        <Route exact path={"/"} component={Home}/>*/}
            {/*        <Route path={"/auth"} component={AuthForm}/>*/}
            {/*        <Route path={"/panel"} component={MainPanel}/>*/}
            {/*    </Switch>*/}
            {/*</Router>*/}
        </>
    )
})
export default App
