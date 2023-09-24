import React from "react";
import { Route, BrowserRouter,Routes } from "react-router-dom";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import UserTasks from "../Pages/UserTasks"

function AdminRoutes() {
    return(
        <BrowserRouter>
        <Routes>
            <Route element = {<Login/>}  path="/" exact/>
            <Route element = {<Register/>}  path="/register" />
            <Route element = {<UserTasks/>}  path="/tasks" />
        </Routes>
        </BrowserRouter>
    )
 }
 
 export default AdminRoutes;