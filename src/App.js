import React from "react";
import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Home from "./components/Home"
import About from "./components/About"
import Project from "./components/Project"
import Contact from "./components/Contact"

const router = createBrowserRouter(
  [
      {
          path:"/",
          element:<Home/>,
      },
      {
          path:"/About",
          element:<About/>,
      },
      {
          path:"/Project",
          element:<Project/>,
      },
      {
           path:"/Contact",
           element:<Contact/>,
      }
  ]
);
function App() {
return (
  <div>
      <RouterProvider router = {router}/>
  </div>
);
}


export default App;
