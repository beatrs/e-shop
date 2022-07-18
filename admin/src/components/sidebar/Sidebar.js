import "./Sidebar.scss"
import { FaHome, FaUser, FaShoppingCart, FaCog, FaLightbulb, FaRegLightbulb } from 'react-icons/fa'
import { FiLogOut } from "react-icons/fi"
import { TbSun as LightMdIcon, TbMoonStars as DarkMdIcon } from "react-icons/tb";

import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { DarkModeContext } from "../../context/darkMode"
import { useDispatch } from "react-redux"

//* new icons { home, users, orders, settings} 
import { VscDashboard as DashboardIcon, VscAccount as UsersIcon, VscArchive as OrdersIcon, VscGear as SettingsIcon } from "react-icons/vsc";
// {products, logout}
import { RiShoppingCartLine as ProductsIcon, RiLogoutBoxRLine as LogoutIcon } from "react-icons/ri";

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
                <Link to="/">
                    <span className="logo">Wiz</span>
                </Link>
            </div>
            {/* <hr /> */}
            <div className="center">
                <ul>
                    {/* <p className="title">Home</p> */}
                    <Link to="/">
                        <li href="/">
                            <DashboardIcon className="sidebar--icon" />
                            <span>Home</span>
                        </li>
                    </Link>
                    
                    {/* <p className="title">Site</p> */}
                    <Link to="/users">
                       <li>
                            <UsersIcon className="sidebar--icon"  />
                            <span>Users</span>
                        </li> 
                    </Link>
                    
                    <Link to="">
                        <li>
                            <OrdersIcon className="sidebar--icon" />
                            <span>Orders</span>
                        </li>
                    </Link>
                    
                    <Link to="/products">
                        <li>
                            <ProductsIcon className="sidebar--icon" />
                            <span>Products</span>
                        </li>
                    </Link>

                    {/* <p className="title">User</p> */}
                    <Link to="/settings">
                        <li>
                            <SettingsIcon className="sidebar--icon" />
                            <span>Settings</span>
                        </li>
                    </Link>
                    
                    <li onClick={handleLogout}>
                        <LogoutIcon className="sidebar--icon" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                {/* <div 
                    className="sidebar--icon" 
                    onClick={handleClick}
                >
                    {isDarkMode ?
                    <DarkMdIcon />
                    :
                    <LightMdIcon />
                    }
                </div> */}
            </div>
        </div>
    )
}

export default Sidebar