import { createBrowserRouter, RouterProvider, Outlet } from "react-router"
import Home from "../pages/Home"
import Navbar from "../components/Navbar"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Footer from "../components/Footer"
import UpdateCard from "../components/UpdateCard"
import AdminLogin from "../pages/AdminLogin"

const LayOut = () => {
  return(
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/", element: <LayOut/>,
      children: [
        {path: "/", element: <Home/>},
        {path: "login", element: <Login/>},
        {path: "signup", element: <Signup/>},
        {path: "UpdateCard/:id", element: <UpdateCard/>},
        {path: "adminlogin", element: <AdminLogin/>}
      ]
  }
])

function Router() {
  return (
    <RouterProvider router={router}/>
  )
}

export default Router