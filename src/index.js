import {render} from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./redux/store";


// In a browser environment, render instead of exporting
// if (typeof window !== 'undefined') {
//
// }

render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));