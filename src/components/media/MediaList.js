import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const MediaList = ({ searchTermState }) => {
    const [mediaItems, setMediaItems] = useState([])
    const [filteredMedia, setFilteredMedia] = useState([])
    const [collections, setCollections] = useState([])
    const [selectedCollectionId, setSelectedCollectionId] = useState(null);

    const localUser = localStorage.getItem("media_user")
    const localUserObject = JSON.parse(localUser)
    const navigate = useNavigate()


    useEffect(() => {
        fetch("http://localhost:8088/media")
            .then((response) => response.json())
            .then((mediaArray) => {
                setMediaItems(mediaArray);
                setFilteredMedia(mediaItems);
            })
    }, [])


    useEffect(
        () => {
            fetch(`http://localhost:8088/media`)
                .then(response => response.json())
                .then((mediaArray) => {
                    setMediaItems(mediaArray)
                })
            console.log("Initial state of media", mediaItems)
        },
        []
    )

    //grabs the collections array
    useEffect(
        () => {
            fetch(`http://localhost:8088/collection`)
                .then(response => response.json())
                .then((collectionArray) => {
                    setCollections(collectionArray)
                })
        },
        []
    )

    useEffect(
        () => {
            setFilteredMedia(mediaItems)
        },
        []
    )

    //observes state of the search bar to filter
    useEffect(
        () => {
            console.log(searchTermState)
            const searchedMedia = mediaItems.filter(media => {
                return media.title.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredMedia(searchedMedia)
        },
        [searchTermState]
    )


    //function to post media to collections
    const addToCollection = (mediaId, collectionId) => {
        const collectionMediaToSendToAPI ={
            mediaId: mediaId,
            collectionId: parseInt(collectionId)
        }
        //later maybe implement check to see if item is already in collection
        //now post
        return fetch(`http://localhost:8088/collectionMedia`, {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(collectionMediaToSendToAPI)
        })
            .then(response => response.json())
    }

    return (

        <section className="MediaList">
            {filteredMedia.map((media) => {
                return <div className="mediaItem" key={media.id} data-id={media.id}>
                    <header>{media.title}</header>
                    <img src={media.image} alt="image not found XP" width={100} />
                    {/*dropdown and button to add item to collection */}
                    <select
                        value={selectedCollectionId}
                        onChange={(event) => setSelectedCollectionId(event.target.value)}>
                        <option value={0}>Add to a collection</option>
                        {collections.map((collection) => (
                            <option key={collection.id} value={collection.id}>
                                {collection.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => addToCollection(media.id, selectedCollectionId)}>
                        +
                    </button>
                </div>
            })}
        </section>
    )
}