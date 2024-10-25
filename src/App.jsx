import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/signup/SignUp";
import Home from "./pages/home/Home";
import Message from "./pages/message/Message";
import Notification from "./pages/notification/Notification";
import Setting from "./pages/setting/Setting";
import RootLayout from "./components/layout/RootLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<RootLayout/>}>
          <Route path="/home" element={<Home/>}/>
          <Route path="/message" element={<Message/>}/>
          <Route path="/notification" element={<Notification/>}/>
          <Route path="/setting" element={<Setting/>}/>
        </Route>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider
        router={router}
      />
      
    </>
  )
}

export default App
