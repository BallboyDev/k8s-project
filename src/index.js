import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import Default from './pages/Default'
import Ide from './pages/Ide'
import Blog from './pages/Blog'
import './styles.scss'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import ActivityBar from './components/activityBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className={'BallboyDev'}>
    <HashRouter>
      {/* <BrowserRouter> */}
      <ActivityBar />
      <Routes>
        <Route path='/' element={<Blog />}> </Route>
        <Route path='Blog' element={<Blog />}> </Route>
        <Route path='Tools' element={<Default />}> </Route>
        <Route path='Ide' element={<Ide />}> </Route>
      </Routes>
      {/* </BrowserRouter> */}
    </HashRouter>
  </div >

);
