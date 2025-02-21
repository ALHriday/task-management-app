import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Layouts/Home.jsx';
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import TodoApp from './components/TodoApp/TodoApp.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import Login from './Auth/Login.jsx';
import Todo from './components/Todo.jsx';
import InProgress from './components/InProgress.jsx';
import Done from './components/Done.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/todo-app',
        element: <PrivateRoute><TodoApp/></PrivateRoute>,
        children: [
          {
            path: '/todo-app',
            element: <Todo></Todo>
          },
          {
            path: '/todo-app/inprogress',
            element: <InProgress></InProgress>
          },
          {
            path: '/todo-app/done',
            element: <Done></Done>
          }
        ]
      },
      {
        path: '/login',
        element: <Login></Login>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
