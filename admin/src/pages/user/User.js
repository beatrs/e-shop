
import { useEffect, useState } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"
import "./User.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { userRequest } from "../../reqMethods"
import { FormatDate } from "../../services/general"


const User = () => {
    const [user, setUser] = useState()
    const location = useLocation()
    const navigate = useNavigate()
    const userId = location.pathname.split("/")[2]
    console.log(userId)

    const redirectTo = (url) => {
        try {
            navigate(url)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const query = `http://localhost:5000/api/users/${userId}`
        const getuser = async () => {
            try {
                const res = await userRequest.get(query)
                setUser(res.data)
                console.log(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        getuser()
    }, [userId])

    return (
        <div className="page">
            <Sidebar />
            <div className="page--container">
                <Navbar />
                {user &&
                <div className="user--container">
                    <div className="info-card">
                        <div className="user--img">
                            <img src={user.profileImg} alt={user.coverAlt} />
                        </div>
                        <div className="user--info">
                            <h2 className="card--heading">
                                User Information
                            </h2>

                            <div className="info--grp">
                                <div className="info--lbl">Username:</div>
                                <div className="info--txt">{ user.username }</div>
                            </div>
                            <div className="info--grp">
                                <div className="info--lbl">E-mail:</div>
                                <div className="info--txt">{ user.email }</div>
                            </div>
                            <div className="info--grp">
                                <div className="info--lbl">Admin:</div>
                                <div className="info--txt">{ user.isAdmin ? 'YES' : 'NO' }</div>
                            </div>

                            <button className="info--btn" onClick={()=>redirectTo(`/users/edit/${user._id}`)}>Edit Details</button>
                        </div>
                    </div>
                    <div className="status-card">
                        {/* <div className="user--status">
                            <h2 className="status--lbl">Online</h2>
                        </div> */}
                        <h2 className="card--heading">
                            Member
                        </h2>
                        <div className="status--infoGrp">
                            <h3 className="status--lbl">Joined on:</h3>
                            <span className="status--info">
                                {user && FormatDate.getYmd(user.createdAt)}
                            </span>
                        </div>
                        <div className="status--infoGrp">
                            <h3 className="status--lbl">Last login:</h3>
                            <span className="status--info">
                                {user && user.lastLogin && FormatDate.getYmd(user.lastLogin)}
                            </span>
                        </div>
                    </div>
                    
                </div>
                }
            </div>
        </div>
    )
}

export default User