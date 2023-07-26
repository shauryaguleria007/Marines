import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./pages/Login/Login"
import { UserRegister } from "./pages/Register/UserRegister"
import { SellerRegister } from "./pages/Register/SellerRegister"
import { AdminAuthorizer, Authorizer, SellerAuthorizer, UserAuthorizer } from "./components/Authorizer"
import { UserHome } from "./pages/Home/UserHome"
import { SellerHome } from "./pages/Home/SellerHome"
import { AdminHome } from "./pages/Home/AdminHome"
import { Error } from "./components/Error/Error"

export const App = () => {
  return <>
    <BrowserRouter>
      <Routes>

        <Route path="/" Component={Authorizer}>

          <Route path="/user" Component={UserAuthorizer}>
            <Route path="/user/home" Component={UserHome} />
          </Route>

          <Route path="/seller" Component={SellerAuthorizer}>
            <Route path="/seller/home" Component={SellerHome} />

          </Route>

          <Route path="/admin" Component={AdminAuthorizer}>
            <Route path="/admin/home" Component={AdminHome} />
          </Route>
        </Route>

        <Route path="/login" Component={Login} />
        <Route path="/registeruser" Component={UserRegister} />
        <Route path="registerseller" Component={SellerRegister} />
        <Route path="*" Component={Error} />
      </Routes>
    </BrowserRouter >
  </>
}
