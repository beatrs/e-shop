import "./Sidebar.scss"
import { FaHome, FaUser, FaShoppingCart, FaCog, FaLightbulb, FaRegLightbulb } from 'react-icons/fa'
import { FiLogOut } from "react-icons/fi"

import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { DarkModeContext } from "../../context/darkMode"
import { useDispatch } from "react-redux"


const Sidebar = () => {
    const { darkMode, dispatch } = useContext(DarkModeContext)
    const [isDarkMode, setDarkMode] = useState(darkMode)
    const forward = useDispatch()
    const navigate = useNavigate()

    const handleClick = () => {
        setDarkMode(!isDarkMode)
        dispatch({
            type: "TOGGLE"
        })
    } 

    const handleLogout = () => {
        forward({
            type: "RESET"
        })
        navigate("/login")
    }

    return(
        <div className="sidebar">
            <div className="top">
                <span className="logo">Wiz</span>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">Home</p>
                    <Link to="/">
                        <li href="/">
                            <FaHome className="sidebar--icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    
                    <p className="title">Site</p>
                    <Link to="/users">
                       <li>
                            <FaUser className="sidebar--icon"  />
                            <span>Users</span>
                        </li> 
                    </Link>
                    
                    <Link to="/products">
                        <li>
                            <FaShoppingCart className="sidebar--icon" />
                            <span>Products</span>
                        </li>
                    </Link>
                    
                    <p className="title">User</p>
                    <li>
                        <FaCog className="sidebar--icon" />
                        <span>Settings</span>
                    </li>
                    <li onClick={handleLogout}>
                        <FiLogOut className="sidebar--icon" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div 
                    className="sidebar--icon" 
                    onClick={handleClick}
                >
                    {isDarkMode ?
                    <FaRegLightbulb />
                    :
                    <FaLightbulb />
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar