import {BrowserRouter as Router, Route} from "react-router-dom";
import MainPanel from "../components/Main/MainPanel";
import {Header} from "../components/Header/Header";
import {Form} from "../components/Form/Form";
import css from "./App.less"
import {Movies} from "../components/Main/Movies/Movies";

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
            <Route path={"/"} component={Header}/>
            <Route path={"/auth"} component={Form}/>
            <Route path={"/home"} component={MainPanel}/>
            <Route path={"/detail/:id?"} component={Movies}/>

        </Router>
    )
}
export default App