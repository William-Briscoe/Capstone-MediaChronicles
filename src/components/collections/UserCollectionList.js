import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"




//user collection view
export const UserCollectionList = (userId) =>{

    const navigate = useNavigate()
    const [collections, setCollections] = useState([])
    const [filteredCollections, setFilteredCollections] = useState([])

    useEffect(
        () =>{
            fetch(`http://localhost:8088/collection`)
                .then(response => response.json())
                .then((collectionsArray) =>{
                    setCollections(collectionsArray)
                })
            console.log("initial state of collections", collections)//view all collections
        },
        []
    )

    //filter the collections based on current user
    useEffect(
        ()=>{
            const usersCollections = collections.filter(collection => collection.userId === userId)
            setFilteredCollections(usersCollections)
        },
        [collections]
    )

    return(
        <ul>
            {
                filteredCollections.map(
                    (collection)=>{
                        return <div className="userCollectionItem">
                            <header><a href={`/collection/${collection.id}`} onClick={(event) => {
                            event.preventDefault()
                            navigate(`/collection/${collection.id}`)
                        }}>{collection.name}
                            <img src={collection.picture} alt="Collection image not found XP" width={100}/></a></header>
                        </div>
                    }
                )
            }
        </ul>
    )
}