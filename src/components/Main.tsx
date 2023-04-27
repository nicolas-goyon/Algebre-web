import React from 'react';
import { createBrowserRouter, RouterProvider }  from 'react-router-dom';

import { Home, Logout, Playground, SignIn, SignUp } from './Pages';

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