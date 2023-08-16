import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./pages/Login/Login"
import { UserRegister } from "./pages/Register/UserRegister"
import { SellerRegister } from "./pages/Register/SellerRegister"
import { Error } from "./components/Error/Error"
import { AuthCallback } from "./components/AuthCallback"
import { Authorizer, UserAuthorizer, SellerAuthorizer, AdminAuthorizer } from "./components/Authorizer"
import { SellerHome } from "./pages/Home/Seller/SellerHome"
import { SellerProducts } from "./pages/Home/Seller/SellerProducts"
import { SellerOrders } from "./pages/Home/Seller/SellerOrders"
import { Snackbar, Alert } from "@mui/material"
import { useNotificationContext } from "./context/notificationContext"
import { UserHome } from "./pages/Home/user/UserHome"
import { Cart } from "./pages/cart/Cart"
import { SellerLogin } from "./pages/Login/SellerLogin"
import { About } from "./pages/About/About"

export const App = () => {

  const { notification, resetNotification } = useNotificationContext()

  return <>
    <Snackbar open={notification.activate} autoHideDuration={4000} onClose={resetNotification}>
      <Alert onClose={resetNotification} severity={notification.type} sx={{ width: '100%' }}>
        {notification?.message}
      </Alert>
    </Snackbar >
    <BrowserRouter>
      <Routes>

        <Route path="/about" Component={About} />
        <Route path="/login" Component={Login} />
        <Route path="/login/seller" Component={SellerLogin} />



        <Route path="/" Component={Authorizer} >
          <Route path="/user" Component={UserAuthorizer}>
            <Route path="/user/" Component={UserHome} />
            <Route path="/user/cart" Component={Cart} />
          </Route>

          <Route path="/seller" Component={SellerAuthorizer}>
            <Route path="/seller" Component={SellerHome} >
              <Route path="/seller/" Component={SellerProducts} />
              <Route path="/seller/orders" Component={SellerOrders} />
            </Route>
          </Route>


          <Route path="/admin" Component={AdminAuthorizer}></Route>
        </Route>
        <Route path="/register/user" Component={UserRegister} />
        <Route path="/register/seller" Component={SellerRegister} />
        <Route path="/auth/callback" Component={AuthCallback} />
        <Route path="*" Component={Error} />
      </Routes>
    </BrowserRouter >
  </>
}
