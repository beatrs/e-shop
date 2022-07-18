
import { useEffect, useState } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"
import "./Item.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { userRequest } from "../../reqMethods"
import { Redirect } from "../../services/general"

const Item = () => {
    const [item, setItem] = useState()
    const location = useLocation()
    const itemId = location.pathname.split("/")[2]
    console.log(itemId)
    useEffect(() => {
        const query = `http://localhost:5000/api/products/${itemId}`
        const getItem = async () => {
            try {
                const res = await userRequest.get(query)
                setItem(res.data)
                console.log(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        getItem()
    }, [itemId])

    const navigate = useNavigate()    
    const redirectTo = (url) => {
        try {
            navigate(url, {replace: true})
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="page">
            <Sidebar />
            <div className="page--container">
                <Navbar />
                {item &&
                <div className="item--container">
                    <div className="item--img">
                        <img src={item.cover} alt={item.coverAlt} />
                    </div>
                    <div className="item--info">
                        <h2 className="info--title">
                            { item.title }
                        </h2>
                        <span>Artist: <span className="info--artist">{ item.artist }</span></span>
                        <span>Description: { item.desc }</span>
                        <span>Price: ₱ { item.price }</span>
                        {item.versions &&
                        <div className="info--versions">
                            <span>Versions:</span>
                            <ul>
                                {item.versions.map((version) => (
                                    <li key={version}>{version}</li>
                                ))}
                            </ul>
                        </div>
                        }
                        <button className="info--btn" onClick={()=>redirectTo(`/products/edit/${item._id}`)}>Edit Details</button>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Item