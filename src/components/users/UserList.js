import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const UserList = ({searchTermState}) =>{
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])

    const localUser = localStorage.getItem("media_user")
    const localUserObject = JSON.parse(localUser)
    const navigate = useNavigate()


    useEffect(
        ()=>{
            fetch(`http://localhost:8088/media`)
                .then(response => response.json())
                .then((usersArray) =>{
                    setUsers(usersArray)
                })
            console.log("Initial state of media", users)
        },
        []
    )

    useEffect(() => {
        fetch("http://localhost:8088/users")
            .then((response) => response.json())
            .then((usersArray) => {
            setUsers(usersArray);
            setFilteredUsers(users);
        })
    }, [])

    useEffect(
        ()=>{
            setFilteredUsers(users)
        },
        []
    )

    //observes state of the search bar to filter
    useEffect(
        ()=>{
            console.log(searchTermState)
            const searchedUser = users.filter(user =>{
                return user.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredUsers(searchedUser)
        },
        [ searchTermState ]
    )
    
    return(
        
        <section className="UsersList">
            {filteredUsers.map((user)=>{
                return <div className="user" key={user.id} data-id={user.id}>
                    <header>{user.name}</header>

                </div>
            })}
        </section>
    )
}