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
    const [genreJoin, setGenreJoin] = useState([])
    const [isGame, setIsGame] = useState(null)
    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])

    //checks if genre media join is present
    const genreCheck = (genre)=>{
        for (const join of genreJoin) {
            if(parseInt(join.mediaId) === parseInt(mediaId) && parseInt(join.genreId) === parseInt(genre.id)){
                genre.defaultchecked = true
                selectedGenres.push(genre)
            }
        }
    }

    //inital state of selectedGenres
    useEffect(()=>{
        let temporaryGenreArray = []
        for (const join of genreJoin) {
            if(join.mediaId === mediaId){
                for (const genre of genres) {
                    if(join.genreId === genre.id){
                        temporaryGenreArray.push(genre)
                    }
                }
            }
        }
        setSelectedGenres(temporaryGenreArray)
        console.log(selectedGenres)
    },[genreJoin])

    useEffect(()=>{
        fetch(`http://localhost:8088/mediaGenre`)
        .then(response => response.json())
        .then((data)=>{
            setGenreJoin(data)
        })
    }, [])

    // initial state
    useEffect(()=>{
        fetch(`http://localhost:8088/media/${mediaId}`)
        .then(response => response.json())
        .then((data)=>{
            update(data)
        })
    },[])

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

    //wipes selected genres if media type is changed
    useEffect(() => {
        setSelectedGenres([])
    }, [isGame])

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
        
    }

    const handleGenreSave = () => {
        // event.preventDefault()
        for (const join of genreJoin) {
            if(parseInt(join.mediaId) === parseInt(mediaId)){
                fetch(`http://localhost:8088/mediaGenre/${join.id}`,{
                    method: "DELETE"
                })
            }
        }

        for (const genre of selectedGenres) {
            const genreJoinsToSendToAPI = {
                genreId: genre.id,
                mediaId: mediaId
            }

            fetch(`http://localhost:8088/mediaGenre`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(genreJoinsToSendToAPI)
            })
                .then(response => response.json())
        }
        navigate('/medialist')
    }

    const handleDeleteMedia = (event) =>{
        
        event.preventDefault()

        fetch(`http://localhost:8088/media/${mediaId}`, {
            method: 'DELETE'
        })
        .then(()=>{
            navigate('/medialist')
        })
    }

    return (
        <form className="mediacreationform container">
            <h2 className="mediaFormTitle">Edit Media Item</h2>
            <button onClick={(clickEvent)=>{handleDeleteMedia(clickEvent)}}>Delete Media</button>
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
            <fieldset>
                <div>
                    <label htmlFor="genres"><h4>Genres:</h4></label>
                    {genres.map((genre) => {
                        genreCheck(genre)
                        
                        if (
                            (isGame && genre.id >= 10) ||
                            (!isGame && genre.id >= 1 && genre.id <= 9)
                        ) {
                            return (
                                <div key={genre.id}>
                                    <input
                                        type="checkbox"
                                        id={genre.id}
                                        name={genre.name}
                                        defaultChecked={genre.defaultchecked}
                                        checked={genre.checked}
                                        onChange={(event) => {
                                            
                                            if (event.target.checked) {
                                                for (const g of genres) {
                                                    if (g.id === genre.id) {
                                                        selectedGenres.push(genre)
                                                    }
                                                }
                                            } else {
                                                let thisgenrearray = []
                                                for (const genre of selectedGenres) {
                                                    if (genre.id != event.target.id) {
                                                        thisgenrearray.push(genre)
                                                    }
                                                }
                                                setSelectedGenres(thisgenrearray)
                                            }
                                            console.log(selectedGenres)
                                            console.log(genres)
                                            console.log(event.target.id)
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
                onClick={(clickEvent) => {
                    handleSaveButtonClick(clickEvent)
                    handleGenreSave()}}
                className="">
                Save Media Item
            </button>
        </form>
    )
}