import { Outlet, Route, Routes } from "react-router-dom"
import { Homepage } from "../homepage/Homepage"


//all my views/pages
export const AppViews = () =>{
    return (
        <Routes>
            <Route path="/" element={<Homepage/>}>
                
            </Route>
        </Routes>
    )
}