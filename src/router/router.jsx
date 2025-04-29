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
import { API_URL } from '../config/config';
import Resources from "../pages/Resources/Resources.jsx";
import ChangeBanner from "../pages/ChangeBanner/ChangeBanner.jsx";
import Founders from "../pages/About/Founders.jsx";
import Advisors from "../pages/About/Advisors.jsx";
import Team from "../pages/Team/Team.jsx";
import Trustees from "../pages/About/Trustees.jsx";

import Announcement from "../pages/Announcement/Announcement.jsx";
import Events from "../pages/Events/Events.jsx";
import ExtraEventDetails from "../pages/ExtraEvenDetails/ExtraEventDetails.jsx";
import GoverningBoardMembers from "../pages/About/GoverningBoard.jsx";
import AboutCumuna from "../pages/AboutCumuna/AboutCumuna.jsx";
// import Committee from "../pages/Committee/Committee.jsx";



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
          const response = await fetch(`${API_URL}/blogs/${params.id}`);
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
        loader: ({params}) => fetch(`${API_URL}/blogs/${params._id}`)

      },

      {
        path: '/extraevents',
        element: <Events></Events>
      },

      {
        path: '/extraevents/:id',  // ✅ plural
        element: <ExtraEventDetails></ExtraEventDetails>,
        loader: async ({ params }) => {
          const response = await fetch(`${API_URL}/extraevents/${params.id}`);
          if (!response.ok) {
            throw new Error('Event not found');
          }
          return await response.json();
        }
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
        path: "/resources",
        element: <Resources></Resources>
      },
      {
        path: "/aboutus",
        element: <AboutCumuna></AboutCumuna>
      },
      {
        path: "/committee",
        element: <Team></Team>
      },
      {
        path: "/about/founders",
        element: <Founders></Founders>
      },
      {
        path: "/about/advisors",
        element: <Advisors></Advisors>
      },
      {
        path: "about/trustees",
        element: <Trustees></Trustees>
      },
      {
        path: "about/governingboard",
        element: <GoverningBoardMembers></GoverningBoardMembers>
      },

      {
        path: "/announcements",
        element: <Announcement></Announcement>
      },
      {
        path: "/changebanner",
        element: <PrivateRoute><ChangeBanner></ChangeBanner></PrivateRoute>
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