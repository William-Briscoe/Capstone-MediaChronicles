import "./MediaSearch.scss"

export const MediaSearch = ({ setterFunction }) =>{
    return (
        <div className="searchbar">
        <input 
            onChange={
                (changeEvent) =>{
                    setterFunction(changeEvent.target.value)
                }
            }
        type="text" placeholder="Enter Search Terms"/>
        </div>
    )
}