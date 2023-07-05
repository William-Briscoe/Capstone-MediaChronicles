import { UserCollectionList } from "../collections/UserCollectionList"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProfilePage.scss"

export const ProfilePage = (userObject) => {

    //declarations
    const navigate = useNavigate()
    const localUser = localStorage.getItem("media_user")
    const localUserObject = JSON.parse(localUser)

    console.log(userObject)

    const handleEditButtonClick = () => {

    }


    return (<>

        <section>

            <div className="profileInfo">
                <div>
                    <img className="avatar" src={userObject.picture} alt="beautiful profile pic" width={80} height={100} />
                </div>
                <div className="profiletext">
                    <h4 className="name">{userObject.name}</h4>
                    <div className="bio">{userObject.bio}</div>
                </div>
                <div className="editprofile">
                    {userObject.id === localUserObject.id ? <button onClick={() => {
                        navigate(`/editprofile/${localUserObject.id}`)
                    }}>Edit Profile</button> : <></>}
                </div>
            </div>
            <div>
                <div className="titleandbutton">
                    {userObject.id === localUserObject.id
                        ? <>
                            <h2 className="userscollections">Your Collections</h2>
                            <button onClick={() => { navigate("/createcollection") }}>Create a Collection</button>
                        </>
                        : <>
                            <h2>{userObject.name}'s Collections</h2>

                        </>
                    }
                </div>
                {UserCollectionList(userObject.id)}
            </div>

        </section>

        <section>
            {/* //value enhancing who you follow */}
        </section>
    </>
    )

}