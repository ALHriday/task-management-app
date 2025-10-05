import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

import Home from './Layouts/Home.jsx';
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import TodoApp from './components/TodoApp/TodoApp.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import Login from './Auth/Login.jsx';
import Todo from './components/Todo.jsx';
import InProgress from './components/InProgress.jsx';
import Done from './components/Done.jsx';
import CreateTodo from './components/CreateTodo.jsx';
import UpdateTask from './components/UpdateTask.jsx';
import axios from 'axios';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    hydrateFallbackElement: <div className='text-center py-2'>Loading...</div>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/todo-app',
        element: <PrivateRoute><TodoApp /></PrivateRoute>,
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
          },
          {
            path: '/todo-app/create-todo',
            element: <CreateTodo></CreateTodo>
          },
          {
            path: '/todo-app/update-todo/:_id',
            element: <UpdateTask />,
            loader: ({ params }) => axios.get(`http://localhost:2100/todo/${params._id}`)
          },
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
