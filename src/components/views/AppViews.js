import { Outlet, Route, Routes } from "react-router-dom"
import { Homepage } from "../homepage/Homepage"
import { CollectionCreation } from "../collections/CollectionCreation"
import { MediaCreation } from "../media/MediaCreation"
import { MediaContainer } from "../media/MediaContainer"
import { UserContainer } from "../users/UserContainer"
import { UserPage } from "../users/UserPage"
import { IndividualCollection } from "../collections/IndividualCollection"
import { EditCollection } from "../collections/EditCollection"
import { EditMedia } from "../media/EditMedia"
import { EditProfilePage } from "../homepage/EditProfile"


//all my views/pages
export const AppViews = () =>{
    return (
        <Routes>
            <Route path="/" element={<Homepage/>}>
                
            </Route>

            <Route path="/createcollection" element={<CollectionCreation/>}>
                
            </Route>

            <Route path="/createmedia" element={<MediaCreation/>}></Route>
            <Route path="/editmedia/:mediaId" element={<EditMedia/>}/>
            <Route path="/medialist" element={<MediaContainer/>}/>

            <Route path="/userlist" element={<UserContainer/>}/>
            <Route path="/user/:userId" element={<UserPage/>}/>
            <Route path="/editprofile/:userId" element={<EditProfilePage/>}/>

            <Route path="/collection/:collectionId" element={<IndividualCollection/>}/>
            <Route path="/editcollection/:collectionId" element={<EditCollection/>}/>

        </Routes>
    )
}