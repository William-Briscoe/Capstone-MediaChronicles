import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


//user collection view
export const UserCollectionList = (userId) => {

    const navigate = useNavigate()
    const [collections, setCollections] = useState([])
    const [filteredCollections, setFilteredCollections] = useState([])
    const localUser = localStorage.getItem("media_user")
    const localUserObject = JSON.parse(localUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/collection`)
                .then(response => response.json())
                .then((collectionsArray) => {
                    setCollections(collectionsArray)
                })
            console.log("initial state of collections", collections)//view all collections
        },
        []
    )

    //filter the collections based on current user
    useEffect(
        () => {
            const usersCollections = collections.filter(collection => collection.userId === userId)
            setFilteredCollections(usersCollections)
        },
        [collections, userId]
    )

    return (
        <div className="container">
            <div className="row">
                <ul className="row">
                    {
                        filteredCollections.map(
                            (collection) => {
                                if (localUserObject.id === userId) {
                                    return <div className="col-sm-6 col-md-4 col-lg-3">
                                    <div className="userCollectionItem">
                                        <a href={`/collection/${collection.id}`} onClick={(event) => {
                                            event.preventDefault()
                                            navigate(`/collection/${collection.id}`)
                                        }}>
                                            <header>{collection.name}</header>
                                            {collection.picture ? <img src={collection.picture} alt="Collection image not found XP" width={100} /> : <></>}</a>
                                    </div>
                                    </div>
                                } else if (localUserObject.id !== userId && collection.isPrivate === false) {
                                    return <div className="userCollectionItem">
                                        <a href={`/collection/${collection.id}`} onClick={(event) => {
                                            event.preventDefault()
                                            navigate(`/collection/${collection.id}`)
                                        }}>
                                            <header>{collection.name}</header>
                                            {collection.picture ? <img src={collection.picture} alt="Collection image not found XP" width={100} /> : <></>}</a>
                                    </div>
                                }
                            }
                        )
                    }
                </ul>
            </div>
        </div>
    )
}