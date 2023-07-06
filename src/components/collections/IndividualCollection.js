import userEvent from "@testing-library/user-event"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import "./IndividualCollection.scss"



export const IndividualCollection = () => {
    //declarations
    const localUser = localStorage.getItem("media_user")
    const localUserObject = JSON.parse(localUser)
    const navigate = useNavigate()

    const { collectionId } = useParams()
    const [collection, setCollection] = useState({})
    const [collectionsUser, setCollectionsUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [collectionMedia, setCollectionMedia] = useState([])
    const [media, setMedia] = useState([])
    const [collectionContents, setCollectionContents] = useState([])
    const [platforms, setPlatforms] = useState([])
    const [listViewItems, setListViewItems] = useState([])
    const [userId, setUserId] = useState(0)


    const handleDeleteButtonClick = (event) => {
        event.preventDefault()

        //delete the collection
        return fetch(`http://localhost:8088/collection/${collection.id}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch(`http://localhost:8088/collectionMedia`)
                    .then((response) => response.json())
                    .then((collectionJoins) => {
                        for (const join of collectionJoins) {
                            if (join.collectionId === collection.id) {
                                fetch(`http://localhost:8088/collectionMedia/${join.id}`, {
                                    method: "DELETE"
                                })
                            }
                        }
                    })
            })
            .then(() => {
                navigate("/")
            })
    }

    useEffect(() => {
        console.log('hehe')
    }, [userId])
    //grabs platform array
    useEffect(() => {
        fetch(`http://localhost:8088/platform`)
            .then(response => response.json())
            .then((data) => {
                setPlatforms(data)
            })
    }, [])

    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:8088/collection/${collectionId}`)
            .then((response) => response.json())
            .then((thiscollection) => {
                setCollection(thiscollection)
                setUserId(collection.userId)
            })
            .then(setLoading(false))
    },
        []
    )

    useEffect(() => {
        console.log(collection)
        fetch(`http://localhost:8088/users/${collection.userId}`)
            .then((reponse) => reponse.json())
            .then((thisUser) => {
                setCollectionsUser(thisUser)
            })
    }
        ,
        [collection])

    useEffect(() => {
        fetch(`http://localhost:8088/collectionMedia`)
            .then((response) => response.json())
            .then((theseJoins) => {
                setCollectionMedia(theseJoins)
            })
    },
        []
    )

    useEffect(() => {
        fetch(`http://localhost:8088/media`)
            .then((response) => response.json())
            .then((allmedia) => {
                setMedia(allmedia)
            })
    },
        []
    )

    //creates list view array
    useEffect(() => {
        let listArray = []
        for (const item of collectionContents) {
            for (const platform of platforms) {
                if (parseInt(item.platformId) === parseInt(platform.id)) {
                    listArray.push(`${item.title} - ${platform.name}`)
                }
            }

        }
        setListViewItems(listArray.sort())
        console.log(listArray, 'list array')
    }, [collectionContents])


    useEffect(() => {
        let array = []
        for (const item of media) {
            for (const join of collectionMedia) {
                if (item.id === join.mediaId && collection.id === join.collectionId) {
                    array.push(item)
                }
            }
        }

        setCollectionContents(array)
        console.log(collectionContents)
    }
        ,
        [collectionsUser]
    )




    return (<>
        <section>
            <div className="collectioninfo">
                {loading ?
                    <div>loading...</div>
                    : <>
                        <h1>{collection.name} </h1>
                        <h3>by {collectionsUser.name}</h3>
                    </>}

            {collection.description}</div>
            <div className="collectionbuttons">
                {localUserObject.id === collection.userId ? <>
                    <button onClick={handleDeleteButtonClick}>delete collection</button>
                    <button onClick={() => { navigate(`/editcollection/${collectionId}`) }}>edit collection</button></> :
                    <></>
                }

            </div>
        </section>
        <section className="collection">
        <div className="galleryview p2">
            <div className="container row">
                {collectionContents.map((itemm) => {
                    return (
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <h3>{itemm.title}</h3>
                            <img src={itemm.image} alt="oh no" width={100}></img>
                        </div>
                    )
                })}
            </div>
        </div>
        <div className="listview">
            <ul>
                {listViewItems.map((element) => {
                    return (<li>{element}</li>)
                })}
            </ul>
        </div>
        </section>
        <section>
            <div>

            </div>
        </section>
    </>)
}