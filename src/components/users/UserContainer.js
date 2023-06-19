import { useState } from "react"
import { UserSearch } from "./UserSearch"
import { UserList } from "./UserList"


export const UserContainer = () =>{
    const [searchTerms, setSearchTerms] = useState("")

    return(<>
        <UserSearch setterFunction={setSearchTerms}/>
        <UserList searchTermState={searchTerms}/>
        </>
    )
}