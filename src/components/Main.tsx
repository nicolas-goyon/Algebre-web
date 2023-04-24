import React from 'react';
import { createBrowserRouter, RouterProvider }  from 'react-router-dom';

import Home from './Pages/Home';
import Playground from './Pages/Playground';

export default function Main(prop: any) {


    const router = createBrowserRouter([
        {
          path: "/playground",
          element: <Playground/>,
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