import { useNavigate } from "react-router-dom"
import { ProfilePage } from "./ProfilePage"
import { useEffect, useState } from "react"



//profile view
export const Homepage=()=>{

    //some declarations
    const localUser = localStorage.getItem("media_user")
    const localUserObject = JSON.parse(localUser)
    const [currentUser, setCurrentUser] =useState([])

    useEffect(()=>{
        fetch(`http://localhost:8088/users/${localUserObject.id}`)
            .then((response)=> response.json())
            .then((thisUser)=>{
                setCurrentUser(thisUser)
            })
        },
        [])

    console.log(currentUser)

    return (<>
        {ProfilePage(currentUser)}
        </>
    )
}
