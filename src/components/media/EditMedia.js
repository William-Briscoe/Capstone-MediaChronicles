import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

export const EditMedia = () => {

    const localUser = localStorage.getItem("media_user")
    const localUserObject = JSON.parse(localUser)
    const navigate = useNavigate()
    const { mediaId } = useParams()
    const [platforms, setPlatforms] = useState([])
    const [media, update] = useState({})

    // initial state
    useEffect(()=>{
        fetch(`http://localhost:8088/media/${mediaId}`)
        .then(response => response.json())
        .then((data)=>{
            update(data)
        })
    },[])

    //platform array
    useEffect(
        () => {
            fetch(`http://localhost:8088/platform`)
                .then(response => response.json())
                .then((platformsArray) => {
                    setPlatforms(platformsArray)
                })
            console.log("initial state of platforms", platforms)//view all platforms
        },
        []
    )

    //we gon save with this one
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log('you have clicked me... why ;-;')

        //object to be sent back to the database
        const mediaToBeSentToAPI = {
            userId: localUserObject.id,
            title: media.title,
            image: media.image,
            creator: media.creator,
            releaseDate: media.releaseDate,
            platformId: media.platformId,
            dateLogged: ""
        }

        //sends object to api
        return fetch(`http://localhost:8088/media/${mediaId}`, {
            method: "PUT",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(mediaToBeSentToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/medialist") //change this to link to all media page !@!!!!!!!!!!
            })
    }

    return (
        <form className="mediacreationform">
            <h2 className="mediaFormTitle">Edit Media Item</h2>
            <fieldset>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What is the title of this item?"
                        value={media.title}
                        onChange={
                            (evt) => {
                                const copy = { ...media }
                                copy.title = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="releaseDate">Release Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={media.releaseDate}
                        onChange={(evt) => {
                            const copy = { ...media }
                            copy.releaseDate = evt.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="creator">Author/Developer:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What is the Author/Developer of this item?"
                        value={media.creator}
                        onChange={
                            (evt) => {
                                const copy = { ...media }
                                copy.creator = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="platformId">Platform:</label>
                    <select
                        id="platformId"
                        value={media.platformId}
                        onChange={(evt) => {
                            const copy = { ...media };
                            copy.platformId = evt.target.value;
                            update(copy);
                        }}
                    >
                        <option value="">Select a platform</option>
                        {platforms.map((platform)=>(
                            <option key={platform.id} value={platform.id}>
                                {platform.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="image">Image Link:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter a link to an image you would like to represent this item."
                        value={media.image}
                        onChange={
                            (evt) => {
                                const copy = { ...media }
                                copy.image = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Media Item
            </button>
        </form>
    )
}