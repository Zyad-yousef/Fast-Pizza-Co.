import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu,{Loader as menuLoader} from "./features/menu/Menu";
import {Loader as orderLoader} from "./features/order/Order";
import Order from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder";
import Cart from "./features/cart/Cart";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import {action as createOrderAction} from "./features/order/CreateOrder";
import {action as updateOrderAction}from "./features/order/UpdateOrder"
const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    errorElement:<Error/>,
    children:[
      {
    path: "/",
    element: <Home />
  },
  {
    path: "/menu",
    element: <Menu />,
    loader:menuLoader,
    HydrateFallback: () => <p>Loading application...</p>,
  },
  {
    path: "/order/:orderId",
    element: <Order />,
    
    loader:orderLoader,
    HydrateFallback: () => <p>Loading application...</p>,
    action:updateOrderAction,
  },
  {
    path:'/order/new',
    element:<CreateOrder/>,
    action:createOrderAction
  },
  {
    path:'/cart',
    element:<Cart/>
  }

    ]
  },
  
]);


function App() {
  return (
      <RouterProvider router={router} />
    
  );
}

export default App;
