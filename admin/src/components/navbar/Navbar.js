import "./Navbar.scss"
import { GoSearch } from "react-icons/go"
import { FaGlobe, FaBell } from "react-icons/fa"

const Navbar = () => {
    return(
        <div className="navbar">
            <div className="navbar--wrapper">
                <div className="search">
                    <input type="text" placeholder="Search" />
                    <GoSearch className="search--icon" />
                </div>
                <div className="items">
                    <div className="item">
                        <FaGlobe className="item--icon"  />
                        English
                    </div>
                    <div className="item">
                        <FaBell className="item--icon" />
                        <div className="badge">1</div>
                    </div>
                    <div className="item">
                        <img src="https://i.pinimg.com/564x/ee/4e/0d/ee4e0de672b78f617552ab9b1eee64c2.jpg" alt="IVE liz" className="avatar" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar