import "./Sidebar.scss"
import { FaHome, FaUser, FaShoppingCart, FaCog, FaLightbulb, FaRegLightbulb } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
const Sidebar = () => {
    const [darkMode, setDarkMode] = useState(false)

    return(
        <div className="sidebar">
            <div className="top">
                <span className="logo">Wiz</span>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">Home</p>
                    <li>
                        <FaHome className="sidebar--icon" />
                        <span>Dashboard</span>
                    </li>
                    <p className="title">Site</p>
                    <li>
                        <FaUser className="sidebar--icon"  />
                        <span>Users</span>
                    </li>
                    <li>
                        <FaShoppingCart className="sidebar--icon" />
                        <span>Products</span>
                    </li>
                    <p className="title">User</p>
                    <li>
                        <FaCog className="sidebar--icon" />
                        <span>Settings</span>
                    </li>
                    <li>
                        <FiLogOut className="sidebar--icon" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div 
                    className="sidebar--icon" 
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ?
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