import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const MediaCreation = () => {

    const localUser = localStorage.getItem("media_user")
    const localUserObject = JSON.parse(localUser)
    const navigate = useNavigate()
    const [platforms, setPlatforms] = useState([])
    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    const [isGame, setIsGame] = useState(null)
    // initial state
    const [media, update] = useState({
        platformId: "",
        releaseDate: "",
        title: "",
        creator: "",
        image: "",

        dateLogged: ""
    })


    //checks if media item is game or not
    useEffect(() => {
        if (media.platformId > 3) {
            setIsGame(true)
        } else {
            setIsGame(false)
        }
        console.log(isGame)
    },
        [media.platformId]
    )

    useEffect(() => {
        console.log(selectedGenres)
    }, [selectedGenres])

    //genre array
    useEffect(
        () => {
            fetch(`http://localhost:8088/genre`)
                .then(response => response.json())
                .then((data) => {
                    setGenres(data)
                })
            console.log("genre array", genres)
        },
        []
    )


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
        return fetch(`http://localhost:8088/media`, {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(mediaToBeSentToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/") //change this to link to all media page !@!!!!!!!!!!
            })
    }

    return (
        <form className="mediacreationform">
            <h2 className="mediaFormTitle">New Media Item</h2>
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
                            const copy = { ...media }
                            copy.platformId = evt.target.value
                            update(copy)
                            //     {if(copy.platformId > 3){
                            //         setIsGame(true)
                            //     }else{
                            //         setIsGame(false)
                            //     }
                            // console.log(isGame)}
                        }}
                    >
                        <option value="">Select a platform</option>
                        {platforms.map((platform) => (
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
            <fieldset>
                <div>
                    <label htmlFor="genres">Genres:</label>
                    {genres.map((genre) => {
                        if (
                            (isGame && genre.id >= 10 && genre.id <= 20) ||
                            (!isGame && genre.id >= 1 && genre.id <= 9)
                        ) {
                            return (
                                <div key={genre.id}>
                                    <input
                                        type="checkbox"
                                        id={`genre-${genre.id}`}
                                        name={genre.name}
                                        checked={genre.checked}
                                        onChange={(event) => {
                                            const updatedGenres = genres.map((g) => {
                                                if (g.id === genre.id) {
                                                    return {
                                                        ...g,
                                                        checked: event.target.checked
                                                    }
                                                }
                                                return g
                                            })
                                            setSelectedGenres(updatedGenres)
                                        }}
                                    />
                                    <label htmlFor={`genre-${genre.id}`}>{genre.name}</label>
                                </div>
                            )
                        }
                        return null
                    })}
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