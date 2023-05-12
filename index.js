import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App'
import {schema} from './schema';
import { data } from './data';
//import App from "./testj"
  //import App from './lastone'
import App from "./Piechart"
import Graphy from './yes';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
 

  <React.StrictMode>
    <Graphy schema={schema} data={data}/>
  </React.StrictMode>
);
