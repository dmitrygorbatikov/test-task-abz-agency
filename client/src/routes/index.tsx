import { Route, Routes } from "react-router-dom"
import Token from "../pages/Token"
import { DefaultRoute } from "./DefaultRoute"
import NotFound from "../pages/NotFound"
import Users from "../pages/Users"
import UserDetails from "../pages/UserDetails"
import Positions from "../pages/Positions"
import CreateUser from "../pages/CreateUser"
import TokenDetails from "../pages/TokenDetails"
import CreateToken from "../pages/CreateToken"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultRoute />}>
        <Route path="/" element={<Token />} />
        <Route path="/tokens/list/:id" element={<TokenDetails />} />
        <Route path="/tokens/create" element={<CreateToken />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/users/list/:userId" element={<UserDetails />} />
        <Route path="/positions" element={<Positions />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
