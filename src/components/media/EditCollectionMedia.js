import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";



export const EditCollectionMedia = (collectionId) => {
    //declarations
    const localUser = localStorage.getItem("media_user")
    const localUserObject = JSON.parse(localUser)
    const navigate = useNavigate()
    const [collection, setCollection] = useState({})
    const [collectionsUser, setCollectionsUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [collectionMedia, setCollectionMedia] = useState([])
    const [media, setMedia] = useState([])
    const [collectionContents, setCollectionContents] = useState([])

    const handleDeleteItem = (item) => {
        for (const join of collectionMedia) {
            if(join.mediaId === item.id && join.collectionId === collection.id){
                fetch(`http://localhost:8088/collectionMedia/${join.id}`, {
                    method: "DELETE"
                })
            }
        }
    }

    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:8088/collection/${collectionId}`)
            .then((response) => response.json())
            .then((thiscollection) => {
                setCollection(thiscollection)
            })
            .then(setLoading(false))
    },[]
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




    return (<section>
        <div>
            {collectionContents.map((itemm) => {
                return (<><h2>{itemm.title}</h2>
                    <img src={itemm.image} alt="oh no" width={100}></img>
                    <button onClick={() =>{handleDeleteItem(itemm)}}>Delete Item</button></>)
            })}


        </div>
    </section>)
}