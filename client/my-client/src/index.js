import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import Reducers from './Redux/store.js'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(Reducers,compose(applyMiddleware(thunk)))


root.render(

  <Provider store={store}>
  <React.StrictMode>
    <App />
   </React.StrictMode>
   <ToastContainer/>
   </Provider>
   
);

