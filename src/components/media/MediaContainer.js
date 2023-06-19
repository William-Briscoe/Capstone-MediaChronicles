import { useState } from "react"
import { MediaSearch } from "./MediaSearch"
import { MediaList } from "./MediaList"

export const MediaContainer = () =>{
    const [searchTerms, setSearchTerms] = useState("")

    return(<>
        <MediaSearch setterFunction={setSearchTerms}/>
        <MediaList searchTermState={searchTerms}/>
        </>
    )
}
