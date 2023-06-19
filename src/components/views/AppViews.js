import { Outlet, Route, Routes } from "react-router-dom"
import { Homepage } from "../homepage/Homepage"
import { CollectionCreation } from "../collections/CollectionCreation"
import { MediaCreation } from "../media/MediaCreation"
import { MediaContainer } from "../media/MediaContainer"
import { UserContainer } from "../users/UserContainer"


//all my views/pages
export const AppViews = () =>{
    return (
        <Routes>
            <Route path="/" element={<Homepage/>}>
                
            </Route>

            <Route path="/createcollection" element={<CollectionCreation/>}>
                
            </Route>

            <Route path="/createmedia" element={<MediaCreation/>}></Route>
            <Route path="/medialist" element={<MediaContainer/>}/>
            <Route path="/userlist" element={<UserContainer/>}/>
        </Routes>
    )
}