import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Blogdetails from "../pages/BlogDetails/BlogDetails";
import SignIn from "../pages/SignIn/SignIn.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import AddBlog from "../pages/AddBlog/AddBlog.jsx";
import AllBlogs from "../pages/AllBlogs/AllBlogs.jsx";
import UpdateBlog from "../pages/UpdateBlog/UpdateBlog.jsx";
import AddPresident from "../pages/AddPresident/AddPresident.jsx";
import FlagshipEvent from "../pages/FlagshipEvent/FlagshipEvent.jsx";
import EventDetails from "../pages/FlagshipEvent/EventDetails.jsx";
import AddEvents from "../pages/AddEvents/AddEvents.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    errorElement: <h2>Route not found</h2>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },

      {
        path: '/blogs/:id',
        element: <Blogdetails></Blogdetails>,
        loader: async ({params}) => {
          const response = await fetch(`http://localhost:5000/blogs/${params.id}`);
          if (!response.ok) {
            throw new Error('Blog not found');
          }
          return await response.json();
        }
      },

      {
        path: '/addpost',
        element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>
      },

      {
        path: '/blogs',
        element: <AllBlogs></AllBlogs>
      },

      {
        path: '/updateBlog/:id',
        element: <UpdateBlog></UpdateBlog>,
        loader: ({params}) => fetch(`http://localhost:5000/blogs/${params._id}`)

      },
      {
        path: "/addpresident",
        element: <PrivateRoute><AddPresident></AddPresident></PrivateRoute>
      },

      {
        path: "/conference",
        element: <EventDetails></EventDetails>
      },
      {
        path: "/addevent",
        element: <PrivateRoute><AddEvents></AddEvents></PrivateRoute>
      },

      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/signin',
        element: <SignIn></SignIn>
      },


    ]
  },
]);

export default router;