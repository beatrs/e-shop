import "./Login.scss"
import logo from "../../assets/images/logo512.png"
import bg from "../../assets/images/bg.jpg"

import { login } from "../../redux/apiCalls"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearIsError } from "../../redux/userRedux"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { isFetching, isError, currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleLogin = (e) => {
        e.preventDefault()
        login(dispatch, {username, password})
    }

    useEffect(()=> {
        if (!currentUser) {
            dispatch(clearIsError())
        }
    }, [])

    return(
        <div className="login">
            <div className="login--bg"></div>
            <div className="bg-layer"></div>
            <div className="login--container">
                <div className="left">
                    <div className="logo">
                        <img src={logo} alt="admin-logo" />
                        <h2 className="logo--lbl">wiz admin</h2>
                    </div>
                </div>
                <div className="right">
                    <div className="form--container">
                        <span>Welcome to Wiz Admin Panel</span>
                        <h2>Login to your admin account</h2>
                        <form>
                            <div className="form--item">
                                <label>Username</label>
                                <input type="text" placeholder="Enter your username" onChange={(e)=>setUsername(e.target.value)}/>
                            </div>
                            <div className="form--item">
                                <label>Password</label>
                                <input type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} />
                            </div>
                            <span>Never share your password to anyone</span>
                            <button onClick={handleLogin}>Sign In</button>
                            {isError &&
                            <div className="form--err">Incorrect username/password. Please try again</div>
                            }
                        </form>
                    </div>
                </div>
            </div>
            <div className="attribution">
                <a href="https://www.pexels.com/photo/magnificent-cloudy-sky-at-sunset-4534134/">© Photo by ArtHouse Studio from Pexels</a>
            </div>
        </div>
    )
}

export default Login