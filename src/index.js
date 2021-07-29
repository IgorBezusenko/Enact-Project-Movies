import ReactDOM from 'react-dom';
import React from 'react'
// import ReactDOM from 'react-tv'
import App from './App';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import AppReact from "./App/AppReact";



// In a browser environment, render instead of exporting
// if (typeof window !== 'undefined') {
//
// }

ReactDOM.render(<Provider store={store}><App/></Provider>   , document.getElementById('root'));

// ReactDOM.render(<App/>, document.getElementById('root'))
