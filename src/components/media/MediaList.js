import { Component, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const MediaList = ({ searchTermState }) => {
    const [mediaItems, setMediaItems] = useState([])
    const [filteredMedia, setFilteredMedia] = useState([])
    const [collections, setCollections] = useState([])
    const [selectedCollectionId, setSelectedCollectionId] = useState([]);
    const [platformFilter, setPlatformFilter] = useState(0)
    const [platformsArray, setPlatformsArray] = useState([])
    const [count, setCount] = useState(0)
    const [usersCollections, setUsersCollections] = useState([])
    const [searchSetting, setSearchSetting] = useState(0)
    const [genreFilter, setGenreFilter] = useState(0)
    const [genreArray, setGenreArray] = useState([])
    const [genreJoinArray, setGenreJoinArray] = useState([])


    const localUser = localStorage.getItem("media_user")
    const localUserObject = JSON.parse(localUser)
    const navigate = useNavigate()

    //function that sets the search to search titles or creators
    const handleSearchTermsSelect = (event) => {
        setSearchSetting(parseInt(event.target.value))
    }

    useEffect(() => {
        fetch(`http://localhost:8088/genre`)
            .then((response) => response.json())
            .then((data) => { setGenreArray(data) })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/mediaGenre`)
            .then((response) => response.json())
            .then((data) => { setGenreJoinArray(data) })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/platform`)
            .then((reponse) => reponse.json())
            .then((data) => {
                setPlatformsArray(data)
            })
    }, [])

    //rerenders page when genrefilter is changed
    useEffect(()=>{
        console.log(genreFilter)
    }, [genreFilter])

    useEffect(() => {
        console.log('yo')
    }, [count])

    const filterByPlatform = (mediaArray, platformId) => {
        return mediaArray.filter((media) => parseInt(media.platformId) === parseInt(platformId))
    }

    useEffect(() => {
        fetch("http://localhost:8088/media")
            .then((response) => response.json())
            .then((mediaArray) => {
                setMediaItems(mediaItems)
                {
                    if (platformFilter > 0) {
                        const mediaArrayFilteredByPlatform = filterByPlatform(mediaArray, platformFilter)
                        setFilteredMedia(mediaArrayFilteredByPlatform)
                    } else {
                        setFilteredMedia(mediaItems)
                    }
                }
            })

        console.log(filteredMedia)
    }, [platformFilter])

    useEffect(() => {
        fetch("http://localhost:8088/media")
            .then((response) => response.json())
            .then((mediaArray) => {
                setMediaItems(mediaArray);
                setFilteredMedia(mediaItems);
            })
    }, [])


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

    //defines current users collecions
    useEffect(() => {
        let thisArray = []
        for (const collection of collections) {
            if (collection.userId === localUserObject.id) {
                thisArray.push(collection)
            }
        }
        setUsersCollections(thisArray)
    }, [collections])

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
                if (searchSetting === 0) {
                    return (
                        (media.title.toLowerCase().startsWith(searchTermState.toLowerCase())) &&
                        (parseInt(platformFilter) === 0 || parseInt(media.platformId) === parseInt(platformFilter)) &&
                        (parseInt(genreFilter) === 0 || genreJoinArray.some(join => parseInt(join.mediaId) === parseInt(media.id) && parseInt(join.genreId) === parseInt(genreFilter)))
                    )
                } else {
                    return (
                        media.creator.toLowerCase().startsWith(searchTermState.toLowerCase()) &&
                        (parseInt(platformFilter) === 0 || parseInt(media.platformId) === parseInt(platformFilter)) &&
                        (parseInt(genreFilter) === 0 || genreJoinArray.some(join => parseInt(join.mediaId) === parseInt(media.id) && parseInt(join.genreId) === parseInt(genreFilter)))
                    )
                }

            })
            setFilteredMedia(searchedMedia)
            console.log(filteredMedia)
            console.log(platformFilter)
        },
        [searchTermState, searchSetting, mediaItems, genreFilter]
    )


    //function to post media to collections
    const addToCollection = (mediaId, collectionId) => {
        const collectionMediaToSendToAPI = {
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




    return (<>
        <section className="searchtermsfilter">
            <div>
                Search by:
                <select onChange={handleSearchTermsSelect}>
                    <option value={0}>Title</option>
                    <option value={1}>Author/Developer</option>
                </select>
            </div>
        </section>
        <section className="platformsearchfilters">
            Filter by Platform:<select

                value={platformFilter}
                onChange={(event) => setPlatformFilter(event.target.value)}>
                <option value={0}>Any</option>
                {platformsArray.map((platform) => (
                    <option key={platform.id} value={platform.id}>
                        {platform.name}
                    </option>
                ))}

            </select>
        </section>
        <section className="genresearchfilters">
            Filter by Genre:<select

                value={genreFilter}
                onChange={(event) => setGenreFilter(event.target.value)}>
                <option value={0}>Any</option>
                {genreArray.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name} - {genre.type}
                    </option>
                ))}

            </select>
        </section>
        <section className="MediaList">
            {filteredMedia.map((media) => {
                return <div className="mediaItem" key={media.id} data-id={media.id}>
                    <h2>{media.title}</h2>
                    <p>by {media.creator}</p>
                    <img src={media.image} alt="image not found XP" width={150} />
                    {/*dropdown and button to add item to collection */}
                    <select
                        value={selectedCollectionId}
                        onChange={(event) => setSelectedCollectionId(event.target.value)}>
                        <option value={0}>Add to a collection</option>
                        {usersCollections.map((collection) => (
                            <option key={collection.id} value={collection.id}>
                                {collection.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => selectedCollectionId != 0 ? addToCollection(media.id, selectedCollectionId) : <></>}>
                        +
                    </button>
                    {(media.userId === localUserObject.id || localUserObject.admin === true) ? <>
                        <button onClick={() => { navigate(`/editmedia/${media.id}`) }}>edit media</button>
                    </> : <></>}
                    {(localUserObject.admin) ? <>

                    </> : <></>}
                </div>
            })}
        </section>
    </>)
}