import { UserCollectionList } from "../collections/UserCollectionList"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ProfilePage = (userObject) =>{

    //declarations
    const navigate = useNavigate()
    const localUser = localStorage.getItem("media_user")
    const localUserObject = JSON.parse(localUser)

    console.log(userObject)


    return (<>
        <h2>User Info</h2>
        <section>
            
            <div>
                <div>
                    <img src={userObject.picture} alt="beautiful profile pic" width={80} height={100}/>
                </div>
                <div>
                    <div className="name">{userObject.name}</div>
                    <div className="bio">{userObject.bio}</div>
                </div>
            </div>
            <div>
                
                {userObject.id === localUserObject.id
                    ?<>
                    <h2>Your Collections</h2>
                    <button onClick={()=>{navigate("/createcollection")}}>Create a Collection</button>
                    </>
                    : <>
                    <h2>{userObject.name}'s Collections</h2>
                    
                    </>
                }
                
                {UserCollectionList(userObject.id)}
            </div>

        </section>

        <section>
            {/* //value enhancing who you follow */}
        </section>
        </>
    )

}