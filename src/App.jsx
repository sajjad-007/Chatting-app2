import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/signup/SignUp";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
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
