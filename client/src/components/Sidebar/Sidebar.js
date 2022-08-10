import "./Sidebar.scss"
//* new icons { home, users, orders, settings} 
// import { BiHomeSmile as HomeIcon, BiDisc as AlbumIcon } from "react-icons/bi";
import { AiFillHome as HomeIcon } from "react-icons/ai";
import { GiCompactDisc as AlbumIcon, GiHandheldFan as MDIcon, GiClothes as KStyleIcon } from "react-icons/gi";
import { IoTicketSharp as EventsIcon } from "react-icons/io5";
import { VscAccount as UsersIcon, VscArchive as OrdersIcon, VscGear as SettingsIcon } from "react-icons/vsc";
// {products, logout}
import { RiShoppingCartLine as ProductsIcon, RiLogoutBoxRLine as LogoutIcon } from "react-icons/ri";

import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import logo from '../../assets/logos/xoxo-logos_transparent.png'

const Sidebar = ({styleProp}) => {
    const forward = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        forward({
            type: "RESET"
        })
        navigate("/login")
    }
    
    const user = useSelector((state) => state.user.currentUser)

    return(
        <div className={styleProp ? 'sidebar toggled' : 'sidebar'} >
            <div className="top">
                {/* <Link to="/">
                    <span className="logo">xoxo store</span>
                </Link> */}
                <img src={logo} alt='logo'/>
            </div>
            {/* <hr /> */}
            <div className="center">
                <ul>
                    {/* <p className="title">Home</p> */}
                    <Link to="/">
                        <li>
                            <HomeIcon className="sidebar--icon" />
                            <span>Home</span>
                        </li>
                    </Link>
                    
                    {/* <p className="title">Site</p> */}
                    <Link to="/shop/album">
                       <li>
                            <AlbumIcon className="sidebar--icon"  />
                            <span>Albums</span>
                        </li> 
                    </Link>
                    
                    <Link to="/shop/merch">
                        <li>
                            <MDIcon className="sidebar--icon" />
                            <span>Official MD</span>
                        </li>
                    </Link>
                    
                    <Link to="/">
                        <li>
                            <KStyleIcon className="sidebar--icon" />
                            <span>K-Style</span>
                        </li>
                    </Link>

                    {/* <p className="title">User</p> */}
                    <Link to="/">
                        <li>
                            <EventsIcon className="sidebar--icon" />
                            <span>Events</span>
                        </li>
                    </Link>
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
                {user ?
                <div>
                    <Link to="/orders">
                        <li>
                            <OrdersIcon className="sidebar--icon" />
                            <span>My Orders</span>
                        </li>
                    </Link>
                    <li onClick={handleLogout}>
                        <LogoutIcon className="sidebar--icon" />
                        <span>Logout</span>
                    </li>
                </div>
                :
                <Link to="/login">
                    <li>
                        <UsersIcon className="sidebar--icon"  />
                        <span>Sign In</span>
                    </li>
                </Link>
                }
            </div>
        </div>
    )
}

export default Sidebar