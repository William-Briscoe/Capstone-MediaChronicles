import { UserCollectionList } from "../collections/UserCollectionList"
import { useNavigate } from "react-router-dom"



//profile view
export const Homepage=()=>{

    //some declarations
    const localUser = localStorage.getItem("media_user")
    const localUserObject = JSON.parse(localUser)
    const navigate = useNavigate()

    return (<>
        <section>
            //section  contains profile info and your collections
            <h2>User Info</h2>
            <div>
                //profile info
                <div>
                    //profile photo
                    <img src="https://i.pinimg.com/originals/57/73/ff/5773ff217f8419a993068193eb3eb82f.jpg" alt="beautiful profile pic UwU" width={80} height={100}/>
                </div>
                <div>
                    //name and bio
                </div>
            </div>
            <div>
                //create new collection button
                //collections
                <h2>Your Collections</h2>
                <button onClick={()=>{navigate("/createcollection")}}>Create a Collection</button>
                {UserCollectionList(localUserObject.id)}
            </div>

        </section>

        <section>
            //value enhancing who you follow
        </section>
        </>
    )
}
