export const MediaSearch = ({ setterFunction }) =>{
    return (
        <div>
        <input 
            onChange={
                (changeEvent) =>{
                    setterFunction(changeEvent.target.value)
                }
            }
        type="text" placeholder="Enter The Title"/>
        </div>
    )
}