import React from "react";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import ThemeDecorator from "@enact/sandstone/ThemeDecorator";

import MainPanel from "../components/Main/MainPanel";
import {AuthForm} from "../components/Auth/AuthForm";
import {MoviesPreview} from "../components/Main/Movies/MoviesPreview";
import {MoviesDescription} from "../components/Main/Movies/MoviesDescription";
import {MovieSeries} from "../components/Main/Movies/MovieSeries";
import {Preloader} from "../components/Header/Preloader";
import {AuthPage} from "../components/Auth/AuthPage";
import {AuthMobile} from "../components/Auth/AuthMobile";
import {Category} from "../components/Main/Category/Category";
import {CategoryFilter} from "../components/AppFilter/CategoryFilter";
import {CategorySort} from "../components/AppFilter/CategorySort";
import {SortPage} from "../components/SortPage/SortPage";
import {AllCheckBoxFilter} from "../components/AppFilter/AllCheckBoxFilter";
import {AllRadioFilter} from "../components/AppFilter/AllRadioFilter";
import {CustomVideoPlayer} from "../components/VideoPlayer/CustomVideoPlayer";
import {SearchPanel} from "../components/SearchPanel/SearchPanel";
import {HistoryPage} from "../components/HistoryPage/HistoryPage";
import {BookMark} from "../components/BookMark/BookMark";

import "./App.less"

const App = () => {
       return (

        <Router basename={process.env.PUBLIC_URL}>
            <Preloader/>
            <Route
                exact
                path={"/"}
                render={() => <Redirect to={"/main"}/>}
            />

            <Route path={"/main"} component={MainPanel}/>

            <Route exact path={"/auth"} component={AuthPage}/>
            <Route path={"/auth-form"} component={AuthForm}/>
            <Route path={"/auth-mobile"} component={AuthMobile}/>

            <Route path={"/detail"} component={MoviesPreview}/>

            <Route path={"/category"} component={Category}/>
            <Route path={"/app-filter"} component={CategoryFilter}/>

            <Route path={"/all-genre"} render={() => <AllCheckBoxFilter title={"Жанры"} itemType={"genre"}/>}/>
            <Route path={"/all-country"} render={() => <AllCheckBoxFilter title={"Страны"} itemType={"country"}/>}/>
            <Route path={"/all-year"} render={() => <AllRadioFilter title={"Годы"} itemType={"year"}/>}/>


            <Route path={"/search-panel"} component={SearchPanel}/>
            <Route path={"/history"} component={HistoryPage}/>
            <Route path={"/bookmark"} component={BookMark}/>


            <Route path={"/app-sort"} component={CategorySort}/>
            <Route path={"/app-search"} component={SortPage}/>

            <Route path={"/player"} component={CustomVideoPlayer}/>
            <Route path={"/description"} component={MoviesDescription}/>
            <Route path={"/series"} component={MovieSeries}/>


        </Router>
    )
}


export default ThemeDecorator(App);
// export default App;
