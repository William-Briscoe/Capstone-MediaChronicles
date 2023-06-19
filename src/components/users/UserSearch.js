export const UserSearch = ({ setterFunction }) =>{
    return (
        <div>
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