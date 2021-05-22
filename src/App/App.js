import {BrowserRouter as Router, Route} from "react-router-dom";
import MainPanel from "../components/Main/MainPanel";
import {Header} from "../components/Header/Header";
import {Form} from "../components/Form/Form";
import css from "./App.less"
import {MoviesPreview} from "../components/Main/Movies/MoviesPreview";

// const App = kind({
//     name: 'App',
//     render: () => (
//         <Router>
//             <Route path={"/"} component={HomeComponent}/>
//             <Route path={"/auth"} component={Form}/>
//             <Route path={"/home"} component={MainPanel}/>
//
//         </Router>
//     )
// })
const App = () => {
    return (
        <Router>
            <Header/>
            {/*<Route path={"/"} component={Header}/>*/}
            <Route exact path={"/"} component={MainPanel}/>
            <Route path={"/auth"} component={Form}/>

            <Route path={"/detail"} component={MoviesPreview}/>

        </Router>
    )
}
export default App