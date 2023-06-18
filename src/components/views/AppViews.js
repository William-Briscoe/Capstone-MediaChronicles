import { Outlet, Route, Routes } from "react-router-dom"
import { Homepage } from "../homepage/Homepage"
import { CollectionCreation } from "../collections/CollectionCreation"


//all my views/pages
export const AppViews = () =>{
    return (
        <Routes>
            <Route path="/" element={<Homepage/>}>
                
            </Route>

            <Route path="/createcollection" element={<CollectionCreation/>}>
                
            </Route>
        </Routes>
    )
}