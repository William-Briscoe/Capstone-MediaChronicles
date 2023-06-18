import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            {/* <li className="navbar__item active">
                <Link className="navbar__link" to="/tickets">Tickets</Link>
            </li> */}
            {
                <li className="navbar__item navbar__createcollection">
                    <Link className="navbar__link" to="/createcollection" onClick={()=>{
                        navigate("/createcollection")
                    }}>Create a Collection</Link>
                </li>
            }
            {
                localStorage.getItem("media_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("media_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
            
        </ul>
    )
}
