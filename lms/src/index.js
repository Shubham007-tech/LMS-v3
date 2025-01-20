import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import User from './components/User';
import Github from './components/Github';
import { basicInfo } from './components/Github';
import UdemyClone from './components/UdemyClone';
import VideoTiles from './components/VideoTile';
import Login from './components/Login';
import Signup from './components/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'user/:userid',
        element: <User />
      }
      ,
      {
        path: 'github',
        loader: basicInfo,
        element: <Github />
      }
      ,
      {
        path:'courses',
        element: <VideoTiles />
      } ,
      {
        path: 'videos/:categoryId',
        element: <UdemyClone /> 
      }
      ,
      {
        path: 'signup',
        element: <Signup /> 
      } ,
      {
        path: 'login',
        element: <Login /> 
      } 
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} >
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

