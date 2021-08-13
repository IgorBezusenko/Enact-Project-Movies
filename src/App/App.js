import React, {useEffect} from "react";
import {BrowserRouter as Router, Route,Redirect} from "react-router-dom";
import {reactLocalStorage} from "reactjs-localstorage";
import {useSelector} from "react-redux";
import ThemeDecorator from "@enact/sandstone/ThemeDecorator";

import MainPanel from "../components/Main/MainPanel";
import {AuthForm} from "../components/Auth/AuthForm";
import {MoviesPreview} from "../components/Main/Movies/MoviesPreview";
import {VideoPlayer} from "../components/VideoPlayer/VideoPlayer";
import {MoviesDescription} from "../components/Main/Movies/MoviesDescription";
import {MovieSeries} from "../components/Main/Movies/MovieSeries";
import {Preloader} from "../components/Header/Preloader";
import {AuthPage} from "../components/Auth/AuthPage";
import {AuthMobile} from "../components/Auth/AuthMobile";
import {Category} from "../components/Main/Category/Category";
import { CategoryFilter} from "../components/AppFilter/CategoryFilter";
import {CategorySort} from "../components/AppFilter/CategorySort";

const App = () => {
    const token = useSelector(state => state.authReducer.token)
    useEffect(() => {
        reactLocalStorage.set('token', token);
    }, [token]);
    return (

        <Router basename={process.env.PUBLIC_URL}>
            <Preloader/>
            {/*<Route*/}
            {/*    exact*/}
            {/*    path={"/"}*/}
            {/*    render={() => <Redirect to={"/main"}/>}*/}
            {/*/>*/}
            <Route  path={"/main"} component={MainPanel}/>

            <Route exact path={"/auth"} component={AuthPage}/>
            <Route path={"/auth-form"} component={AuthForm}/>
            <Route path={"/auth-mobile"} component={AuthMobile}/>

            <Route path={"/detail"} component={MoviesPreview}/>

            <Route path={"/category"} component={Category}/>
            <Route path={"/app-filter"} component={CategoryFilter}/>
            <Route path={"/app-sort"} component={CategorySort}/>

            <Route path={"/player"} component={VideoPlayer}/>
            <Route path={"/description"} component={MoviesDescription}/>
            <Route path={"/series"} component={MovieSeries}/>


        </Router>
    )
}




export default ThemeDecorator(App);
// export default App;
