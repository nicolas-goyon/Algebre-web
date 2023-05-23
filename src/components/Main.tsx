import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home, Logout, Playground, SignIn, SignUp, Workspaces, Workspace, WorspaceLoader, CreateWorkspace, Exercicedemo, Exerciceliste, CreateExercice } from './Pages';


export default function Main(prop: any) {


    const router = createBrowserRouter([
        {
            path: "/playground",
            element: <Playground />,
        },
        {
            path: "/signin",
            element: <SignIn />,
        },
        {
            path: "/signup",
            element: <SignUp />,
        },
        {
            path: "/logout",
            element: <Logout />,
        },
        {
            path: "/workspaces",
            element: <Workspaces />,
        },
        {
            path: "/workspaces/:workspaceId",
            element: <Workspace />,
            loader: WorspaceLoader,
        },
        {
            path: "/createWorkspace",
            element: <CreateWorkspace />,
        },
        {
            path: "/exercices/:exerciceId",
            element: <Exercicedemo />,
        },
        {
            path: "/exercices",
            element: <Exerciceliste />,
        },
        {
            path: "/createExercice",
            element: <CreateExercice />,
        },
        {
            path: "/",
            element: <Home />,
        }
    ]);

    const noFrameRoutes = ["/signin", "/signup", "/logout"];

    return (
        <main>
            {noFrameRoutes.includes(window.location.pathname) ? 
                <RouterProvider router={router} /> 
            : 
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-light">
                    <RouterProvider router={router} />
                </div>
            }
        </main>
    )

}