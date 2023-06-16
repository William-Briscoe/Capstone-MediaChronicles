import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { AppViews } from "./views/AppViews"
import { NavBar } from "./navbar/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
//import "./Repairs.css"


//react starting point
export const Chronicles = () =>{
    return <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />}/>

        <Route path="*" element={
            <Authorized>
                <>
                    <NavBar/>
                    <AppViews/>
        
                </>
            </Authorized>
        } />
    </Routes>
}