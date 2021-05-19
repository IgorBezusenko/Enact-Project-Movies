import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'


import MainPanel from "../components/Main/MainPanel";
import {Form} from "../components/Form/Form";

import css from "./App.less"
import kind from "@enact/core/kind";

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

            <Router>
                <Switch>
                    <Route exact path={"/"} component={Home}/>
                    <Route path={"/auth"} component={Form}/>
                    <Route path={"/panel"} component={MainPanel}/>
                </Switch>
            </Router>
        </>
    )
})
export default App