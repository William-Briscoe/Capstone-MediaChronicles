import "./UserSearch.scss"

export const UserSearch = ({ setterFunction }) =>{
    return (
        <div className="usersearch">
        <input 
            onChange={
                (changeEvent) =>{
                    setterFunction(changeEvent.target.value)
                }
            }
        type="text" placeholder="Enter a user's name"/>
        </div>
    )
}