import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";


export const EditCollection = () =>{
    
    //will redirect user to profile view
    const navigate = useNavigate()
    //other declarations
    const localUser = localStorage.getItem("media_user")
    const localUserObject = JSON.parse(localUser)
    const { collectionId } = useParams()

    const [collection, setCollection] = useState({})

    const handleSaveButtonClick = (event) =>{
        event.preventDefault()
        return fetch(`http://localhost:8088/collection/${collectionId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(collection)
        })
        .then(navigate(`/collection/${collectionId}`))
    }


    useEffect(()=>{
        fetch(`http://localhost:8088/collection/${collectionId}`)
        .then((response)=>response.json())
        .then((thiscollection)=>{
            setCollection(thiscollection)
        })
    },[])


    return(<>
        
        <form className="collectionForm">
            <h2 className="collectionFormTitle">Edit Collection</h2>
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
                                setCollection(copy)
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
                                setCollection(copy)
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
                                setCollection(copy)
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
                                setCollection(copy)
                            }
                        }/>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent)=>handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Collection
            </button>
        </form>
    </>)
}