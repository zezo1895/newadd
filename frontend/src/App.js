import Root from "./pages/Root";
import Home from "./pages/home/home";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Details from "./pages/Details/details";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} >
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart/>} />
      <Route path="/details/:id" element={<Details/>} />
    </Route>
  )
);

function App() {
  return(
  
    
   <RouterProvider router={router} />
  
  )
}

export default App;
