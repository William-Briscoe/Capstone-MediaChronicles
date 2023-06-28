import { UserCollectionList } from "../collections/UserCollectionList"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const EditProfilePage = () => {

    //declarations
    const navigate = useNavigate()
    const localUser = localStorage.getItem("media_user")
    const localUserObject = JSON.parse(localUser)
    const userId = useParams()
    const [thisUser, setThisUser] = useState({})

    console.log(thisUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        return fetch(`http://localhost:8088/users/${localUserObject.id}`, {
            method: "PUT",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(thisUser)
        })
        .then(response => response.json())
        .then(()=>{
            navigate(`/`)
        })
        
    }

    useEffect(()=>{
        fetch(`http://localhost:8088/users/${localUserObject.id}`)
        .then((response)=>response.json())
        .then((userdata)=>{
            setThisUser(userdata)
        })
    },
    []
    )


    return (<>
        <h2>User Info</h2>
        <section>

            <div>
                <div>
                <fieldset>
                        <div>
                            <label htmlFor="Image">Profile Picture Link:</label>
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder="Your Profile Pic"
                                value={thisUser.picture}
                                onChange={
                                    (evt) => {
                                        const copy = { ...thisUser }
                                        copy.picture = evt.target.value
                                        setThisUser(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                        <div>
                            <label htmlFor="Name">Name:</label>
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder="Your Name"
                                value={thisUser.name}
                                onChange={
                                    (evt) => {
                                        const copy = { ...thisUser }
                                        copy.name = evt.target.value
                                        setThisUser(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <div className="bio"><fieldset>
                        <div>
                            <label htmlFor="bio">Bio:</label>
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder="Your Bio"
                                value={thisUser.bio}
                                onChange={
                                    (evt) => {
                                        const copy = { ...thisUser }
                                        copy.bio = evt.target.value
                                        setThisUser(copy)
                                    }
                                } />
                        </div>
                    </fieldset></div>
                </div>
                <div>
                    <button onClick={handleSaveButtonClick}>Save Profile</button>
                </div>
            </div>
            <div>

                {thisUser.id === localUserObject.id
                    ? <>
                        <h2>Your Collections</h2>
                        <button onClick={() => { navigate("/createcollection") }}>Create a Collection</button>
                    </>
                    : <>
                        <h2>{thisUser.name}'s Collections</h2>

                    </>
                }

                {UserCollectionList(thisUser.id)}
            </div>

        </section>

        <section>
            {/* //value enhancing who you follow */}
        </section>
    </>
    )

}