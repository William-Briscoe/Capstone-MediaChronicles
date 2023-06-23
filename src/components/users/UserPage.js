import { UserCollectionList } from "../collections/UserCollectionList"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProfilePage } from "../homepage/ProfilePage";



//profile view
export const UserPage=()=>{

    //some declarations
    const localUser = localStorage.getItem("media_user")
    const localUserObject = JSON.parse(localUser)
    const navigate = useNavigate()

    const { userId } = useParams()
    const [user, setUser] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:8088/users/${userId}`)
            .then((response) => response.json())
            .then((userData)=>{
                setUser(userData)
            })
        
    }, 
    [])

    return (<>
        {ProfilePage(user)}
        </>
    )
}
