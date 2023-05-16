import React from 'react';
import { createBrowserRouter, RouterProvider }  from 'react-router-dom';

import { Home, Logout, Playground, SignIn, SignUp, Workspaces, Workspace, WorspaceLoader, CreateWorkspace, Exercicedemo, Exerciceliste } from './Pages';


export default function Main(prop: any) {


    const router = createBrowserRouter([
        {
          path: "/playground",
          element: <Playground/>,
        },
        {
            path: "/signin",
            element: <SignIn/>,
        },
        {
            path: "/signup",
            element: <SignUp/>,
        },
        {
            path: "/logout",
            element: <Logout/>,
        },
        {
            path:"/workspaces",
            element: <Workspaces/>,
        },
        {
            path: "/workspaces/:workspaceId",
            element: <Workspace/>,
            loader: WorspaceLoader,
        },
        {
            path: "/createWorkspace",
            element: <CreateWorkspace/>,
        },
        {
            path: "/exercices/:exerciceId",
            element: <Exercicedemo/>,
        },
        {
            path: "/exercices",
            element: <Exerciceliste/>,
        },
        {
            path: "/",
            element: <Home/>,
        }
      ]);
      

    return (
        <main>
            <RouterProvider router={router} />
        </main>
    )

}