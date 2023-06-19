import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const MediaList = ({searchTermState}) =>{
    const [mediaItems, setMediaItems] = useState([])
    const [filteredMedia, setFilteredMedia] = useState([])

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
        ()=>{
            fetch(`http://localhost:8088/media`)
                .then(response => response.json())
                .then((mediaArray) =>{
                    setMediaItems(mediaArray)
                })
            console.log("Initial state of media", mediaItems)
        },
        []
    )

    useEffect(
        ()=>{
            setFilteredMedia(mediaItems)
        },
        []
    )

    //observes state of the search bar to filter
    useEffect(
        ()=>{
            console.log(searchTermState)
            const searchedMedia = mediaItems.filter(media =>{
                return media.title.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredMedia(searchedMedia)
        },
        [ searchTermState ]
    )
    
    return(
        
        <section className="MediaList">
            {filteredMedia.map((media)=>{
                return <div className="mediaItem" key={media.id}>
                    <header>{media.title}</header>
                    <img src={media.image} alt="image not found XP" width={100}/>
                    {/*later add button to add item to collection */}
                </div>
            })}
        </section>
    )
}