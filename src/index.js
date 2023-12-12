import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css'
import Default from './pages/Default'
import Ide from './pages/Ide'
import Blog from './pages/Blog'
// require('dotenv').config()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div style={{ 'padding': '0px' }}>

    {/* <Default /> */}
    {/* <Ide /> */}
    <Blog />
  </div>

);
