import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CollectionCreation = () =>{

    //will redirect user to profile view
    const navigate = useNavigate()
    //other declarations
    const localUser = localStorage.getItem("media_user")
    const localUserObject = JSON.parse(localUser)


    //intital state
    const [collection, update] = useState({
        name:"",
        picture:"",
        description:"",
        isPrivate: false
    })
    //we gon save with this one
    const handleSaveButtonClick = (event) =>{
        event.preventDefault()
        console.log('you have clicked me... why ;-;')
    
        //object to be sent back to the database
        const collectionToBeSentToAPI = {
            userId: localUserObject.id,
            name: collection.name,
            picture: collection.picture,
            description: collection.description,
            isPrivate: collection.isPrivate,
            dateCreated: ""
        }

        //sends object to api
        return fetch(`http://localhost:8088/collection`, {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(collectionToBeSentToAPI)
        })
            .then(response => response.json())
            .then(()=>{
                navigate("/")
            })
    }

    //form JSX
    return(
        <form className="collectionForm">
            <h2 className="collectionFormTitle">New Collection!!</h2>
            <fieldset>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name your collection"
                        value={collection.name}
                        onChange={
                            (evt)=>{
                                const copy = {...collection}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        }/>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Give a brief description"
                        value={collection.description}
                        onChange={
                            (event)=>{
                                const copy = {...collection}
                                copy.description= event.target.value
                                update(copy)
                            }
                        }/>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="picture">Image</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter a link to an image for the collection"
                        value={collection.picture}
                        onChange={
                            (event)=>{
                                const copy = {...collection}
                                copy.picture= event.target.value
                                update(copy)
                            }
                        }/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="private"/>
                    <input type="checkbox"
                        value={collection.isPrivate}
                        onChange={
                            (event) =>{
                                const copy = {...collection}
                                copy.isPrivate =event.target.checked
                                update(copy)
                            }
                        }/>Private this collection?
                </div>
            </fieldset>
            <button
                onClick={(clickEvent)=>handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Collection
            </button>
        </form>
    )

}